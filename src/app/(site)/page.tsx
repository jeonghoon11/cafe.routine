import Link from 'next/link';

import { getHomeMedia, getStoreProfile } from './_data/get-site-data';
import { HeroActions } from './hero-actions';

import * as styles from './page.css';

export default async function HomePage() {
  const [profile, homeMedia] = await Promise.all([
    getStoreProfile(),
    getHomeMedia(),
  ]);

  if (homeMedia.length !== 4) {
    throw new Error('홈 화면에는 공개 이미지 4장이 필요합니다.');
  }

  const [hero, beans, brew, pause] = homeMedia;
  const coffeeCards = [
    { asset: beans, className: styles.coffeeCard },
    {
      asset: brew,
      className: `${styles.coffeeCard} ${styles.coffeeCardBrew}`,
    },
    {
      asset: pause,
      className: `${styles.coffeeCard} ${styles.coffeeCardPause}`,
    },
  ];
  const slogan = profile.slogan ?? profile.name;

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <img
          className={styles.heroImage}
          src={hero.src}
          alt={hero.alt_text}
          width={hero.width}
          height={hero.height}
          fetchPriority="high"
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

      <section className={styles.coffee} aria-labelledby="coffee-title">
        <div className={styles.coffeeHeading}>
          <p className={styles.sectionIndex}>ROUTINE / 03 — COFFEE</p>
          <h2 className={styles.coffeeTitle} id="coffee-title">
            Coffee.
          </h2>
        </div>

        <div className={styles.coffeeGrid}>
          {coffeeCards.map(({ asset, className }, index) => (
            <figure
              className={className}
              key={asset.object_path}
            >
              <div className={styles.coffeeImage}>
                <img
                  src={asset.src}
                  alt={asset.alt_text}
                  width={asset.width}
                  height={asset.height}
                  loading="lazy"
                />
              </div>
              <figcaption className={styles.coffeeCaption}>
                COFFEE / {String(index + 1).padStart(2, '0')}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className={`${styles.explore} ${styles.revealSection}`}
        aria-labelledby="explore-title"
      >
        <p className={styles.sectionIndex}>ROUTINE / 04 — EXPLORE</p>
        <h2 className={styles.exploreTitle} id="explore-title">
          Your routine,
          <br />one cup at a time.
        </h2>
        <div className={styles.exploreLinks}>
          <Link href="/menu">메뉴 살펴보기 ↗</Link>
          <Link href="/visit">방문 정보 확인하기 ↗</Link>
        </div>
      </section>
    </div>
  );
}
