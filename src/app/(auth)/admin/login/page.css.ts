import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

export const page = style({
  display: 'grid',
  minHeight: '100svh',
  placeItems: 'center',
  padding: '24px',
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
});

export const card = style({
  width: 'min(100%, 440px)',
  padding: 'clamp(28px, 6vw, 48px)',
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  borderRadius: vars.$radius.r3,
  background: vars.$color.bg.layerDefault,
});

export const eyebrow = style({
  margin: '0 0 12px',
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.12em',
});

export const title = style({
  margin: 0,
  fontSize: 'clamp(2rem, 8vw, 2.75rem)',
  letterSpacing: '-0.04em',
});

export const description = style({
  margin: '12px 0 28px',
  color: vars.$color.fg.neutralMuted,
  lineHeight: 1.6,
});

export const form = style({
  display: 'grid',
  gap: 20,
});

export const field = style({
  display: 'grid',
  gap: 8,
  fontWeight: vars.$fontWeight.bold,
});

globalStyle(form + ' input', {
  width: '100%',
  minHeight: 48,
  padding: '10px 12px',
  border: '1px solid ' + vars.$color.stroke.neutralMuted,
  borderRadius: vars.$radius.r1,
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
  font: 'inherit',
});

globalStyle(form + ' input:focus-visible', {
  outline: '3px solid ' + vars.$color.stroke.focusRing,
  outlineOffset: 2,
});

export const error = style({
  margin: '0 0 20px',
  color: vars.$color.fg.critical,
  lineHeight: 1.5,
});
