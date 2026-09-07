alter table public.media_assets
  add column if not exists usage text not null default 'general',
  add column if not exists sort_order integer not null default 0
    check (sort_order >= 0);

create unique index if not exists menu_items_category_name_key
  on public.menu_items (category_id, name);

insert into public.menu_categories (id, name, slug, sort_order)
values
  ('10000000-0000-4000-8000-000000000001', 'Good Morning', 'good-morning', 1),
  ('10000000-0000-4000-8000-000000000002', 'Good Afternoon', 'good-afternoon', 2),
  ('10000000-0000-4000-8000-000000000003', 'Good Night', 'good-night', 3)
on conflict (slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();

insert into public.menu_items (
  category_id,
  name,
  description,
  price_krw,
  sort_order
)
values
  ('10000000-0000-4000-8000-000000000001', 'ROUTINE COFFEE', '루틴커피 (오렌지)', 6500, 1),
  ('10000000-0000-4000-8000-000000000001', 'PISTACHIO LATTE', '피스타치오라떼', 6500, 2),
  ('10000000-0000-4000-8000-000000000001', 'SALT CARAMEL', '솔트카라멜', 6500, 3),
  ('10000000-0000-4000-8000-000000000001', 'EINSPANNER', '아인슈페너', 6500, 4),
  ('10000000-0000-4000-8000-000000000001', 'VANILLA BEAN LATTE', '바닐라빈라떼', 6500, 5),
  ('10000000-0000-4000-8000-000000000001', 'AMERICANO', '아메리카노', 5000, 6),
  ('10000000-0000-4000-8000-000000000001', 'CAFE LATTE', '카페라떼', 5500, 7),
  ('10000000-0000-4000-8000-000000000001', 'COLD BREW', '콜드브루', 6000, 8),
  ('10000000-0000-4000-8000-000000000002', 'SIGNATURE TEA', '시그니처 티', 7000, 1),
  ('10000000-0000-4000-8000-000000000002', 'FLOWER TEA', '플라워티 (메리골드)', 6500, 2),
  ('10000000-0000-4000-8000-000000000002', 'ICE TEA', '아이스티 (복숭아)', 6500, 3),
  ('10000000-0000-4000-8000-000000000002', 'ADE', '에이드 (제주청귤)', 6500, 4),
  ('10000000-0000-4000-8000-000000000002', 'CREAM MATCHA', '크림말차', 6500, 5),
  ('10000000-0000-4000-8000-000000000002', 'CREAM CHOCOLATE', '크림초코', 6500, 6),
  ('10000000-0000-4000-8000-000000000003', 'TIRAMISU', '티라미수 (보늬밤)', 12000, 1),
  ('10000000-0000-4000-8000-000000000003', 'SIGNATURE DESSERT', '시그니처 디저트', 12000, 2),
  ('10000000-0000-4000-8000-000000000003', 'BLACK CHOCO MOUSSE', '블랙초코무스', 12000, 3),
  ('10000000-0000-4000-8000-000000000003', 'MANGO SORBET', '망고소르베', 9000, 4),
  ('10000000-0000-4000-8000-000000000003', 'BANANA PUDDING', '바나나푸딩', 6800, 5),
  ('10000000-0000-4000-8000-000000000003', 'TERRINE', '테린느 · 초콜릿 / 치즈 / 말차', 7000, 6)
on conflict (category_id, name) do update
set
  description = excluded.description,
  price_krw = excluded.price_krw,
  sort_order = excluded.sort_order,
  is_available = true,
  is_published = true,
  deleted_at = null,
  updated_at = now();

insert into public.media_assets (
  id,
  bucket,
  object_path,
  alt_text,
  width,
  height,
  usage,
  sort_order
)
values
  ('20000000-0000-4000-8000-000000000001', 'site-assets', 'home/hero-espresso-20260819.webp', '검은 잔에 담긴 에스프레소의 표면을 가까이에서 본 모습', 1536, 1024, 'home', 1),
  ('20000000-0000-4000-8000-000000000002', 'site-assets', 'home/coffee-beans-20260819.webp', '금속 작업대 위에 놓인 볶은 커피 원두', 1536, 1024, 'home', 2),
  ('20000000-0000-4000-8000-000000000003', 'site-assets', 'home/pour-over-20260819.webp', '드리퍼에 물을 붓는 손과 피어오르는 김', 1024, 1536, 'home', 3),
  ('20000000-0000-4000-8000-000000000004', 'site-assets', 'home/quiet-cup-20260819.webp', '조용한 실내 테이블 위의 검은 커피 잔', 1536, 1024, 'home', 4)
on conflict (object_path) do update
set
  alt_text = excluded.alt_text,
  width = excluded.width,
  height = excluded.height,
  usage = excluded.usage,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();
