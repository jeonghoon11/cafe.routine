import { vars } from '@seed-design/css/vars';
import { style } from '@vanilla-extract/css';

import { routineVars } from '../theme.css';

const mobile = 'screen and (max-width: 799px)';
const reducedMotion = '(prefers-reduced-motion: reduce)';

export const page = style({
  minHeight: '100svh',
  color: routineVars.color.paper,
  background: routineVars.color.dark,
});

export const intro = style({
  display: 'grid',
  minHeight: '56svh',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  columnGap: 24,
  alignContent: 'end',
  padding: 'clamp(140px, 17vh, 190px) 4vw 10vh',
  '@media': {
    [mobile]: {
      display: 'block',
      minHeight: 'auto',
      padding: '112px 20px 72px',
    },
  },
});

export const eyebrow = style({
  gridRow: 1,
  alignSelf: 'end',
  margin: 0,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.16em',
  '@media': { [mobile]: { marginBottom: 36 } },
});

export const title = style({
  gridRow: 1,
  gridColumn: 2,
  margin: 0,
  fontSize: 'clamp(4rem, 11vw, 10rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
  textWrap: 'balance',
});

export const description = style({
  gridColumn: 2,
  maxWidth: 440,
  margin: '36px 0 0',
  color: routineVars.color.darkSecondary,
  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
  lineHeight: 1.6,
});

export const revealContent = style({
  opacity: 0,
  transform: 'translateY(32px)',
  transition: 'opacity 1000ms ease, transform 1000ms ease',
  selectors: {
    "&[data-reveal='visible']": { opacity: 1, transform: 'translateY(0)' },
  },
  '@media': {
    [reducedMotion]: {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  },
});

export const addressSection = style({
  minHeight: '58svh',
  padding: '12vh 4vw',
  color: routineVars.color.ink,
  background: routineVars.color.paper,
  '@media': {
    [mobile]: { minHeight: 'auto', padding: '88px 20px' },
  },
});

export const addressInner = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 1fr) 2fr',
  gap: 24,
  '@media': { [mobile]: { gridTemplateColumns: '1fr', gap: 36 } },
});

export const addressEyebrow = style({
  margin: 0,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.16em',
});

export const addressContent = style({ minWidth: 0 });

export const addressTitle = style({
  margin: 0,
  fontSize: 'clamp(2.75rem, 5.6vw, 6.5rem)',
  lineHeight: 0.9,
  letterSpacing: '-0.06em',
  textWrap: 'balance',
  '@media': {
    [mobile]: { fontSize: 'clamp(3.2rem, 15vw, 5rem)' },
  },
});

export const address = style({
  marginTop: 48,
  fontSize: 'clamp(1.5rem, 2.3vw, 2.5rem)',
  fontStyle: 'normal',
  lineHeight: 1.35,
  letterSpacing: '-0.035em',
  overflowWrap: 'anywhere',
});

export const mapLink = style({
  display: 'inline-flex',
  boxSizing: 'border-box',
  minHeight: 52,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40,
  paddingInline: 20,
  color: routineVars.color.paper,
  background: routineVars.color.dark,
  fontWeight: vars.$fontWeight.bold,
  textAlign: 'center',
  touchAction: 'manipulation',
  transition: `color ${vars.$duration.d4} ease, background-color ${vars.$duration.d4} ease`,
  selectors: {
    '&:hover': { background: '#292A2B' },
    '&:focus-visible': {
      color: routineVars.color.ink,
      background: routineVars.color.paper,
      outline: '3px solid currentColor',
      outlineOffset: 4,
    },
  },
  '@media': { [mobile]: { width: '100%' } },
});

export const details = style({
  display: 'grid',
  gridTemplateColumns: '7fr 5fr',
  gap: '10vw',
  padding: '14vh 4vw 18vh',
  '@media': {
    [mobile]: {
      gridTemplateColumns: '1fr',
      gap: 88,
      padding: '88px 20px 112px',
    },
  },
});

export const detail = style({ minWidth: 0 });

export const detailEyebrow = style({
  margin: '0 0 28px',
  color: routineVars.color.darkSecondary,
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.16em',
});

export const detailTitle = style({
  margin: '0 0 48px',
  fontSize: 'clamp(2.75rem, 5vw, 5.5rem)',
  lineHeight: 0.9,
  letterSpacing: '-0.055em',
  textWrap: 'balance',
});

export const hoursList = style({ width: '100%', margin: 0 });

export const hoursRow = style({
  display: 'grid',
  minHeight: 58,
  gridTemplateColumns: '1fr auto',
  gap: 24,
  alignItems: 'center',
  borderTop: `1px solid ${routineVars.color.darkBorder}`,
  fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
  lineHeight: 1.5,
  fontVariantNumeric: 'tabular-nums',
});

export const hoursValue = style({ margin: 0, textAlign: 'right' });

export const phoneLink = style({
  display: 'inline-flex',
  minHeight: 44,
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  touchAction: 'manipulation',
  textDecoration: 'underline',
  textDecorationColor: 'transparent',
  textUnderlineOffset: 6,
  transition: `text-decoration-color ${vars.$duration.d4} ease`,
  selectors: {
    '&:hover': { textDecorationColor: 'currentColor' },
    '&:focus-visible': {
      outline: '3px solid currentColor',
      outlineOffset: 4,
    },
  },
});

export const phoneNumber = style({
  fontSize: 'clamp(1.75rem, 3.3vw, 3.75rem)',
  lineHeight: 1.1,
  letterSpacing: '-0.045em',
  fontVariantNumeric: 'tabular-nums',
  overflowWrap: 'anywhere',
});

export const phoneAction = style({
  marginTop: 14,
  fontSize: vars.$fontSize.t4,
  fontWeight: vars.$fontWeight.bold,
});

export const socialLink = style({
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  marginTop: 36,
  borderBottom: '1px solid rgb(244 244 241 / 48%)',
  touchAction: 'manipulation',
  transition: `border-color ${vars.$duration.d4} ease`,
  selectors: {
    '&:hover': { borderColor: routineVars.color.paper },
    '&:focus-visible': {
      borderColor: routineVars.color.paper,
      outline: '3px solid currentColor',
      outlineOffset: 4,
    },
  },
});
