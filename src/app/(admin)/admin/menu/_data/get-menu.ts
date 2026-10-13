import { createSupabaseServerClient } from '@/shared/supabase/server';

export type AdminMenuItem = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price_krw: number;
  sort_order: number;
  is_available: boolean;
  is_published: boolean;
  deleted_at: string | null;
};

export type AdminMenuCategory = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_published: boolean;
  menu_items: AdminMenuItem[];
};

export async function getAdminMenu() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('menu_categories')
    .select(
      'id, name, slug, sort_order, is_published, menu_items(id, category_id, name, description, price_krw, sort_order, is_available, is_published, deleted_at)',
    )
    .order('sort_order')
    .order('sort_order', { referencedTable: 'menu_items' })
    .overrideTypes<AdminMenuCategory[], { merge: false }>();

  if (error) {
    throw error;
  }

  return data;
}
