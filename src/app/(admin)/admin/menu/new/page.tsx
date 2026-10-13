import Link from 'next/link';
import { ActionButton } from '@seed-design/react';

import { getAdminMenu } from '../_data/get-menu';
import { MenuForm } from '../menu-form';

import * as styles from '../page.css';

export default async function NewMenuPage() {
  const categories = await getAdminMenu();
  const nextSortOrder =
    Math.max(
      0,
      ...categories.flatMap((category) =>
        category.menu_items.map((item) => item.sort_order),
      ),
    ) + 1;

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ROUTINE / MENU</p>
          <h1 className={styles.title}>메뉴 추가</h1>
          <p className={styles.description}>새 메뉴의 정보를 입력해 주세요.</p>
        </div>
        <ActionButton asChild variant="neutralWeak" size="large">
          <Link href="/admin/menu">목록으로</Link>
        </ActionButton>
      </header>
      <MenuForm categories={categories} nextSortOrder={nextSortOrder} />
    </>
  );
}
