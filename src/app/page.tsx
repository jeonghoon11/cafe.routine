import { createSupabaseServerClient } from '@/shared/supabase/server';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const [profileResult, hoursResult] = await Promise.all([
    supabase.from('store_profile').select('*').single(),
    supabase.from('business_hours').select('*').order('day_of_week'),
  ]);

  if (profileResult.error) {
    throw profileResult.error;
  }
  if (hoursResult.error) {
    throw hoursResult.error;
  }

  const profile = profileResult.data;

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{profile.slogan}</p>
      <address>{profile.address}</address>
      <ul aria-label="영업시간">
        {hoursResult.data.map((hours) => (
          <li key={hours.day_of_week}>
            {DAY_NAMES[hours.day_of_week]}요일{' '}
            {hours.is_closed
              ? '휴무'
              : `${hours.opens_at.slice(0, 5)}–${hours.closes_at.slice(0, 5)}`}
          </li>
        ))}
      </ul>
      <a href={`tel:${profile.telephone.replaceAll('-', '')}`}>
        {profile.telephone}
      </a>
    </main>
  );
}
