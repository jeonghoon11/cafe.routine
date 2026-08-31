import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 799px)';

export const page = style({
  padding: 'clamp(130px, 18vh, 190px) 4vw 16vh',
  color: vars.$color.fg.neutral,
  background: vars.$color.bg.layerDefault,
  '@media': { [mobile]: { padding: '112px 20px 100px' } },
});

export const intro = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  alignItems: 'end',
  paddingBottom: '8vh',
  borderBottom: '1px solid currentColor',
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
  color: vars.$color.fg.neutralSubtle,
  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
  lineHeight: 1.6,
});

export const categoryNav = style({
  position: 'sticky',
  zIndex: 5,
  top: 72,
  display: 'flex',
  gap: 8,
  padding: '14px 0',
  overflowX: 'auto',
  background: 'rgb(255 255 255 / 92%)',
  backdropFilter: 'blur(12px)',
  scrollbarWidth: 'none',
  '@media': { [mobile]: { top: 64 } },
});

globalStyle(`${categoryNav} a`, {
  display: 'inline-flex',
  minHeight: 44,
  flex: '0 0 auto',
  alignItems: 'center',
  padding: '0 18px',
  border: '1px solid currentColor',
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 700,
});

globalStyle(`${categoryNav} a:hover`, {
  color: vars.$color.bg.layerDefault,
  background: vars.$color.fg.neutral,
});

globalStyle(`${categoryNav} a:focus-visible`, {
  outline: `3px solid ${vars.$color.fg.neutral}`,
  outlineOffset: 3,
});

export const categories = style({});

export const category = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  padding: '12vh 0',
  borderBottom: `1px solid ${vars.$color.stroke.neutralSubtle}`,
  scrollMarginTop: 145,
  '@media': { [mobile]: { display: 'block', scrollMarginTop: 130 } },
});

export const categoryIndex = style({
  margin: 0,
  color: vars.$color.fg.neutralSubtle,
  fontSize: 12,
  fontWeight: 700,
});

export const categoryTitle = style({
  gridColumn: 2,
  margin: 0,
  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
  lineHeight: 0.92,
  letterSpacing: '-0.055em',
  '@media': { [mobile]: { marginTop: 20 } },
});

export const menuList = style({
  gridColumn: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '48px 24px',
  margin: '48px 0 0',
  padding: 0,
  listStyle: 'none',
  '@media': { [mobile]: { display: 'block', marginTop: 36 } },
});

export const menuItem = style({
  minWidth: 0,
  selectors: {
    '&[data-available="false"]': { color: vars.$color.fg.neutralSubtle },
  },
  '@media': {
    [mobile]: {
      display: 'grid',
      gridTemplateColumns: '112px minmax(0, 1fr)',
      gap: 16,
      padding: '20px 0',
      borderTop: `1px solid ${vars.$color.stroke.neutralSubtle}`,
    },
  },
});

export const imageFrame = style({
  position: 'relative',
  display: 'grid',
  aspectRatio: '4 / 3',
  placeItems: 'center',
  overflow: 'hidden',
  color: vars.$color.fg.neutralSubtle,
  background: vars.$color.bg.neutralWeak,
  selectors: {
    [`${menuItem}[data-available="false"] &`]: { opacity: 0.55 },
  },
  '@media': { [mobile]: { width: 112, height: 112, aspectRatio: '1' } },
});

export const itemImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const imageFallback = style({
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
});

export const itemContent = style({
  minWidth: 0,
  marginTop: 16,
  '@media': {
    [mobile]: {
      display: 'flex',
      minHeight: 112,
      flexDirection: 'column',
      marginTop: 0,
    },
  },
});

export const itemHeading = style({
  display: 'flex',
  minWidth: 0,
  gap: 8,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const itemName = style({
  minWidth: 0,
  margin: 0,
  overflowWrap: 'anywhere',
  fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
  lineHeight: 1.25,
  letterSpacing: '-0.02em',
});

export const soldOut = style({
  flex: '0 0 auto',
  padding: '3px 7px',
  border: '1px solid currentColor',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
});

export const itemDescription = style({
  margin: '7px 0 0',
  color: vars.$color.fg.neutralSubtle,
  fontSize: 14,
  lineHeight: 1.5,
});

export const price = style({
  margin: '16px 0 0',
  fontSize: 16,
  fontVariantNumeric: 'tabular-nums',
  '@media': { [mobile]: { marginTop: 'auto', paddingTop: 8 } },
});

export const emptyState = style({
  margin: 0,
  padding: '15vh 0',
  color: vars.$color.fg.neutralSubtle,
  textAlign: 'center',
});

export const notice = style({
  margin: '64px 0 0',
  color: vars.$color.fg.neutralSubtle,
  fontSize: 13,
  lineHeight: 1.6,
});
