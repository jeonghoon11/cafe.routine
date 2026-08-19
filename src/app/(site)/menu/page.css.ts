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
  margin: '48px 0 0',
  padding: 0,
  listStyle: 'none',
});

export const menuItem = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: 24,
  padding: '24px 0',
  borderTop: `1px solid ${vars.$color.stroke.neutralSubtle}`,
});

export const itemName = style({
  margin: 0,
  fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
  letterSpacing: '-0.02em',
});

export const itemDescription = style({
  margin: '7px 0 0',
  color: vars.$color.fg.neutralSubtle,
  fontSize: 14,
});

export const price = style({ margin: 0, fontVariantNumeric: 'tabular-nums' });

export const notice = style({
  margin: '64px 0 0',
  color: vars.$color.fg.neutralSubtle,
  fontSize: 13,
  lineHeight: 1.6,
});
