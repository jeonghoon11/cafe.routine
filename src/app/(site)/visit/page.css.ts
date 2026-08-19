import { vars } from '@seed-design/css/vars';
import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 799px)';

export const page = style({
  minHeight: '100svh',
  padding: 'clamp(130px, 18vh, 190px) 4vw 16vh',
  color: '#fff',
  background: '#090909',
  '@media': { [mobile]: { padding: '112px 20px 100px' } },
});

export const intro = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  alignItems: 'end',
  paddingBottom: '8vh',
  borderBottom: '1px solid rgb(255 255 255 / 50%)',
  '@media': { [mobile]: { display: 'block' } },
});

export const eyebrow = style({
  margin: 0,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
  '@media': { [mobile]: { marginBottom: 36 } },
});

export const title = style({
  gridColumn: 2,
  margin: 0,
  fontSize: 'clamp(4rem, 11vw, 10rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
});

export const description = style({
  gridColumn: 2,
  maxWidth: 440,
  margin: '36px 0 0',
  color: 'rgb(255 255 255 / 64%)',
  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
  lineHeight: 1.6,
});

export const details = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '8vw',
  paddingTop: '10vh',
  '@media': { [mobile]: { gridTemplateColumns: '1fr', gap: 72 } },
});

export const detail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
  fontStyle: 'normal',
  lineHeight: 1.6,
});

export const label = style({
  margin: '0 0 28px',
  color: 'rgb(255 255 255 / 56%)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
});

export const hoursList = style({ width: '100%', margin: 0, padding: 0, listStyle: 'none' });

export const hoursItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 24,
});

export const actionLink = style({
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  marginTop: 18,
  borderBottom: '1px solid rgb(255 255 255 / 56%)',
  transition: `border-color ${vars.$duration.d4} ease`,
  selectors: {
    '&:hover': { borderColor: '#fff' },
    '&:focus-visible': { borderColor: '#fff' },
  },
});

export const contactLink = style({
  fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
  letterSpacing: '-0.04em',
});
