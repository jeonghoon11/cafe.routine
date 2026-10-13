'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdminClient } from '../_data/auth';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_POSTGRES_INTEGER = 2_147_483_647;

type MenuInput = {
  id: string | null;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
  isPublished: boolean;
};

function readInteger(value: FormDataEntryValue | null) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    return null;
  }

  const number = Number(value);
  return Number.isSafeInteger(number) && number <= MAX_POSTGRES_INTEGER
    ? number
    : null;
}

function readMenuInput(formData: FormData): MenuInput | string {
  const idValue = formData.get('id');
  const categoryId = formData.get('category_id');
  const nameValue = formData.get('name');
  const descriptionValue = formData.get('description');
  const price = readInteger(formData.get('price_krw'));
  const status = formData.get('status');

  if (
    typeof idValue !== 'string' ||
    (idValue !== '' && !UUID_PATTERN.test(idValue))
  ) {
    return '메뉴를 다시 선택해 주세요.';
  }
  if (typeof categoryId !== 'string' || !UUID_PATTERN.test(categoryId)) {
    return '카테고리를 선택해 주세요.';
  }
  if (typeof nameValue !== 'string' || !nameValue.trim()) {
    return '메뉴명을 입력해 주세요.';
  }
  if (typeof descriptionValue !== 'string') {
    return '설명 입력을 확인해 주세요.';
  }
  if (price === null) {
    return '가격은 0 이상의 원화 정수로 입력해 주세요.';
  }
  if (status !== 'selling' && status !== 'hidden') {
    return '메뉴 상태를 선택해 주세요.';
  }

  return {
    id: idValue || null,
    categoryId,
    name: nameValue.trim(),
    description: descriptionValue.trim() || null,
    price,
    isAvailable: status === 'selling',
    isPublished: status === 'selling',
  };
}

function getSaveErrorMessage(error: { code?: string }) {
  if (error.code === '23505') {
    return '같은 카테고리에 같은 이름의 메뉴가 있습니다. 삭제된 메뉴라면 목록에서 복구해 수정해 주세요.';
  }
  if (error.code === '23503') {
    return '카테고리를 다시 선택해 주세요.';
  }

  return '메뉴를 저장하지 못했습니다. 입력을 확인하고 다시 시도해 주세요.';
}

export async function saveMenu(_: string, formData: FormData): Promise<string> {
  const input = readMenuInput(formData);
  if (typeof input === 'string') {
    return input;
  }

  const supabase = await requireAdminClient();
  const image = formData.get('image');
  const removeImageValue = formData.get('remove_image');
  if (removeImageValue !== 'true' && removeImageValue !== 'false') {
    return '이미지 설정을 확인해 주세요.';
  }
  if (image !== null && !(image instanceof File)) {
    return '이미지 파일을 다시 선택해 주세요.';
  }
  const removeImage = removeImageValue === 'true';
  let mediaId: string | null | undefined;
  let newAsset: { id: string; path: string } | undefined;
  async function cleanupNewImage() {
    if (!newAsset) {
      return;
    }
    const { error: assetError } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', newAsset.id);
    const { error: objectError } = await supabase.storage
      .from('site-assets')
      .remove([newAsset.path]);
    if (assetError || objectError) {
      // eslint-disable-next-line no-console -- Keep failed cleanup visible to operators.
      console.error(
        'New menu image cleanup failed',
        assetError?.code,
        objectError?.message,
      );
    }
  }
  if (image instanceof File && image.size > 0) {
    // shortcut: 치수는 표시용 브라우저 메타데이터다. 서버 이미지 변환을 도입하면 직접 디코딩한다.
    const width = readInteger(formData.get('image_width'));
    const height = readInteger(formData.get('image_height'));
    if (
      image.size > 1048576 ||
      !width ||
      !height ||
      width > 16384 ||
      height > 16384 ||
      width * height > 40000000
    ) {
      return '이미지 크기를 확인해 주세요. 최대 1MB, 16,384px, 4천만 픽셀입니다.';
    }
    const bytes = new Uint8Array(await image.arrayBuffer());
    const isJpeg =
      image.type === 'image/jpeg' &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff;
    const isPng =
      image.type === 'image/png' &&
      [137, 80, 78, 71, 13, 10, 26, 10].every(
        (value, index) => bytes[index] === value,
      );
    const isWebp =
      image.type === 'image/webp' &&
      new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' &&
      new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP';
    if (!isJpeg && !isPng && !isWebp) {
      return 'JPG, PNG, WebP 이미지 파일만 저장할 수 있습니다.';
    }
    const extension = isJpeg ? 'jpg' : isPng ? 'png' : 'webp';
    const path = 'menu/' + crypto.randomUUID() + '.' + extension;
    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(path, image, { contentType: image.type, upsert: false });
    if (uploadError) {
      return '이미지를 업로드하지 못했습니다. 입력을 유지한 채 다시 시도해 주세요.';
    }
    const { data: asset, error: assetError } = await supabase
      .from('media_assets')
      .insert({
        bucket: 'site-assets',
        object_path: path,
        alt_text: input.name,
        width,
        height,
      })
      .select('id')
      .single();
    if (assetError || !asset) {
      const { error: cleanupError } = await supabase.storage
        .from('site-assets')
        .remove([path]);
      if (cleanupError) {
        // eslint-disable-next-line no-console -- Keep failed cleanup visible to operators.
        console.error('New menu image cleanup failed', cleanupError.message);
      }
      return '이미지 정보를 저장하지 못했습니다. 다시 시도해 주세요.';
    }
    newAsset = { id: asset.id, path };
    mediaId = asset.id;
  } else if (removeImage) {
    mediaId = null;
  }
  const values = {
    category_id: input.categoryId,
    name: input.name,
    description: input.description,
    price_krw: input.price,
    is_available: input.isAvailable,
    is_published: input.isPublished,
    ...(mediaId !== undefined ? { media_id: mediaId } : {}),
    updated_at: new Date().toISOString(),
  };
  const result = input.id
    ? await supabase
        .from('menu_items')
        .update(values)
        .eq('id', input.id)
        .is('deleted_at', null)
        .select('id')
        .maybeSingle()
    : await supabase.from('menu_items').insert(values).select('id').single();
  if (result.error || !result.data) {
    await cleanupNewImage();
    return result.error
      ? getSaveErrorMessage(result.error)
      : '메뉴를 찾을 수 없습니다. 목록을 새로고침해 주세요.';
  }

  revalidatePath('/menu');
  revalidatePath('/admin/menu');
  redirect('/admin/menu?notice=' + (input.id ? 'updated' : 'created'));
}

