import type { Metadata } from 'next';

import { SITE_URL } from '@/shared/site';

import { RevealOnView } from '../reveal-on-view';
import { getMenu } from './_data/get-menu';

import * as styles from './page.css';

export const metadata: Metadata = {
  title: '메뉴 | ROUTINE',
  description: '카페 루틴의 커피, 티, 디저트 메뉴와 가격을 확인하세요.',
  alternates: {
    canonical: `${SITE_URL}/menu`,
  },
};

const priceFormatter = new Intl.NumberFormat('ko-KR');

export default async function MenuPage() {
  const categories = await getMenu();
  const visibleCategories = categories.filter(
    (category) => category.menu_items.length > 0,
  );

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>ROUTINE / MENU</p>
        <h1 className={styles.title}>Menu.</h1>
        <p className={styles.description}>
          하루의 흐름에 맞춰 준비한 루틴의 메뉴입니다.
        </p>
      </header>

      {visibleCategories.length > 0 && (
        <nav className={styles.categoryNav} aria-label="메뉴 카테고리">
          {visibleCategories.map((category) => (
            <a href={`#${category.slug}`} key={category.id}>
              {category.name}
            </a>
          ))}
        </nav>
      )}

      <div className={styles.categories}>
        {visibleCategories.map((category, categoryIndex) => (
          <section
            className={styles.category}
            id={category.slug}
            key={category.id}
            aria-labelledby={`${category.slug}-title`}
          >
            <RevealOnView className={styles.categoryContent}>
              <div className={styles.categoryRail}>
                <p className={styles.categoryIndex}>
                  {String(categoryIndex + 1).padStart(2, '0')}
                </p>
                <h2
                  className={styles.categoryTitle}
                  id={`${category.slug}-title`}
                >
                  {category.name}
                </h2>
                <p className={styles.categoryCount}>
                  {String(category.menu_items.length).padStart(2, '0')} ITEMS
                </p>
                {category.slug === 'good-morning' && (
                  <p className={styles.categoryNotice}>
                    디카페인 변경 +1,000원
                  </p>
                )}
              </div>
              <ul className={styles.menuList}>
                {category.menu_items.map((item) => (
                  <li
                    className={styles.menuItem}
                    data-available={item.is_available}
                    key={item.id}
                  >
                    <div className={styles.imageFrame}>
                      {item.media_assets ? (
                        <img
                          className={styles.itemImage}
                          src={item.media_assets.src}
                          alt={item.media_assets.alt_text}
                          width={item.media_assets.width}
                          height={item.media_assets.height}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 799px) 112px, 32vw"
                        />
                      ) : (
                        <span
                          className={styles.imageFallback}
                          aria-hidden="true"
                        >
                          ROUTINE
                        </span>
                      )}
                    </div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeading}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        {!item.is_available && (
                          <span className={styles.soldOut}>품절</span>
                        )}
                      </div>
                      {item.description && (
                        <p className={styles.itemDescription}>
                          {item.description}
                        </p>
                      )}
                      <p className={styles.price}>
                        {priceFormatter.format(item.price_krw)}원
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </RevealOnView>
          </section>
        ))}
        {visibleCategories.length === 0 && (
          <p className={styles.emptyState}>현재 준비된 메뉴가 없습니다.</p>
        )}
      </div>

      <p className={styles.notice}>
        메뉴와 가격은 매장 상황에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
