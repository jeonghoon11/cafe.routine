import { ActionButton } from '@seed-design/react';
import type { Metadata } from 'next';

import { signInAsAdmin } from './actions';

import * as styles from './page.css';

export const metadata: Metadata = {
  title: '관리자 로그인 | ROUTINE',
  robots: { index: false, follow: false },
};

const loginErrors: Record<string, string> = {
  invalid: '이메일 또는 비밀번호를 확인해 주세요.',
  unauthorized: '이 계정은 관리자 권한이 없습니다.',
  unavailable: '로그인 상태를 확인하지 못했습니다. 잠시 뒤 다시 시도해 주세요.',
};

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <p className={styles.eyebrow}>ROUTINE / ADMIN</p>
        <h1 className={styles.title} id="login-title">
          관리자 로그인
        </h1>
        <p className={styles.description}>
          등록된 관리자 계정으로 로그인해 주세요.
        </p>

        {error && loginErrors[error] && (
          <p className={styles.error} role="alert">
            {loginErrors[error]}
          </p>
        )}

        <form className={styles.form} action={signInAsAdmin}>
          <label className={styles.field}>
            이메일
            <input
              autoComplete="username"
              name="email"
              type="email"
              autoCapitalize="none"
              required
            />
          </label>
          <label className={styles.field}>
            비밀번호
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              required
            />
          </label>
          <ActionButton type="submit" variant="neutralSolid" size="large">
            로그인
          </ActionButton>
        </form>
      </section>
    </main>
  );
}
