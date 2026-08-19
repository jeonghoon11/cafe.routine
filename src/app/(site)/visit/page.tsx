import type { Metadata } from 'next';

import { getBusinessHours, getStoreProfile } from '../_data/get-site-data';

import * as styles from './page.css';

export const metadata: Metadata = {
  title: '방문 안내 | ROUTINE',
  description: '카페 루틴의 주소, 영업시간과 연락처를 확인하세요.',
};

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default async function VisitPage() {
  const [profile, businessHours] = await Promise.all([
    getStoreProfile(),
    getBusinessHours(),
  ]);

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>ROUTINE / VISIT</p>
        <h1 className={styles.title}>Visit.</h1>
        <p className={styles.description}>
          일상에 잠시 머물 수 있는 한 잔을 준비하고 있습니다.
        </p>
      </header>

      <section className={styles.details} aria-label="매장 정보">
        <div className={styles.detail}>
          <p className={styles.label}>Address</p>
          <address>{profile.address}</address>
          {profile.naver_place_url && (
            <a className={styles.actionLink} href={profile.naver_place_url}>
              네이버 지도에서 보기 ↗
            </a>
          )}
        </div>

        <div className={styles.detail}>
          <p className={styles.label}>Hours</p>
          <ul className={styles.hoursList} aria-label="영업시간">
            {businessHours.map((hours) => (
              <li className={styles.hoursItem} key={hours.day_of_week}>
                <span>{DAY_NAMES[hours.day_of_week]}요일</span>
                <span>
                  {hours.is_closed
                    ? '휴무'
                    : `${hours.opens_at.slice(0, 5)}–${hours.closes_at.slice(0, 5)}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.detail}>
          <p className={styles.label}>Contact</p>
          <a
            className={styles.contactLink}
            href={`tel:${profile.telephone.replaceAll('-', '')}`}
          >
            {profile.telephone}
          </a>
          {profile.instagram_url && (
            <a className={styles.actionLink} href={profile.instagram_url}>
              Instagram ↗
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
