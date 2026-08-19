import type { Metadata } from 'next';

import { getMenu } from './_data/get-menu';

import * as styles from './page.css';

export const metadata: Metadata = {
  title: '메뉴 | ROUTINE',
  description: '카페 루틴의 커피, 티, 디저트 메뉴와 가격을 확인하세요.',
};

const priceFormatter = new Intl.NumberFormat('ko-KR');

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>ROUTINE / MENU</p>
        <h1 className={styles.title}>Menu.</h1>
        <p className={styles.description}>
          하루의 흐름에 맞춰 준비한 루틴의 메뉴입니다.
        </p>
      </header>

      <nav className={styles.categoryNav} aria-label="메뉴 카테고리">
        {categories.map((category) => (
          <a href={`#${category.slug}`} key={category.id}>
            {category.name}
          </a>
        ))}
      </nav>

      <div className={styles.categories}>
        {categories.map((category, categoryIndex) => (
          <section
            className={styles.category}
            id={category.slug}
            key={category.id}
            aria-labelledby={`${category.slug}-title`}
          >
            <p className={styles.categoryIndex}>
              {String(categoryIndex + 1).padStart(2, '0')}
            </p>
            <h2 className={styles.categoryTitle} id={`${category.slug}-title`}>
              {category.name}
            </h2>
            <ul className={styles.menuList}>
              {category.menu_items.map((item) => (
                <li className={styles.menuItem} key={item.id}>
                  <div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    {item.description && (
                      <p className={styles.itemDescription}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className={styles.price}>
                    {priceFormatter.format(item.price_krw)}원
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className={styles.notice}>
        디카페인 변경 +1,000원 · 메뉴와 가격은 매장 상황에 따라 달라질 수
        있습니다.
      </p>
    </div>
  );
}
