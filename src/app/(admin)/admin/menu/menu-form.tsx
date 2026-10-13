'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { ActionButton } from '@seed-design/react';

import type { AdminMenuCategory, AdminMenuItem } from './_data/get-menu';
import { deleteMenu, saveMenu } from './actions';

import * as styles from './form.css';

interface MenuFormProps {
  categories: AdminMenuCategory[];
  item?: AdminMenuItem;
  nextSortOrder: number;
}

export function MenuForm({ categories, item, nextSortOrder }: MenuFormProps) {
  const [error, formAction, pending] = useActionState(saveMenu, '');

  return (
    <>
      <form className={styles.form} action={formAction}>
        <input name="id" type="hidden" value={item?.id ?? ''} />

        <label className={styles.field}>
          카테고리
          <select
            name="category_id"
            defaultValue={item?.category_id ?? categories[0]?.id ?? ''}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
                {!category.is_published ? ' (카테고리 비공개)' : ''}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          메뉴명
          <input
            autoComplete="off"
            defaultValue={item?.name ?? ''}
            name="name"
            required
          />
        </label>

        <label className={styles.field}>
          설명
          <textarea
            defaultValue={item?.description ?? ''}
            name="description"
            rows={4}
          />
        </label>

        <div className={styles.numberFields}>
          <label className={styles.field}>
            가격
            <span className={styles.inputWithSuffix}>
              <input
                defaultValue={item?.price_krw ?? ''}
                inputMode="numeric"
                max="2147483647"
                min="0"
                name="price_krw"
                required
                step="1"
                type="number"
              />
              <span>원</span>
            </span>
          </label>
          <label className={styles.field}>
            표시 순서
            <input
              defaultValue={item?.sort_order ?? nextSortOrder}
              inputMode="numeric"
              max="2147483647"
              min="0"
              name="sort_order"
              required
              step="1"
              type="number"
            />
            <span className={styles.help}>
              숫자가 작을수록 먼저 표시됩니다.
            </span>
          </label>
        </div>

        <fieldset className={styles.states}>
          <legend>메뉴 상태</legend>
          <label>
            <input
              defaultChecked={item?.is_published ?? true}
              name="is_published"
              type="checkbox"
            />
            메뉴 페이지에 공개
          </label>
          <label>
            <input
              defaultChecked={item?.is_available ?? true}
              name="is_available"
              type="checkbox"
            />
            판매 중
          </label>
          <p className={styles.help}>
            공개하지 않은 메뉴는 사이트에 표시되지 않습니다. 판매 중이 아닌
            메뉴는 품절로 표시됩니다.
          </p>
        </fieldset>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <ActionButton
            type="submit"
            variant="neutralSolid"
            size="large"
            disabled={pending}
          >
            {pending ? '저장 중…' : '저장'}
          </ActionButton>
          <ActionButton asChild variant="neutralWeak" size="large">
            <Link href="/admin/menu">취소</Link>
          </ActionButton>
        </div>
      </form>

      {item && (
        <section
          className={styles.deleteSection}
          aria-labelledby="delete-title"
        >
          <h2 id="delete-title">메뉴 삭제</h2>
          <p>
            삭제한 메뉴는 방문자에게 보이지 않으며, 관리자 목록에서 복구할 수
            있습니다.
          </p>
          <form action={deleteMenu}>
            <input name="id" type="hidden" value={item.id} />
            <label className={styles.confirm}>
              <input name="confirm_delete" required type="checkbox" />“
              {item.name}”을 공개 메뉴에서 제거하는 것에 동의합니다.
            </label>
            <button className={styles.deleteButton} type="submit">
              공개 메뉴에서 제거
            </button>
          </form>
        </section>
      )}
    </>
  );
}