export async function deleteMenu(formData: FormData) {
  const id = formData.get('id');
  if (
    typeof id !== 'string' ||
    !UUID_PATTERN.test(id) ||
    formData.get('confirm_delete') !== 'on'
  ) {
    redirect('/admin/menu?error=confirm');
  }

  const supabase = await requireAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .is('deleted_at', null)
    .select('id')
    .maybeSingle();

  if (error || !data) {
    redirect('/admin/menu?error=delete');
  }

  revalidatePath('/menu');
  revalidatePath('/admin/menu');
  redirect('/admin/menu?notice=deleted');
}

export async function restoreMenu(formData: FormData) {
  const id = formData.get('id');
  if (typeof id !== 'string' || !UUID_PATTERN.test(id)) {
    redirect('/admin/menu?error=restore');
  }

  const supabase = await requireAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .update({ deleted_at: null, updated_at: new Date().toISOString() })
    .eq('id', id)
    .not('deleted_at', 'is', null)
    .select('id')
    .maybeSingle();

  if (error || !data) {
    redirect('/admin/menu?error=restore');
  }

  revalidatePath('/menu');
  revalidatePath('/admin/menu');
  redirect('/admin/menu?notice=restored');
}

export async function reorderMenu(
  categoryId: string,
  expected: Array<{ id: string; sort_order: number; updated_at: string }>,
  ids: string[],
): Promise<{ error: string }> {
  if (
    typeof categoryId !== 'string' ||
    !UUID_PATTERN.test(categoryId) ||
    !Array.isArray(expected) ||
    !Array.isArray(ids) ||
    ids.length > 1000 ||
    ids.length !== expected.length ||
    new Set(expected.map((item) => item?.id)).size !== expected.length ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => typeof id !== 'string' || !UUID_PATTERN.test(id)) ||
    expected.some(
      (item) =>
        !item ||
        typeof item.id !== 'string' ||
        !UUID_PATTERN.test(item.id) ||
        !Number.isInteger(item.sort_order) ||
        item.sort_order < 0 ||
        item.sort_order > MAX_POSTGRES_INTEGER ||
        typeof item.updated_at !== 'string' ||
        !Number.isFinite(Date.parse(item.updated_at)),
    )
  ) {
    return { error: '메뉴 순서를 다시 확인해 주세요.' };
  }
  const supabase = await requireAdminClient();
  const { error } = await supabase.rpc('reorder_menu_items', {
    p_category_id: categoryId,
    p_expected: expected,
    p_ids: ids,
  });
  if (error) {
    return {
      error:
        error.code === '40001'
          ? '다른 변경이 있어 저장하지 못했습니다. 변경 순서를 확인한 뒤 취소하고 목록을 새로고침해 주세요.'
          : '순서를 저장하지 못했습니다. 다시 시도해 주세요.',
    };
  }
  revalidatePath('/menu');
  revalidatePath('/admin/menu');
  return { error: '' };
}
