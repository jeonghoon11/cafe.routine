import { cache } from 'react';

import { createSupabaseServerClient } from '@/shared/supabase/server';

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
