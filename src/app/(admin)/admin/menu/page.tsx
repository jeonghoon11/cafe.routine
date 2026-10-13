import { getAdminMenu } from './_data/get-menu';
import { MenuList } from './menu-list';

import * as styles from './page.css';

const notices: Record<string, string> = {
  created: '메뉴를 추가했습니다.',
  updated: '메뉴를 수정했습니다.',
  deleted: '메뉴를 공개 목록에서 제거했습니다.',
  restored: '메뉴를 복구했습니다.',
};

const errors: Record<string, string> = {
  confirm: '삭제하려면 확인란을 선택해 주세요.',
  delete:
    '메뉴를 제거하지 못했습니다. 목록을 새로고침한 뒤 다시 시도해 주세요.',
  restore:
    '메뉴를 복구하지 못했습니다. 목록을 새로고침한 뒤 다시 시도해 주세요.',
};

interface AdminMenuPageProps {
  searchParams: Promise<{ notice?: string; error?: string }>;
}

export default async function AdminMenuPage({
  searchParams,
}: AdminMenuPageProps) {
  const [categories, params] = await Promise.all([
    getAdminMenu(),
    searchParams,
  ]);
  const notice = params.notice ? notices[params.notice] : undefined;
  const error = params.error ? errors[params.error] : undefined;

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ROUTINE / MENU</p>
          <h1 className={styles.title}>메뉴 관리</h1>
          <p className={styles.description}>
            메뉴 페이지에 표시되는 항목과 판매 상태를 관리합니다.
          </p>
        </div>
      </header>

      {notice && (
        <p className={styles.message} role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className={styles.message + ' ' + styles.error} role="alert">
          {error}
        </p>
      )}

      <MenuList categories={categories} />
    </>
  );
}
