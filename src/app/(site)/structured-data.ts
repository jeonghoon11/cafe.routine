import type { getBusinessHours, getStoreProfile } from './_data/get-site-data';

const schemaDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

type StoreProfile = Awaited<ReturnType<typeof getStoreProfile>>;
type BusinessHours = Awaited<ReturnType<typeof getBusinessHours>>;

export function createCafeStructuredData(
  profile: StoreProfile,
  businessHours: BusinessHours,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': 'https://cafe-routine.co.kr/#cafe',
    name: '카페 루틴',
    alternateName: profile.name,
    description:
      '서울 성북구 성신여대입구역 인근 카페 루틴의 공식 홈페이지입니다.',
    url: 'https://cafe-routine.co.kr/',
    telephone: profile.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.address,
      addressCountry: 'KR',
    },
    openingHoursSpecification: businessHours
      .filter((hours) => !hours.is_closed)
      .map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${schemaDayNames[hours.day_of_week]}`,
        opens: hours.opens_at.slice(0, 5),
        closes: hours.closes_at.slice(0, 5),
      })),
    hasMenu: 'https://cafe-routine.co.kr/menu',
    sameAs: [profile.instagram_url, profile.naver_place_url].filter(Boolean),
  };
}
