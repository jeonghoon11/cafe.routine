create schema if not exists private;

create table public.store_profile (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  slogan text,
  address text not null,
  telephone text not null,
  instagram_url text,
  naver_place_url text,
  updated_at timestamptz not null default now()
);

create table public.business_hours (
  day_of_week smallint primary key check (day_of_week between 0 and 6),
  opens_at time not null,
  closes_at time not null,
  is_closed boolean not null default false,
  check (is_closed or opens_at < closes_at)
);

create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'site-assets',
  object_path text not null unique,
  alt_text text not null,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.menu_categories (id) on delete set null,
  media_id uuid references public.media_assets (id) on delete set null,
  name text not null,
  description text,
  price_krw integer not null check (price_krw >= 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_available boolean not null default true,
  is_published boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index menu_items_public_order_idx
  on public.menu_items (category_id, sort_order)
  where is_published and deleted_at is null;

create table private.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.admin_users
    where user_id = (select auth.uid())
      and is_active
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.store_profile enable row level security;
alter table public.business_hours enable row level security;
alter table public.menu_categories enable row level security;
alter table public.media_assets enable row level security;
alter table public.menu_items enable row level security;
alter table private.admin_users enable row level security;

grant select on public.store_profile to anon, authenticated;
grant select on public.business_hours to anon, authenticated;
grant select on public.menu_categories to anon, authenticated;
grant select on public.media_assets to anon, authenticated;
grant select on public.menu_items to anon, authenticated;

grant insert, update, delete on public.store_profile to authenticated;
grant insert, update, delete on public.business_hours to authenticated;
grant insert, update, delete on public.menu_categories to authenticated;
grant insert, update, delete on public.media_assets to authenticated;
grant insert, update, delete on public.menu_items to authenticated;

create policy "Public can read store profile"
on public.store_profile for select
to anon, authenticated
using (true);

create policy "Public can read business hours"
on public.business_hours for select
to anon, authenticated
using (true);

create policy "Public can read published categories"
on public.menu_categories for select
to anon, authenticated
using (is_published);

create policy "Public can read published media"
on public.media_assets for select
to anon, authenticated
using (is_published);

create policy "Public can read published menu items"
on public.menu_items for select
to anon, authenticated
using (is_published and deleted_at is null);

create policy "Admins can manage store profile"
on public.store_profile for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage business hours"
on public.business_hours for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage menu categories"
on public.menu_categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage media assets"
on public.media_assets for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage menu items"
on public.menu_items for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.store_profile (
  name,
  slogan,
  address,
  telephone,
  instagram_url,
  naver_place_url
)
values (
  'ROUTINE',
  'Invite Us to Your ROUTINE',
  '서울시 성북구 보문로34가길 6',
  '02-6489-4589',
  'https://www.instagram.com/cafe.routine/',
  'https://m.place.naver.com/restaurant/1023734971/home?entry=pll'
);

insert into public.business_hours (day_of_week, opens_at, closes_at)
select day_of_week, '11:00'::time, '22:00'::time
from generate_series(0, 6) as day_of_week;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-assets',
  'site-assets',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
);

create policy "Public can read site assets"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'site-assets');

create policy "Admins can manage site assets"
on storage.objects for all
to authenticated
using (bucket_id = 'site-assets' and public.is_admin())
with check (bucket_id = 'site-assets' and public.is_admin());
