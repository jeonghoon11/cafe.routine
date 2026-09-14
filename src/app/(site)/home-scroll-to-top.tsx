'use client';

import { useEffect, useState } from 'react';
import { ContextualFloatingButton, Icon } from '@seed-design/react';

import '@seed-design/css/recipes/contextual-floating-button.css';
import * as styles from './page.css';

export function HomeScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(function observeHeroVisibility() {
    const hero = document.getElementById('home-hero');

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const hasHeroExitedAbove =
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;

      setIsVisible(hasHeroExitedAbove);
    });

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const heroTitle = document.getElementById('hero-title');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    heroTitle?.focus({ preventScroll: true });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.scrollToTop}>
      <ContextualFloatingButton
        type="button"
        variant="layer"
        layout="iconOnly"
        aria-label="페이지 상단으로 이동"
        onClick={scrollToTop}
      >
        <Icon
          svg={
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20V4M5 11l7-7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </ContextualFloatingButton>
    </div>
  );
}
