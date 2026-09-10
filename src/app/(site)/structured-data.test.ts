import assert from 'node:assert/strict';
import test from 'node:test';

import { createCafeStructuredData } from './structured-data.ts';

test('공개된 매장 정보와 영업 중인 요일만 구조화한다', () => {
  const structuredData = createCafeStructuredData(
    {
      name: 'ROUTINE',
      slogan: 'Invite Us to Your ROUTINE',
      address: '서울시 성북구 보문로34가길 6',
      telephone: '02-6489-4589',
      instagram_url: 'https://www.instagram.com/cafe.routine/',
      naver_place_url: null,
    },
    [
      {
        day_of_week: 0,
        opens_at: '11:00:00',
        closes_at: '22:00:00',
        is_closed: false,
      },
      {
        day_of_week: 1,
        opens_at: '11:00:00',
        closes_at: '22:00:00',
        is_closed: true,
      },
    ],
  );

  assert.deepEqual(structuredData.openingHoursSpecification, [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Sunday',
      opens: '11:00',
      closes: '22:00',
    },
  ]);
  assert.deepEqual(structuredData.sameAs, [
    'https://www.instagram.com/cafe.routine/',
  ]);
});
