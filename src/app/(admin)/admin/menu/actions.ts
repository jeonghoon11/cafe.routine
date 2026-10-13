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
  sortOrder: number;
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
  const sortOrder = readInteger(formData.get('sort_order'));

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
  if (sortOrder === null) {
    return '표시 순서는 0 이상의 정수로 입력해 주세요.';
  }

  return {
    id: idValue || null,
    categoryId,
    name: nameValue.trim(),
    description: descriptionValue.trim() || null,
    price,
    sortOrder,
    isAvailable: formData.get('is_available') === 'on',
    isPublished: formData.get('is_published') === 'on',
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
  const values = {
    category_id: input.categoryId,
    name: input.name,
    description: input.description,
    price_krw: input.price,
    sort_order: input.sortOrder,
    is_available: input.isAvailable,
    is_published: input.isPublished,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { data, error } = await supabase
      .from('menu_items')
      .update(values)
      .eq('id', input.id)
      .is('deleted_at', null)
      .select('id')
      .maybeSingle();

    if (error) {
      return getSaveErrorMessage(error);
    }
    if (!data) {
      return '메뉴를 찾을 수 없습니다. 목록을 새로고침해 주세요.';
    }
  } else {
    const { error } = await supabase
      .from('menu_items')
      .insert(values)
      .select('id')
      .single();

    if (error) {
      return getSaveErrorMessage(error);
    }
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
