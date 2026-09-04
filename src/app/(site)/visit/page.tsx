import type { Metadata } from 'next';

import { getBusinessHours, getStoreProfile } from '../_data/get-site-data';
import { RevealOnView } from '../reveal-on-view';

import * as styles from './page.css';

export const metadata: Metadata = {
  title: '방문 안내 | ROUTINE',
  description: '카페 루틴의 주소, 영업시간과 연락처를 확인하세요.',
};

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const TIME_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Seoul',
});

function formatTime(time: string) {
  return TIME_FORMATTER.format(new Date(`2000-01-01T${time}+09:00`));
}

export default async function VisitPage() {
  const [profile, businessHours] = await Promise.all([
    getStoreProfile(),
    getBusinessHours(),
  ]);
  const hoursRows = businessHours.map((hours) => ({
    day: `${DAY_NAMES[hours.day_of_week]}요일`,
    label: hours.is_closed
      ? '휴무'
      : `${formatTime(hours.opens_at)}–${formatTime(hours.closes_at)}`,
  }));
  const hasUniformHours =
    businessHours.length === 7 &&
    new Set(hoursRows.map(({ label }) => label)).size === 1;
  const displayedHours = hasUniformHours
    ? [{ day: '매일', label: hoursRows[0].label }]
    : hoursRows;

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>ROUTINE / VISIT</p>
        <h1 className={styles.title}>Visit.</h1>
        <p className={styles.description}>
          루틴의 위치와 영업시간을 확인하세요.
        </p>
      </header>

      <section className={styles.information} aria-label="방문 정보">
        <section aria-labelledby="address-title">
          <RevealOnView
            className={`${styles.revealContent} ${styles.addressInner}`}
          >
            <p className={styles.addressEyebrow}>01 — ADDRESS</p>
            <div className={styles.addressContent}>
              <h2 className={styles.addressTitle} id="address-title">
                Find ROUTINE.
              </h2>
              <address className={styles.address}>{profile.address}</address>
              {profile.naver_place_url && (
                <a className={styles.mapLink} href={profile.naver_place_url}>
                  네이버에서 ROUTINE 보기 ↗
                </a>
              )}
            </div>
          </RevealOnView>
        </section>

        <section className={styles.details} aria-label="방문 세부 정보">
          <RevealOnView className={styles.revealContent}>
            <section
              className={`${styles.detail} ${styles.hoursDetail}`}
              aria-labelledby="hours-title"
            >
              <p className={styles.detailEyebrow}>02 — HOURS</p>
              <h2 className={styles.detailTitle} id="hours-title">
                Hours.
              </h2>
              <dl className={styles.hoursList} aria-label="영업시간">
                {displayedHours.map(({ day, label }) => (
                  <div className={styles.hoursRow} key={day}>
                    <dt>{day}</dt>
                    <dd className={styles.hoursValue}>{label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </RevealOnView>

          <RevealOnView className={styles.revealContent}>
            <section
              className={`${styles.detail} ${styles.contactDetail}`}
              aria-labelledby="contact-title"
            >
              <p className={styles.detailEyebrow}>03 — CONTACT</p>
              <h2 className={styles.detailTitle} id="contact-title">
                Contact.
              </h2>
              <a
                className={styles.phoneLink}
                href={`tel:${profile.telephone.replaceAll('-', '')}`}
              >
                <span className={styles.phoneNumber}>{profile.telephone}</span>
                <span className={styles.phoneAction}>전화하기 ↗</span>
              </a>
              {profile.instagram_url && (
                <a className={styles.socialLink} href={profile.instagram_url}>
                  <span>
                    <span translate="no">Instagram</span>에서{' '}
                    <span translate="no">ROUTINE</span> 소식 보기{' '}
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              )}
            </section>
          </RevealOnView>
        </section>
      </section>
    </div>
  );
}
