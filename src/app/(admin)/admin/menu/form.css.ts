import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

export const form = style({
  display: 'grid',
  gap: 24,
  maxWidth: 720,
});

export const field = style({
  display: 'grid',
  gap: 8,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
});

globalStyle(
  form +
    ' input:not([type=checkbox]):not([type=radio]), ' +
    form +
    ' select, ' +
    form +
    ' textarea',
  {
    width: '100%',
    minHeight: 48,
    padding: '10px 12px',
    border: '1px solid ' + vars.$color.stroke.neutralMuted,
    borderRadius: vars.$radius.r1,
    color: vars.$color.fg.neutral,
    background: vars.$color.bg.layerDefault,
    font: 'inherit',
    fontWeight: vars.$fontWeight.regular,
  },
);

globalStyle(
  form +
    ' input:not([type=checkbox]):not([type=radio]):focus-visible, ' +
    form +
    ' select:focus-visible, ' +
    form +
    ' textarea:focus-visible',
  {
    outline: '3px solid ' + vars.$color.stroke.focusRing,
    outlineOffset: 2,
  },
);

export const numberFields = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 20,
  '@media': {
    'screen and (max-width: 799px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const inputWithSuffix = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const help = style({
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t3,
  fontWeight: vars.$fontWeight.regular,
  lineHeight: 1.5,
});

export const states = style({
  display: 'grid',
  gap: 12,
  margin: 0,
  padding: 20,
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  borderRadius: vars.$radius.r2,
});

export const confirm = style({
  display: 'flex',
  minHeight: 48,
  alignItems: 'center',
  gap: 12,
  lineHeight: 1.5,
});

globalStyle(states + ' legend', {
  padding: '0 8px',
  fontWeight: vars.$fontWeight.bold,
});

globalStyle(states + ' label, .' + confirm, {
  display: 'flex',
  minHeight: 44,
  alignItems: 'center',
  gap: 12,
  lineHeight: 1.5,
});

globalStyle(
  states +
    ' input:is([type=checkbox], [type=radio]), .' +
    confirm +
    ' input:is([type=checkbox], [type=radio])',
  {
    width: 20,
    height: 20,
    flex: '0 0 auto',
    accentColor: vars.$color.fg.neutral,
  },
);

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
});

export const error = style({
  margin: 0,
  color: vars.$color.fg.critical,
  lineHeight: 1.5,
});

export const deleteSection = style({
  maxWidth: 720,
  marginTop: 56,
  paddingTop: 28,
  borderTop: '1px solid ' + vars.$color.stroke.neutralWeak,
});

globalStyle(deleteSection + ' h2', {
  marginTop: 0,
  fontSize: vars.$fontSize.t1,
});

globalStyle(deleteSection + ' p', {
  color: vars.$color.fg.neutralMuted,
  lineHeight: 1.6,
});

export const deleteButton = style({
  minHeight: 48,
  marginTop: 12,
  padding: '0 16px',
  border: '1px solid ' + vars.$color.stroke.criticalWeak,
  borderRadius: vars.$radius.r1,
  color: vars.$color.fg.critical,
  background: vars.$color.bg.layerDefault,
  font: 'inherit',
  fontWeight: vars.$fontWeight.bold,
  cursor: 'pointer',
});

export const imagePreview = style({
  width: '100%',
  maxWidth: 320,
  maxHeight: 320,
  objectFit: 'contain',
  borderRadius: vars.$radius.r1,
});
