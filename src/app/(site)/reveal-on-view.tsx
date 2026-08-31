'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
};

export function RevealOnView({ children, className }: RevealOnViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        content.dataset.reveal = 'visible';
        observer.unobserve(content);
      },
      { rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={contentRef} className={className} data-reveal="pending">
      {children}
    </div>
  );
}
