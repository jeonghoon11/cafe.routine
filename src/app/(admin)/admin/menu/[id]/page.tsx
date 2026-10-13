import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ActionButton } from '@seed-design/react';

import { getAdminMenu } from '../_data/get-menu';
import { MenuForm } from '../menu-form';

import * as styles from '../page.css';

interface EditMenuPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
  const [{ id }, categories] = await Promise.all([params, getAdminMenu()]);
  const item = categories
    .flatMap((category) => category.menu_items)
    .find((menuItem) => menuItem.id === id && !menuItem.deleted_at);

  if (!item) {
    notFound();
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ROUTINE / MENU</p>
          <h1 className={styles.title}>메뉴 수정</h1>
          <p className={styles.description}>{item.name}</p>
        </div>
        <ActionButton asChild variant="neutralWeak" size="large">
          <Link href="/admin/menu">목록으로</Link>
        </ActionButton>
      </header>
      <MenuForm categories={categories} item={item} nextSortOrder={0} />
    </>
  );
}
