import { cache } from 'react';

import { createPublicSupabaseClient } from '@/shared/supabase/server';

export const getStoreProfile = cache(async function getStoreProfile() {
  const supabase = createPublicSupabaseClient();
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
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from('business_hours')
    .select('day_of_week, opens_at, closes_at, is_closed')
    .order('day_of_week');

  if (error) {
    throw error;
  }

  return data;
});

export const getSpaceMedia = cache(async function getSpaceMedia() {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from('media_assets')
    .select('bucket, object_path, alt_text, width, height, sort_order')
    .eq('usage', 'space')
    .eq('is_published', true)
    .order('sort_order')
    .limit(8);

  if (error) {
    throw error;
  }

  if (data.length !== 8) {
    return [];
  }

  return data.map((asset) => ({
    ...asset,
    src: supabase.storage.from(asset.bucket).getPublicUrl(asset.object_path)
      .data.publicUrl,
  }));
});
