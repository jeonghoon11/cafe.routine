import Link from 'next/link';
import type { ReactNode } from 'react';

import { getStoreProfile } from './_data/get-site-data';

import * as styles from './site-shell.css';

export const revalidate = 300;

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const profile = await getStoreProfile();
  const slogan = profile.slogan ?? profile.name;

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        본문으로 건너뛰기
      </a>

      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="ROUTINE 홈">
          <img
            className={styles.wordmarkImage}
            src="/images/logo.svg"
            alt={profile.name}
            width={130}
            height={20}
          />
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/visit">Visit</Link>
        </nav>
      </header>

      <main className={styles.main} id="main-content">
        {children}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerWordmark}>{profile.name}</p>
        <p className={styles.footerSlogan}>{slogan}</p>
      </footer>
    </div>
  );
}
