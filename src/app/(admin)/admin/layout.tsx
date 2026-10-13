import Link from 'next/link';
import { ActionButton } from '@seed-design/react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { requireAdminClient } from './_data/auth';
import { signOutAdmin } from './actions';

import * as styles from './layout.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '관리자 | ROUTINE',
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireAdminClient();

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#admin-main">
        본문으로 건너뛰기
      </a>
      <header className={styles.header}>
        <Link href="/admin/menu" className={styles.wordmark}>
          ROUTINE <span>ADMIN</span>
        </Link>
        <form action={signOutAdmin}>
          <ActionButton type="submit" variant="neutralWeak" size="medium">
            로그아웃
          </ActionButton>
        </form>
      </header>
      <main className={styles.main} id="admin-main">
        {children}
      </main>
    </div>
  );
}
