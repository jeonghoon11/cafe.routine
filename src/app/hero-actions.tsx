'use client';

import { ActionButton } from '@seed-design/react';

import * as styles from './page.css';

export function HeroActions() {
  return (
    <div className={styles.heroActions} data-seed-color-mode="dark-only">
      <ActionButton asChild variant="neutralSolid" size="large">
        <a href="#coffee">커피 보기</a>
      </ActionButton>
      <ActionButton asChild variant="neutralWeak" size="large">
        <a href="#visit">오시는 길</a>
      </ActionButton>
    </div>
  );
}
