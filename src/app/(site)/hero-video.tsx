'use client';

import { useEffect, useRef } from 'react';

import * as styles from './page.css';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const shouldShowVideo = !window.matchMedia(
      '(max-width: 799px), (prefers-reduced-motion: reduce)',
    ).matches;

    if (!video || !shouldShowVideo) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) {
          void video.play();
          return;
        }

        video.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.heroVideo}
      src="/media/routine-opening.mp4"
      aria-hidden="true"
      loop
      muted
      playsInline
      preload="none"
    />
  );
}
