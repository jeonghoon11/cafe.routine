'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@seed-design/react';

import type { AdminMenuCategory, AdminMenuItem } from './_data/get-menu';
import { reorderMenu, restoreMenu } from './actions';

import * as styles from './page.css';

const ORDER_MOTION_DURATION = 180;

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
  const editList = useRef<HTMLUListElement>(null);
  const previousTops = useRef(new Map<string, number>());
  const rowAnimations = useRef(new Map<string, Animation>());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const drag = useRef<{
    id: string;
    original: AdminMenuItem[];
    startY: number;
    currentY: number;
    startTop: number;
    height: number;
    row: HTMLLIElement;
  } | null>(null);
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

  function rememberRowPositions() {
    previousTops.current.clear();
    editList.current
      ?.querySelectorAll<HTMLLIElement>('[data-menu-id]')
      .forEach((row) => {
        previousTops.current.set(
          row.dataset.menuId!,
          row.getBoundingClientRect().top,
        );
      });
  }

  function followPointer() {
    const current = drag.current;
    const list = editList.current;
    if (!current || !list) {
      return;
    }
    const slotTop = list.getBoundingClientRect().top + current.row.offsetTop;
    const offset =
      current.startTop + current.currentY - current.startY - slotTop;
    current.row.style.transform = `translate3d(0, ${offset}px, 0)`;
  }

  useLayoutEffect(
    function animateReorderedRows() {
      const list = editList.current;
      if (!list) {
        return;
      }
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      list.querySelectorAll<HTMLLIElement>('[data-menu-id]').forEach((row) => {
        const id = row.dataset.menuId!;
        rowAnimations.current.get(id)?.cancel();
        rowAnimations.current.delete(id);
        if (id === drag.current?.id) {
          return;
        }
        const previousTop = previousTops.current.get(id);
        const offset =
          previousTop === undefined
            ? 0
            : previousTop - row.getBoundingClientRect().top;
        if (!reduceMotion && Math.abs(offset) > 1) {
          rowAnimations.current.set(
            id,
            row.animate(
              [
                { transform: `translateY(${offset}px)` },
                { transform: 'translateY(0)' },
              ],
              { duration: ORDER_MOTION_DURATION, easing: 'ease-out' },
            ),
          );
        }
      });
      previousTops.current.clear();
      followPointer();
    },
    [draft],
  );

  useEffect(function cleanUpOrderAnimations() {
    const animations = rowAnimations.current;
    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  function finishDrag(cancelled = false) {
    const current = drag.current;
    if (!current) {
      return;
    }
    rememberRowPositions();
    const offset =
      current.row.getBoundingClientRect().top -
      ((editList.current?.getBoundingClientRect().top ?? 0) +
        current.row.offsetTop);
    drag.current = null;
    current.row.style.transform = '';
    setDraggingId(null);
    if (cancelled) {
      setDraft(current.original);
      setMessage('드래그 이동을 취소했습니다.');
    } else {
      previousTops.current.clear();
      if (
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        Math.abs(offset) > 1
      ) {
        rowAnimations.current.set(
          current.id,
          current.row.animate(
            [
              { transform: `translateY(${offset}px)` },
              { transform: 'translateY(0)' },
            ],
            { duration: ORDER_MOTION_DURATION, easing: 'ease-out' },
          ),
        );
      }
    }
  }

  function move(id: string, to: number) {
    const from = draft.findIndex((item) => item.id === id);
    if (from < 0 || from === to || to < 0 || to >= draft.length) {
      return;
    }
    rememberRowPositions();
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
                    disabled={pending || draggingId !== null || !dirty}
                    onClick={saveOrder}
                  >
                    {pending ? '저장 중…' : '순서 저장'}
                  </ActionButton>
                  <ActionButton
                    type="button"
                    variant="neutralWeak"
                    disabled={pending || draggingId !== null}
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
              ref={isEditing ? editList : undefined}
              onPointerMove={(event) => {
                const current = drag.current;
                if (!current) {
                  return;
                }
                current.currentY = event.clientY;
                followPointer();
                const list = event.currentTarget;
                const center =
                  current.startTop +
                  event.clientY -
                  current.startY +
                  current.height / 2;
                const listTop = list.getBoundingClientRect().top;
                const rows = Array.from(
                  list.querySelectorAll<HTMLLIElement>('[data-menu-id]'),
                );
                let to = 0;
                let closestDistance = Infinity;
                rows.forEach((row, index) => {
                  const distance = Math.abs(
                    center - (listTop + row.offsetTop + row.offsetHeight / 2),
                  );
                  if (distance < closestDistance) {
                    closestDistance = distance;
                    to = index;
                  }
                });
                move(current.id, to);
              }}
              onPointerUp={() => finishDrag()}
              onPointerCancel={() => finishDrag(true)}
              onLostPointerCapture={() => finishDrag(true)}
            >
              {items.map((item, index) => (
                <li
                  className={styles.item}
                  key={item.id}
                  data-dragging={draggingId === item.id || undefined}
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
                          const row =
                            event.currentTarget.closest<HTMLLIElement>('li');
                          if (!row) {
                            return;
                          }
                          rowAnimations.current.forEach((animation) =>
                            animation.cancel(),
                          );
                          rowAnimations.current.clear();
                          const bounds = row.getBoundingClientRect();
                          drag.current = {
                            id: item.id,
                            original: draft,
                            row,
                            startY: event.clientY,
                            currentY: event.clientY,
                            startTop: bounds.top,
                            height: bounds.height,
                          };
                          setDraggingId(item.id);
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
                        disabled={pending || draggingId !== null || index === 0}
                        onClick={() => move(item.id, index - 1)}
                      >
                        위로
                      </ActionButton>
                      <ActionButton
                        type="button"
                        variant="neutralWeak"
                        aria-label={item.name + ' 아래로 이동'}
                        disabled={
                          pending ||
                          draggingId !== null ||
                          index === items.length - 1
                        }
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
