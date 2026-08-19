'use client';

import Link from 'next/link';
import { ActionButton } from '@seed-design/react';

import * as styles from './page.css';

export function HeroActions() {
  return (
    <div className={styles.heroActions} data-seed-color-mode="dark-only">
      <ActionButton asChild variant="neutralSolid" size="large">
        <Link href="/menu">메뉴 보기</Link>
      </ActionButton>
      <ActionButton asChild variant="neutralWeak" size="large">
        <Link href="/visit">오시는 길</Link>
      </ActionButton>
    </div>
  );
}
