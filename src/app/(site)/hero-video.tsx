import * as styles from './page.css';

export function HeroVideo() {
  return (
    <video
      className={styles.heroVideo}
      src="/media/routine-opening.mp4"
      poster="/media/routine-opening-poster.webp"
      aria-hidden="true"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}
