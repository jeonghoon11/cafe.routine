import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

import { routineVars } from './theme.css';

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
  color: routineVars.color.ink,
  background: routineVars.color.paper,
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
  color: routineVars.color.paper,
  background: 'rgb(16 17 18 / 88%)',
  backdropFilter: 'blur(14px)',
  '@media': {
    [mobile]: { minHeight: 64, paddingInline: 20 },
    'screen and (max-width: 359px)': { flexWrap: 'wrap', gap: 8 },
  },
});

export const wordmark = style({
  display: 'inline-flex',
  flexShrink: 0,
  minHeight: 44,
  alignItems: 'center',
});

export const wordmarkImage = style({
  display: 'block',
  height: 20,
  width: 'auto',
  '@media': {
    [mobile]: {
      height: 18,
    },
  },
});

export const nav = style({
  display: 'flex',
  gap: 'clamp(16px, 3vw, 48px)',
});

globalStyle(`${nav} a`, {
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
});

export const main = style({ minHeight: '70svh' });

export const footer = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: '64px 4vw',
  color: routineVars.color.paper,
  background: routineVars.color.dark,
  '@media': {
    [mobile]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 28,
      padding: '48px 20px',
    },
    'screen and (max-width: 359px)': { paddingInline: 8 },
  },
});

export const footerWordmark = style({
  margin: 0,
  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
  fontWeight: vars.$fontWeight.bold,
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
