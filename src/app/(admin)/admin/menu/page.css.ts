import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 799px)';

export const header = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 40,
  '@media': { [mobile]: { alignItems: 'stretch', flexDirection: 'column' } },
});

export const eyebrow = style({
  margin: '0 0 8px',
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.12em',
});

export const title = style({
  margin: 0,
  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
  letterSpacing: '-0.05em',
});

export const description = style({
  margin: '12px 0 0',
  color: vars.$color.fg.neutralMuted,
  lineHeight: 1.6,
});

export const section = style({
  padding: '28px 0',
  borderTop: '1px solid ' + vars.$color.stroke.neutralWeak,
});

export const categoryHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 16,
});

export const categoryTitle = style({
  margin: 0,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
});

export const status = style({
  display: 'inline-flex',
  minHeight: 28,
  alignItems: 'center',
  padding: '2px 10px',
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  borderRadius: vars.$radius.full,
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t3,
  whiteSpace: 'nowrap',
});

export const items = style({
  display: 'grid',
  gap: 8,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto auto',
  alignItems: 'center',
  gap: 20,
  padding: '16px 18px',
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  borderRadius: vars.$radius.r2,
  '@media': {
    [mobile]: {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      gap: 12,
      padding: 16,
    },
  },
});

export const itemName = style({
  margin: 0,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
  overflowWrap: 'anywhere',
});

export const itemPrice = style({
  margin: '6px 0 0',
  color: vars.$color.fg.neutralMuted,
  fontSize: vars.$fontSize.t3,
});

export const statuses = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  '@media': { [mobile]: { gridColumn: '1 / -1' } },
});

export const editLink = style({
  display: 'inline-flex',
  minWidth: 68,
  minHeight: 44,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 12px',
  border: '1px solid ' + vars.$color.stroke.neutralMuted,
  borderRadius: vars.$radius.r1,
  fontWeight: vars.$fontWeight.bold,
  '@media': { [mobile]: { gridColumn: 2, gridRow: 1 } },
});

export const restoreForm = style({
  margin: 0,
  '@media': { [mobile]: { gridColumn: 2, gridRow: 1 } },
});

export const restoreButton = style({
  minWidth: 68,
  minHeight: 44,
  padding: '0 12px',
  border: '1px solid ' + vars.$color.stroke.neutralMuted,
  borderRadius: vars.$radius.r1,
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
  font: 'inherit',
  fontWeight: vars.$fontWeight.bold,
  cursor: 'pointer',
});

export const deleted = style({
  marginTop: 24,
});

globalStyle(deleted + ' summary', {
  minHeight: 44,
  alignContent: 'center',
  color: vars.$color.fg.neutralMuted,
  fontWeight: vars.$fontWeight.bold,
  cursor: 'pointer',
});

export const empty = style({
  margin: '12px 0',
  color: vars.$color.fg.neutralMuted,
});

export const message = style({
  margin: '0 0 24px',
  padding: '12px 16px',
  border: '1px solid ' + vars.$color.stroke.neutralWeak,
  borderRadius: vars.$radius.r1,
  lineHeight: 1.5,
});

export const error = style({
  color: vars.$color.fg.critical,
});
