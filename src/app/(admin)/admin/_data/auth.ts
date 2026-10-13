import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/supabase/server';

export async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims.sub) {
    redirect('/admin/login');
  }

  const { data: isAdmin, error: permissionError } =
    await supabase.rpc('is_admin');

  if (permissionError) {
    redirect('/admin/login?error=unavailable');
  }

  if (!isAdmin) {
    redirect('/admin/login?error=unauthorized');
  }

  return supabase;
}
