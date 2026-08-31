import Link from 'next/link';

import {
  getHomeMedia,
  getSpaceMedia,
  getStoreProfile,
} from './_data/get-site-data';
import { HeroActions } from './hero-actions';
import { HeroVideo } from './hero-video';
import { RevealOnView } from './reveal-on-view';

import * as styles from './page.css';

const spaceCaptions = [
  'SPACE / 01 — COURTYARD',
  'SPACE / 02 — INTERIOR',
  'SPACE / 03 — NIGHT GARDEN',
  'SPACE / 04 — INTERIOR',
];

export default async function HomePage() {
  const [profile, homeMedia, spaceMedia] = await Promise.all([
    getStoreProfile(),
    getHomeMedia(),
    getSpaceMedia(),
  ]);

  if (homeMedia.length !== 1) {
    throw new Error('홈 Hero에는 공개 이미지 1장이 필요합니다.');
  }

  const [hero] = homeMedia;
  const spaceCardClasses = [
    styles.spaceCard,
    `${styles.spaceCard} ${styles.spaceCardActive}`,
    styles.spaceCard,
    `${styles.spaceCard} ${styles.spaceCardClosing}`,
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
        <HeroVideo />
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
        className={styles.invitation}
        id="invitation"
        aria-labelledby="invitation-title"
      >
        <RevealOnView
          className={`${styles.revealContent} ${styles.invitationContent}`}
        >
          <p className={styles.sectionIndex}>ROUTINE / 02 — INVITATION</p>
          <h2 className={styles.invitationTitle} id="invitation-title">
            {slogan}
          </h2>
          <p className={styles.invitationNote}>{profile.address}</p>
        </RevealOnView>
      </section>

      {spaceMedia.length === 4 && (
        <section className={styles.space} aria-labelledby="space-title">
          <RevealOnView
            className={`${styles.revealContent} ${styles.spaceHeading}`}
          >
            <p className={styles.sectionIndex}>ROUTINE / 03 — SPACE</p>
            <h2 className={styles.spaceTitle} id="space-title">
              Inside ROUTINE.
            </h2>
            <p className={styles.spaceDescription}>
              창가의 빛과 긴 테이블, 밤의 정원까지. 루틴의 공간을 둘러보세요.
            </p>
          </RevealOnView>

          <div className={styles.spaceGallery}>
            {spaceMedia.map((asset, index) => (
              <RevealOnView
                className={`${styles.revealContent} ${spaceCardClasses[index]}`}
                key={asset.object_path}
              >
                <figure className={styles.spaceFigure}>
                  <div className={styles.spaceImage}>
                    <img
                      src={asset.src}
                      alt={asset.alt_text}
                      width={asset.width}
                      height={asset.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className={styles.spaceCaption}>
                    {spaceCaptions[index]}
                  </figcaption>
                </figure>
              </RevealOnView>
            ))}
          </div>
        </section>
      )}

      <section className={styles.explore} aria-labelledby="explore-title">
        <RevealOnView
          className={`${styles.revealContent} ${styles.exploreContent}`}
        >
          <p className={styles.sectionIndex}>ROUTINE / 04 — EXPLORE</p>
          <h2 className={styles.exploreTitle} id="explore-title">
            Your routine,
            <br />
            one cup at a time.
          </h2>
          <div className={styles.exploreLinks}>
            <Link href="/menu">메뉴 살펴보기 ↗</Link>
            <Link href="/visit">방문 정보 확인하기 ↗</Link>
          </div>
        </RevealOnView>
      </section>
    </div>
  );
}
