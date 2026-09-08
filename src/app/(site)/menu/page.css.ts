import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

import { routineVars } from '../theme.css';

const mobile = 'screen and (max-width: 799px)';
const fallback = '#E8E8E4';

export const page = style({
  padding: 'clamp(130px, 18vh, 190px) 4vw 16vh',
  color: routineVars.color.ink,
  background: routineVars.color.paper,
  '@media': { [mobile]: { padding: '112px 20px 100px' } },
});

export const intro = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  alignItems: 'end',
  paddingBottom: '8vh',
  borderBottom: `1px solid ${routineVars.color.lightBorder}`,
  '@media': { [mobile]: { display: 'block' } },
});

export const eyebrow = style({
  margin: 0,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
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
  color: routineVars.color.secondary,
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
  background: 'rgb(244 244 241 / 92%)',
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
  fontSize: vars.$fontSize.t3,
  fontWeight: vars.$fontWeight.bold,
});

globalStyle(`${categoryNav} a:hover`, {
  color: routineVars.color.paper,
  background: routineVars.color.ink,
});

globalStyle(`${categoryNav} a:focus-visible`, {
  outline: `3px solid ${routineVars.color.ink}`,
  outlineOffset: 3,
});

export const categories = style({});

export const category = style({
  padding: '12vh 0',
  borderBottom: `1px solid ${routineVars.color.lightBorder}`,
  scrollMarginTop: 145,
  '@media': { [mobile]: { scrollMarginTop: 130 } },
});

export const categoryContent = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  opacity: 0,
  transform: 'translateY(32px)',
  transition:
    'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
  selectors: {
    "&[data-reveal='visible']": { opacity: 1, transform: 'translateY(0)' },
  },
  '@media': {
    [mobile]: { display: 'block' },
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  },
});

export const categoryRail = style({
  position: 'sticky',
  top: 164,
  display: 'grid',
  gridTemplateAreas: '"index" "title" "count" "notice"',
  gap: 20,
  alignSelf: 'start',
  '@media': {
    [mobile]: {
      position: 'static',
      gridTemplateAreas: '"index count" "title title" "notice notice"',
      gridTemplateColumns: '1fr auto',
    },
  },
});

export const categoryIndex = style({
  gridArea: 'index',
  margin: 0,
  color: routineVars.color.secondary,
  fontSize: vars.$fontSize.t2,
  fontWeight: vars.$fontWeight.bold,
});

export const categoryTitle = style({
  gridArea: 'title',
  maxWidth: '7ch',
  margin: 0,
  fontSize: 'clamp(2.75rem, 4vw, 4.75rem)',
  lineHeight: 0.92,
  letterSpacing: '-0.055em',
  textWrap: 'balance',
});

export const categoryCount = style({
  gridArea: 'count',
  margin: 0,
  color: routineVars.color.secondary,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.14em',
  '@media': { [mobile]: { justifySelf: 'end' } },
});

export const categoryNotice = style({
  gridArea: 'notice',
  margin: 0,
  color: routineVars.color.secondary,
  fontSize: vars.$fontSize.t3,
  lineHeight: 1.5,
});

export const menuList = style({
  gridColumn: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '48px 24px',
  margin: 0,
  padding: '0 0 56px',
  listStyle: 'none',
  '@media': {
    [mobile]: { display: 'block', marginTop: 36, paddingBottom: 0 },
  },
});

export const menuItem = style({
  minWidth: 0,
  selectors: {
    '&[data-available="false"]': { color: routineVars.color.secondary },
  },
  '@media': {
    [mobile]: {
      display: 'grid',
      gridTemplateColumns: '112px minmax(0, 1fr)',
      gap: 16,
      padding: '20px 0',
      borderTop: `1px solid ${routineVars.color.lightBorder}`,
    },
  },
});

globalStyle(`${menuItem}:nth-child(even)`, {
  marginTop: 56,
  '@media': { [mobile]: { marginTop: 0 } },
});

export const imageFrame = style({
  position: 'relative',
  display: 'grid',
  aspectRatio: '4 / 3',
  placeItems: 'center',
  overflow: 'hidden',
  color: routineVars.color.secondary,
  background: fallback,
  selectors: {
    [`${menuItem}[data-available="false"] &`]: { opacity: 0.55 },
  },
  '@media': { [mobile]: { width: 112, height: 112, aspectRatio: '1' } },
});

export const itemImage = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const imageFallback = style({
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
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
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
});

export const itemDescription = style({
  margin: '7px 0 0',
  color: routineVars.color.secondary,
  fontSize: vars.$fontSize.t4,
  lineHeight: 1.5,
});

export const price = style({
  margin: '16px 0 0',
  fontSize: vars.$fontSize.t5,
  fontVariantNumeric: 'tabular-nums',
  '@media': { [mobile]: { marginTop: 'auto', paddingTop: 8 } },
});

export const emptyState = style({
  margin: 0,
  padding: '15vh 0',
  color: routineVars.color.secondary,
  textAlign: 'center',
});

export const notice = style({
  margin: '64px 0 0',
  color: routineVars.color.secondary,
  fontSize: vars.$fontSize.t3,
  lineHeight: 1.6,
});
