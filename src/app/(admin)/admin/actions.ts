'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/supabase/server';

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  redirect('/admin/login');
}
