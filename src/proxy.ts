import type { NextRequest } from 'next/server';

import { updateSupabaseSession } from '@/shared/supabase/proxy';

export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
