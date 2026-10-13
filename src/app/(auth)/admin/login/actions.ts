'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/supabase/server';

export async function signInAsAdmin(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    redirect('/admin/login?error=invalid');
  }

  const supabase = await createSupabaseServerClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (signInError) {
    redirect('/admin/login?error=invalid');
  }

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims.sub) {
    await supabase.auth.signOut();
    redirect('/admin/login?error=unavailable');
  }

  const { data: isAdmin, error: permissionError } =
    await supabase.rpc('is_admin');

  if (permissionError || !isAdmin) {
    await supabase.auth.signOut();
    redirect(
      permissionError
        ? '/admin/login?error=unavailable'
        : '/admin/login?error=unauthorized',
    );
  }

  redirect('/admin/menu');
}
