'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@seed-design/react';

import type { AdminMenuCategory, AdminMenuItem } from './_data/get-menu';
import { reorderMenu, restoreMenu } from './actions';

import * as styles from './page.css';

const priceFormatter = new Intl.NumberFormat('ko-KR');

function Thumbnail({ item }: { item: AdminMenuItem }) {
  return item.media_assets ? (
    <img
      className={styles.thumbnail}
      src={item.media_assets.src}
      alt=""
      width={72}
      height={72}
      loading="lazy"
    />
  ) : (
    <span className={styles.imageEmpty}>이미지 없음</span>
  );
}

export function MenuList({ categories }: { categories: AdminMenuCategory[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminMenuItem[]>([]);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const original = useRef<AdminMenuItem[]>([]);
  const drag = useRef<{ id: string; original: AdminMenuItem[] } | null>(null);
  const dirty = draft.some(
    (item, index) => item.id !== original.current[index]?.id,
  );

  useEffect(
    function guardUnsavedOrder() {
      if (!dirty) {
        return;
      }
      const preventUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
      };
      const confirmNavigation = (event: Event) => {
        const target = event.target;
        const isNavigation =
          event.type === 'submit' ||
          (target instanceof Element &&
            target.closest('a[href]:not([href^="#"])'));
        if (
          isNavigation &&
          !window.confirm('저장하지 않은 순서 변경이 사라집니다. 이동할까요?')
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      window.addEventListener('beforeunload', preventUnload);
      document.addEventListener('click', confirmNavigation, true);
      document.addEventListener('submit', confirmNavigation, true);
      return () => {
        window.removeEventListener('beforeunload', preventUnload);
        document.removeEventListener('click', confirmNavigation, true);
        document.removeEventListener('submit', confirmNavigation, true);
      };
    },
    [dirty],
  );

  function move(id: string, to: number) {
    const from = draft.findIndex((item) => item.id === id);
    if (from < 0 || from === to || to < 0 || to >= draft.length) {
      return;
    }
    const next = [...draft];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setDraft(next);
    setMessage(item.name + ', ' + (to + 1) + '번째로 이동했습니다.');
  }

  async function saveOrder() {
    if (!editing || !dirty) {
      return;
    }
    setPending(true);
    setError('');
    try {
      const result = await reorderMenu(
        editing,
        original.current.map(({ id, sort_order, updated_at }) => ({
          id,
          sort_order,
          updated_at,
        })),
        draft.map((item) => item.id),
      );
      if (result.error) {
        setError(result.error);
        return;
      }
      setEditing(null);
      setDraft([]);
      original.current = [];
      setMessage('순서를 저장했습니다.');
      router.refresh();
    } catch {
      setError(
        '순서를 저장하지 못했습니다. 연결을 확인하고 다시 시도해 주세요.',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className={styles.listActions}>
        <ActionButton
          asChild
          variant="neutralSolid"
          size="large"
          disabled={editing !== null}
        >
          {editing ? (
            <span>메뉴 추가</span>
          ) : (
            <Link href="/admin/menu/new">메뉴 추가</Link>
          )}
        </ActionButton>
      </div>
      <p role="status" className={styles.help}>
        {message}
      </p>
      {error && (
        <p role="alert" className={styles.message + ' ' + styles.error}>
          {error}
        </p>
      )}
      {categories.map((category) => {
        const active = category.menu_items.filter((item) => !item.deleted_at);
        const deleted = category.menu_items.filter((item) => item.deleted_at);
        const isEditing = editing === category.id;
        const items = isEditing ? draft : active;
        return (
          <section className={styles.section} key={category.id}>
            <div className={styles.categoryHeading}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              {!category.is_published && (
                <span className={styles.status}>카테고리 비공개</span>
              )}
              {isEditing ? (
                <>
                  <ActionButton
                    type="button"
                    variant="neutralSolid"
                    disabled={pending || !dirty}
                    onClick={saveOrder}
                  >
                    {pending ? '저장 중…' : '순서 저장'}
                  </ActionButton>
                  <ActionButton
                    type="button"
                    variant="neutralWeak"
                    disabled={pending}
                    onClick={() => {
                      setEditing(null);
                      setDraft([]);
                      original.current = [];
                      setError('');
                      setMessage('순서 변경을 취소했습니다.');
                      router.refresh();
                    }}
                  >
                    취소
                  </ActionButton>
                </>
              ) : (
                <ActionButton
                  type="button"
                  variant="neutralWeak"
                  disabled={editing !== null || active.length < 2}
                  onClick={() => {
                    original.current = active;
                    setDraft(active);
                    setEditing(category.id);
                    setError('');
                    setMessage('');
                  }}
                >
                  순서 편집
                </ActionButton>
              )}
            </div>
            {isEditing && (
              <p className={styles.help}>
                손잡이를 드래그하거나 위로·아래로 버튼으로 이동하세요. 저장
                전에는 사이트에 반영되지 않습니다. 메뉴 추가·수정·복구는 순서
                저장 또는 취소 후 가능합니다.
              </p>
            )}
            <ul
              className={styles.items}
              onPointerMove={(event) => {
                if (!drag.current) {
                  return;
                }
                const row = document
                  .elementFromPoint(event.clientX, event.clientY)
                  ?.closest('[data-menu-id]');
                if (row?.getAttribute('data-category-id') !== category.id) {
                  return;
                }
                const to = draft.findIndex(
                  (entry) => entry.id === row.getAttribute('data-menu-id'),
                );
                move(drag.current.id, to);
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
              onPointerCancel={() => {
                if (drag.current) {
                  setDraft(drag.current.original);
                }
                drag.current = null;
              }}
            >
              {items.map((item, index) => (
                <li
                  className={styles.item}
                  key={item.id}
                  data-menu-id={item.id}
                  data-category-id={category.id}
                >
                  <Thumbnail item={item} />
                  <div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      {priceFormatter.format(item.price_krw)}원
                    </p>
                  </div>
                  <span className={styles.status}>
                    {item.is_published && item.is_available
                      ? '판매 중'
                      : '비공개'}
                  </span>
                  {isEditing ? (
                    <div className={styles.orderControls}>
                      <ActionButton
                        type="button"
                        className={styles.dragHandle}
                        variant="neutralWeak"
                        aria-label={item.name + ' 드래그로 순서 이동'}
                        disabled={pending}
                        onPointerDown={(event) => {
                          if (event.button !== 0) {
                            return;
                          }
                          drag.current = { id: item.id, original: draft };
                          // Capture on the stable list because dragging moves the handle's DOM node.
                          event.currentTarget
                            .closest('ul')
                            ?.setPointerCapture(event.pointerId);
                        }}
                      >
                        ↕
                      </ActionButton>
                      <ActionButton
                        type="button"
                        variant="neutralWeak"
                        aria-label={item.name + ' 위로 이동'}
                        disabled={pending || index === 0}
                        onClick={() => move(item.id, index - 1)}
                      >
                        위로
                      </ActionButton>
                      <ActionButton
                        type="button"
                        variant="neutralWeak"
                        aria-label={item.name + ' 아래로 이동'}
                        disabled={pending || index === items.length - 1}
                        onClick={() => move(item.id, index + 1)}
                      >
                        아래로
                      </ActionButton>
                    </div>
                  ) : editing ? (
                    <span className={styles.help}>수정</span>
                  ) : (
                    <Link
                      className={styles.editLink}
                      href={'/admin/menu/' + item.id}
                    >
                      수정
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {active.length === 0 && (
              <p className={styles.empty}>등록된 메뉴가 없습니다.</p>
            )}
            {deleted.length > 0 && (
              <details className={styles.deleted}>
                <summary>삭제된 메뉴 ({deleted.length})</summary>
                <ul className={styles.items}>
                  {deleted.map((item) => (
                    <li className={styles.item} key={item.id}>
                      <Thumbnail item={item} />
                      <div>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemPrice}>
                          {priceFormatter.format(item.price_krw)}원
                        </p>
                      </div>
                      <span className={styles.status}>삭제됨</span>
                      <form action={restoreMenu}>
                        <input type="hidden" name="id" value={item.id} />
                        <ActionButton
                          type="submit"
                          variant="neutralWeak"
                          disabled={editing !== null}
                        >
                          복구
                        </ActionButton>
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
