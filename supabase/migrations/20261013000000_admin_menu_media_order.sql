begin;

drop policy "Public can read published menu items" on public.menu_items;
create policy "Public can read published menu items"
on public.menu_items for select to anon, authenticated
using (is_published and is_available and deleted_at is null);

create function public.append_menu_item_order() returns trigger
language plpgsql set search_path = '' as $$
declare previous_category uuid; should_append boolean;
begin
  if tg_op = 'UPDATE' then
    previous_category := old.category_id;
    should_append := new.category_id is distinct from old.category_id or (old.deleted_at is not null and new.deleted_at is null);
  else should_append := true; end if;
  -- Category locks serialize inserts, restores, moves, and explicit reordering.
  perform id from public.menu_categories
  where id = new.category_id or id = previous_category
  order by id for update;
  if should_append then
    select coalesce(max(sort_order), 0) + 1 into new.sort_order
    from public.menu_items where category_id = new.category_id and deleted_at is null;
  end if;
  return new;
end $$;
create trigger append_menu_item_order before insert or update on public.menu_items
for each row execute function public.append_menu_item_order();

create function public.reorder_menu_items(p_category_id uuid, p_expected jsonb, p_ids uuid[])
returns void language plpgsql security invoker set search_path = '' as $$
declare actual_count integer;
begin
  if not public.is_admin() then raise insufficient_privilege; end if;
  perform id from public.menu_categories where id = p_category_id for update;
  if not found then raise exception 'Category not found' using errcode = '40001'; end if;
  perform id from public.menu_items where category_id = p_category_id and deleted_at is null for update;
  select count(*) into actual_count from public.menu_items where category_id = p_category_id and deleted_at is null;
  if p_expected is null or p_ids is null or jsonb_typeof(p_expected) <> 'array' or cardinality(p_ids) <> actual_count
    or jsonb_array_length(p_expected) <> actual_count
    or (select count(distinct id) from unnest(p_ids) as id) <> actual_count
    or (select count(distinct (entry->>'id')::uuid) from jsonb_array_elements(p_expected) as entry) <> actual_count
    or exists (select 1 from unnest(p_ids) as requested(id) where not exists (
      select 1 from public.menu_items i where i.id = requested.id and i.category_id = p_category_id and i.deleted_at is null))
    or exists (select 1 from jsonb_array_elements(p_expected) as entry where not exists (
      select 1 from public.menu_items i where i.id = (entry->>'id')::uuid and i.category_id = p_category_id and i.deleted_at is null
      and i.sort_order = (entry->>'sort_order')::integer and i.updated_at = (entry->>'updated_at')::timestamptz)) then
    raise exception 'Menu changed; reload before reordering' using errcode = '40001';
  end if;
  update public.menu_items i set sort_order = position, updated_at = now()
  from unnest(p_ids) with ordinality as ordered(id, position) where i.id = ordered.id;
end $$;
revoke all on function public.reorder_menu_items(uuid, jsonb, uuid[]) from public, anon;
grant execute on function public.reorder_menu_items(uuid, jsonb, uuid[]) to authenticated;

commit;
