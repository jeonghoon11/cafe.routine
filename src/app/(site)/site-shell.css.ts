import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 799px)';

export const shell = style({
  minHeight: '100svh',
  overflow: 'clip',
});

globalStyle(`${shell} a:focus-visible`, {
  outline: '2px solid currentColor',
  outlineOffset: 5,
});

export const skipLink = style({
  position: 'fixed',
  zIndex: 100,
  top: 12,
  left: 12,
  padding: '12px 16px',
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
  transform: 'translateY(-180%)',
  selectors: { '&:focus': { transform: 'translateY(0)' } },
});

export const header = style({
  position: 'fixed',
  zIndex: 20,
  inset: '0 0 auto',
  display: 'flex',
  minHeight: 72,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 4vw',
  color: '#fff',
  background: 'rgb(9 9 9 / 82%)',
  backdropFilter: 'blur(14px)',
  '@media': { [mobile]: { minHeight: 64, paddingInline: 20 } },
});

export const wordmark = style({
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  fontWeight: 700,
  letterSpacing: '0.12em',
});

export const nav = style({
  display: 'flex',
  gap: 'clamp(16px, 3vw, 48px)',
});

globalStyle(`${nav} a`, {
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
});

export const main = style({ minHeight: '70svh' });

export const footer = style({
  display: 'flex',
  minHeight: '34svh',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: '8vh 4vw',
  color: '#fff',
  background: '#090909',
  '@media': {
    [mobile]: {
      minHeight: '40svh',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      gap: 28,
      padding: '64px 20px',
    },
  },
});

export const footerWordmark = style({
  margin: 0,
  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
  fontWeight: 700,
  lineHeight: 0.8,
  letterSpacing: '-0.06em',
});

export const footerSlogan = style({ margin: 0, letterSpacing: '0.06em' });

globalStyle(`${shell} *, ${shell} *::before, ${shell} *::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      scrollBehavior: 'auto',
      transition: 'none !important',
      transform: 'none !important',
      opacity: '1 !important',
    },
  },
});
