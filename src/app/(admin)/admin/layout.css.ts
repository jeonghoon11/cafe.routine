import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

export const shell = style({
  minHeight: '100svh',
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
});

export const skipLink = style({
  position: 'fixed',
  zIndex: 10,
  top: 8,
  left: 8,
  padding: '12px 16px',
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  transform: 'translateY(-150%)',
  selectors: { '&:focus': { transform: 'translateY(0)' } },
});

export const header = style({
  display: 'flex',
  minHeight: 68,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '12px max(24px, calc((100vw - 1120px) / 2))',
  borderBottom: '1px solid ' + vars.$color.stroke.neutralWeak,
});

globalStyle(header + ' form', {
  margin: 0,
});

export const wordmark = style({
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  gap: 10,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.08em',
});

globalStyle(wordmark + ' span', {
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t3,
});

export const main = style({
  width: 'min(100% - 40px, 1120px)',
  margin: '0 auto',
  padding: '48px 0 80px',
  '@media': {
    'screen and (max-width: 799px)': {
      width: 'min(100% - 32px, 1120px)',
      padding: '32px 0 56px',
    },
  },
});

globalStyle(shell + ' a:focus-visible, ' + shell + ' button:focus-visible', {
  outline: '3px solid ' + vars.$color.stroke.focusRing,
  outlineOffset: 3,
});
