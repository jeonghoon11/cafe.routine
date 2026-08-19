import Image from 'next/image';

import { createSupabaseServerClient } from '@/shared/supabase/server';

import { HeroActions } from './hero-actions';

import * as styles from './page.css';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const [profileResult, hoursResult] = await Promise.all([
    supabase.from('store_profile').select('*').single(),
    supabase.from('business_hours').select('*').order('day_of_week'),
  ]);

  if (profileResult.error) {
    throw profileResult.error;
  }
  if (hoursResult.error) {
    throw hoursResult.error;
  }

  const profile = profileResult.data;
  const slogan = profile.slogan ?? profile.name;

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        본문으로 건너뛰기
      </a>

      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#home" aria-label="ROUTINE 홈">
          {profile.name}
        </a>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <a href="#coffee">Coffee</a>
          <a href="#visit">Visit</a>
        </nav>
      </header>

      <main id="main-content">
        <section className={styles.hero} id="home" aria-labelledby="hero-title">
          <Image
            className={styles.heroImage}
            src="/images/home/hero-espresso.webp"
            alt="검은 잔에 담긴 에스프레소의 표면을 가까이에서 본 모습"
            fill
            preload
            sizes="100vw"
          />
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroContent}>
            <p className={styles.sectionIndex}>ROUTINE / 01 — HOME</p>
            <h1 className={styles.heroTitle} id="hero-title">
              {profile.name}
            </h1>
            <p className={styles.heroSlogan}>{slogan}</p>
            <HeroActions />
          </div>

          <a className={styles.scrollCue} href="#invitation">
            Scroll
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section
          className={`${styles.invitation} ${styles.revealSection}`}
          id="invitation"
          aria-labelledby="invitation-title"
        >
          <p className={styles.sectionIndex}>ROUTINE / 02 — INVITATION</p>
          <h2 className={styles.invitationTitle} id="invitation-title">
            {slogan}
          </h2>
          <p className={styles.invitationNote}>{profile.address}</p>
        </section>

        <section
          className={styles.coffee}
          id="coffee"
          aria-labelledby="coffee-title"
        >
          <div className={styles.coffeeHeading}>
            <p className={styles.sectionIndex}>ROUTINE / 03 — COFFEE</p>
            <h2 className={styles.coffeeTitle} id="coffee-title">
              Coffee.
            </h2>
          </div>

          <div className={styles.coffeeGrid}>
            <figure className={styles.coffeeCard}>
              <div className={styles.coffeeImage}>
                <Image
                  src="/images/home/coffee-beans.webp"
                  alt="금속 작업대 위에 놓인 볶은 커피 원두"
                  fill
                  sizes="(min-width: 800px) 32vw, 100vw"
                />
              </div>
              <figcaption className={styles.coffeeCaption}>
                COFFEE / 01
              </figcaption>
            </figure>

            <figure className={`${styles.coffeeCard} ${styles.coffeeCardBrew}`}>
              <div className={styles.coffeeImage}>
                <Image
                  src="/images/home/pour-over.webp"
                  alt="드리퍼에 물을 붓는 손과 피어오르는 김"
                  fill
                  sizes="(min-width: 800px) 32vw, 100vw"
                />
              </div>
              <figcaption className={styles.coffeeCaption}>
                COFFEE / 02
              </figcaption>
            </figure>

            <figure
              className={`${styles.coffeeCard} ${styles.coffeeCardPause}`}
            >
              <div className={styles.coffeeImage}>
                <Image
                  src="/images/home/quiet-cup.webp"
                  alt="조용한 실내 테이블 위의 검은 커피 잔"
                  fill
                  sizes="(min-width: 800px) 32vw, 100vw"
                />
              </div>
              <figcaption className={styles.coffeeCaption}>
                COFFEE / 03
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className={`${styles.visit} ${styles.revealSection}`}
          id="visit"
          aria-labelledby="visit-title"
        >
          <div className={styles.visitHeading}>
            <p className={`${styles.sectionIndex} ${styles.visitIndex}`}>
              ROUTINE / 04 — VISIT
            </p>
            <h2 className={styles.visitTitle} id="visit-title">
              Visit.
            </h2>
          </div>

          <div className={styles.visitDetails}>
            <address className={styles.visitDetail}>
              <p className={styles.detailLabel}>Address</p>
              {profile.address}
            </address>

            <div className={styles.visitDetail}>
              <p className={styles.detailLabel}>Hours</p>
              <ul className={styles.hoursList} aria-label="영업시간">
                {hoursResult.data.map((hours) => (
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

            <div className={`${styles.visitDetail} ${styles.visitLinks}`}>
              <p className={styles.detailLabel}>Contact</p>
              <a
                className={styles.visitLink}
                href={`tel:${profile.telephone.replaceAll('-', '')}`}
              >
                {profile.telephone}
              </a>
              {profile.instagram_url && (
                <a className={styles.visitLink} href={profile.instagram_url}>
                  Instagram ↗
                </a>
              )}
              {profile.naver_place_url && (
                <a className={styles.visitLink} href={profile.naver_place_url}>
                  Naver Place ↗
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerWordmark}>{profile.name}</p>
        <p className={styles.footerSlogan}>{slogan}</p>
      </footer>
    </div>
  );
}
