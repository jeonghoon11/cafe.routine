'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ActionButton } from '@seed-design/react';

import type { AdminMenuCategory, AdminMenuItem } from './_data/get-menu';
import { deleteMenu, saveMenu } from './actions';

import * as styles from './form.css';

interface MenuFormProps {
  categories: AdminMenuCategory[];
  item?: AdminMenuItem;
}

export function MenuForm({ categories, item }: MenuFormProps) {
  const [error, formAction, pending] = useActionState(saveMenu, '');
  const [fields, setFields] = useState({
    category: item?.category_id ?? categories[0]?.id ?? '',
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: item ? String(item.price_krw) : '',
    status:
      !item || (item.is_published && item.is_available) ? 'selling' : 'hidden',
  });
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [removeImage, setRemoveImage] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(
    function decodeSelectedImage() {
      if (!image) {
        return;
      }
      const src = URL.createObjectURL(image);
      const preview = new Image();
      let cancelled = false;
      preview.onload = () => {
        if (cancelled) {
          return;
        }
        const { naturalWidth: width, naturalHeight: height } = preview;
        if (width > 16384 || height > 16384 || width * height > 40000000) {
          setImageError('이미지 크기는 최대 16,384px, 4천만 픽셀입니다.');
          return;
        }
        setImageSize({ width, height });
        setImagePreview(src);
        setImageError('');
      };
      preview.onerror = () => {
        if (!cancelled) {
          setImageError(
            '읽을 수 없는 이미지입니다. 다른 파일을 선택해 주세요.',
          );
        }
      };
      preview.src = src;
      return () => {
        cancelled = true;
        URL.revokeObjectURL(src);
      };
    },
    [image],
  );

  return (
    <>
      <form
        className={styles.form}
        action={(data) => {
          if (image) {
            data.set('image', image);
          }
          formAction(data);
        }}
      >
        <input name="remove_image" type="hidden" value={String(removeImage)} />
        <input name="image_width" type="hidden" value={imageSize.width} />
        <input name="image_height" type="hidden" value={imageSize.height} />
        <input name="id" type="hidden" value={item?.id ?? ''} />

        <label className={styles.field}>
          카테고리
          <select
            name="category_id"
            value={fields.category}
            onChange={(event) =>
              setFields({ ...fields, category: event.target.value })
            }
            disabled={pending}
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
            value={fields.name}
            onChange={(event) =>
              setFields({ ...fields, name: event.target.value })
            }
            disabled={pending}
            name="name"
            required
          />
        </label>

        <label className={styles.field}>
          설명
          <textarea
            value={fields.description}
            onChange={(event) =>
              setFields({ ...fields, description: event.target.value })
            }
            disabled={pending}
            name="description"
            rows={4}
          />
        </label>

        <div className={styles.numberFields}>
          <label className={styles.field}>
            가격
            <span className={styles.inputWithSuffix}>
              <input
                value={fields.price}
                onChange={(event) =>
                  setFields({ ...fields, price: event.target.value })
                }
                disabled={pending}
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
        </div>

        <fieldset className={styles.states} disabled={pending}>
          <legend>메뉴 상태</legend>
          <label>
            <input
              type="radio"
              name="status"
              value="selling"
              checked={fields.status === 'selling'}
              onChange={() => setFields({ ...fields, status: 'selling' })}
            />
            판매 중
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="hidden"
              checked={fields.status === 'hidden'}
              onChange={() => setFields({ ...fields, status: 'hidden' })}
            />
            비공개
          </label>
          <p className={styles.help}>
            판매 중인 메뉴만 공식 메뉴 페이지에 표시됩니다. 비공개 메뉴는
            표시되지 않습니다.
          </p>
        </fieldset>

        <fieldset className={styles.states} disabled={pending}>
          <legend>메뉴 이미지</legend>
          {imagePreview || (!removeImage && item?.media_assets) ? (
            <img
              className={styles.imagePreview}
              src={imagePreview ?? item?.media_assets?.src}
              alt="메뉴 이미지 미리보기"
            />
          ) : (
            <p className={styles.help}>이미지 없음</p>
          )}
          <label className={styles.field}>
            {item?.media_assets || image ? '이미지 변경' : '이미지 선택'}
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={pending}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }
                if (
                  !['image/jpeg', 'image/png', 'image/webp'].includes(
                    file.type,
                  ) ||
                  file.size > 1048576
                ) {
                  setImageError(
                    'JPG, PNG, WebP 이미지를 1MB 이하로 선택해 주세요.',
                  );
                  event.target.value = '';
                  return;
                }
                setImage(file);
                setImagePreview(null);
                setImageSize({ width: 0, height: 0 });
                setRemoveImage(false);
                setImageError('');
              }}
            />
          </label>
          {(image || (!removeImage && item?.media_assets)) && (
            <ActionButton
              type="button"
              variant="neutralWeak"
              disabled={pending}
              onClick={() => {
                setImage(null);
                setImagePreview(null);
                setImageSize({ width: 0, height: 0 });
                setRemoveImage(true);
                setImageError('');
                if (fileInput.current) {
                  fileInput.current.value = '';
                }
              }}
            >
              이미지 제거
            </ActionButton>
          )}
          <p className={styles.help}>
            {removeImage
              ? '저장하면 이미지가 제거됩니다.'
              : '메뉴 저장 시 반영됩니다. JPG·PNG·WebP, 최대 1MB. 대체 텍스트는 메뉴명으로 저장됩니다.'}
          </p>
          {imageError && (
            <p className={styles.error} role="alert">
              {imageError}
            </p>
          )}
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
            disabled={
              pending || !!imageError || (!!image && imageSize.width === 0)
            }
          >
            {pending ? '저장 중…' : '저장'}
          </ActionButton>
          <ActionButton asChild variant="neutralWeak" size="large">
            {pending ? <span>취소</span> : <Link href="/admin/menu">취소</Link>}
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
            <button
              className={styles.deleteButton}
              type="submit"
              disabled={pending}
            >
              공개 메뉴에서 제거
            </button>
          </form>
        </section>
      )}
    </>
  );
}
