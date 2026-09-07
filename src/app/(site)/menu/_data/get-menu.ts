import { cache } from 'react';

import { createPublicSupabaseClient } from '@/shared/supabase/server';

type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  menu_items: Array<{
    id: string;
    name: string;
    description: string | null;
    price_krw: number;
    sort_order: number;
    is_available: boolean;
    media_assets: {
      bucket: string;
      object_path: string;
      alt_text: string;
      width: number;
      height: number;
    } | null;
  }>;
};

export const getMenu = cache(async function getMenu() {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from('menu_categories')
    .select(
      'id, name, slug, sort_order, menu_items(id, name, description, price_krw, sort_order, is_available, media_assets!menu_items_media_id_fkey(bucket, object_path, alt_text, width, height))',
    )
    .eq('is_published', true)
    .eq('menu_items.is_published', true)
    .is('menu_items.deleted_at', null)
    .order('sort_order')
    .order('sort_order', { referencedTable: 'menu_items' })
    .overrideTypes<MenuCategory[], { merge: false }>();

  if (error) {
    throw error;
  }

  return data.map((category) => ({
    ...category,
    menu_items: category.menu_items.map((item) => ({
      ...item,
      media_assets: item.media_assets
        ? {
            ...item.media_assets,
            src: supabase.storage
              .from(item.media_assets.bucket)
              .getPublicUrl(item.media_assets.object_path).data.publicUrl,
          }
        : null,
    })),
  }));
});
