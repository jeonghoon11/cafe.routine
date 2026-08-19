import { cache } from 'react';

import { createSupabaseServerClient } from '@/shared/supabase/server';

export const getMenu = cache(async function getMenu() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('menu_categories')
    .select(
      'id, name, slug, sort_order, menu_items(id, name, description, price_krw, sort_order)',
    )
    .eq('is_published', true)
    .eq('menu_items.is_published', true)
    .is('menu_items.deleted_at', null)
    .order('sort_order')
    .order('sort_order', { referencedTable: 'menu_items' });

  if (error) {
    throw error;
  }

  return data;
});
