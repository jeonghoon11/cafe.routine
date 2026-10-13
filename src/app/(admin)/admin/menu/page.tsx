import Link from 'next/link';
import { ActionButton } from '@seed-design/react';

import { getAdminMenu } from './_data/get-menu';
import { restoreMenu } from './actions';

import * as styles from './page.css';

const priceFormatter = new Intl.NumberFormat('ko-KR');

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
        <ActionButton asChild variant="neutralSolid" size="large">
          <Link href="/admin/menu/new">메뉴 추가</Link>
        </ActionButton>
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

      {categories.map((category) => {
        const activeItems = category.menu_items.filter(
          (item) => !item.deleted_at,
        );
        const deletedItems = category.menu_items.filter(
          (item) => item.deleted_at,
        );

        return (
          <section className={styles.section} key={category.id}>
            <div className={styles.categoryHeading}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              {!category.is_published && (
                <span className={styles.status}>카테고리 비공개</span>
              )}
            </div>

            {activeItems.length > 0 ? (
              <ul className={styles.items}>
                {activeItems.map((item) => (
                  <li className={styles.item} key={item.id}>
                    <div>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemPrice}>
                        {priceFormatter.format(item.price_krw)}원
                      </p>
                    </div>
                    <div className={styles.statuses}>
                      <span className={styles.status}>
                        {item.is_published ? '공개' : '비공개'}
                      </span>
                      <span className={styles.status}>
                        {item.is_available ? '판매 중' : '품절'}
                      </span>
                    </div>
                    <Link
                      className={styles.editLink}
                      href={'/admin/menu/' + item.id}
                    >
                      수정
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>등록된 메뉴가 없습니다.</p>
            )}

            {deletedItems.length > 0 && (
              <details className={styles.deleted}>
                <summary>삭제된 메뉴 ({deletedItems.length})</summary>
                <ul className={styles.items}>
                  {deletedItems.map((item) => (
                    <li className={styles.item} key={item.id}>
                      <div>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemPrice}>
                          {priceFormatter.format(item.price_krw)}원
                        </p>
                      </div>
                      <div className={styles.statuses}>
                        <span className={styles.status}>삭제됨</span>
                      </div>
                      <form className={styles.restoreForm} action={restoreMenu}>
                        <input name="id" type="hidden" value={item.id} />
                        <button className={styles.restoreButton} type="submit">
                          복구
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        );
      })}

      {categories.length === 0 && (
        <p className={styles.empty}>메뉴 카테고리가 없습니다.</p>
      )}
    </>
  );
}
