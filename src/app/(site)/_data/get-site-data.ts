import { cache } from 'react';

import { createSupabaseServerClient } from '@/shared/supabase/server';

const featuredCoffeeIds = [
  'dd40f55e-2ca1-4e15-9e7b-36af63be487a',
  '2f4cbcd2-7616-4157-8161-dbe0faa1c522',
  '59e91b87-b77b-4e86-a9ba-186473f1cd13',
] as const;

type FeaturedCoffee = {
  id: string;
  media_assets: {
    bucket: string;
    object_path: string;
    alt_text: string;
    width: number;
    height: number;
  } | null;
};

export const getStoreProfile = cache(async function getStoreProfile() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('store_profile')
    .select(
      'name, slogan, address, telephone, instagram_url, naver_place_url',
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
});

export const getBusinessHours = cache(async function getBusinessHours() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('business_hours')
    .select('day_of_week, opens_at, closes_at, is_closed')
    .order('day_of_week');

  if (error) {
    throw error;
  }

  return data;
});

export const getHomeMedia = cache(async function getHomeMedia() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('media_assets')
    .select('bucket, object_path, alt_text, width, height, sort_order')
    .eq('usage', 'home')
    .eq('is_published', true)
    .order('sort_order')
    .limit(4);

  if (error) {
    throw error;
  }

  return data.map((asset) => ({
    ...asset,
    src: supabase.storage.from(asset.bucket).getPublicUrl(asset.object_path).data
      .publicUrl,
  }));
});

export const getFeaturedCoffeeMedia = cache(
  async function getFeaturedCoffeeMedia() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('menu_items')
      .select(
        'id, media_assets!menu_items_media_id_fkey(bucket, object_path, alt_text, width, height)',
      )
      .in('id', [...featuredCoffeeIds])
      .eq('is_published', true)
      .is('deleted_at', null)
      .overrideTypes<FeaturedCoffee[], { merge: false }>();

    if (error) {
      throw error;
    }

    return featuredCoffeeIds.flatMap((id) => {
      const asset = data.find((item) => item.id === id)?.media_assets;

      if (!asset) {
        return [];
      }

      return [
        {
          ...asset,
          src: supabase.storage
            .from(asset.bucket)
            .getPublicUrl(asset.object_path).data.publicUrl,
        },
      ];
    });
  },
);
