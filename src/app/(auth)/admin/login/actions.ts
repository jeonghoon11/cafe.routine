'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/supabase/server';

function getAdminLoginAccounts(): Record<string, string> | null {
  const configuredAccounts = process.env.ADMIN_LOGIN_ACCOUNTS;

  if (!configuredAccounts) {
    return null;
  }

  try {
    const accounts: unknown = JSON.parse(configuredAccounts);

    if (
      typeof accounts !== 'object' ||
      accounts === null ||
      Array.isArray(accounts) ||
      Object.keys(accounts).length === 0 ||
      !Object.values(accounts).every(
        (email) => typeof email === 'string' && email.trim().length > 0,
      )
    ) {
      return null;
    }

    return accounts as Record<string, string>;
  } catch {
    return null;
  }
}

export async function signInAsAdmin(formData: FormData) {
  const loginId = formData.get('loginId');
  const password = formData.get('password');

  if (
    typeof loginId !== 'string' ||
    typeof password !== 'string' ||
    !loginId.trim() ||
    loginId.trim().length > 64 ||
    !password
  ) {
    redirect('/admin/login?error=invalid');
  }

  const accounts = getAdminLoginAccounts();

  if (!accounts) {
    redirect('/admin/login?error=unavailable');
  }

  const normalizedId = loginId.trim();
  const email = Object.hasOwn(accounts, normalizedId)
    ? accounts[normalizedId].trim()
    : null;

  if (!email) {
    redirect('/admin/login?error=invalid');
  }

  const supabase = await createSupabaseServerClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
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
