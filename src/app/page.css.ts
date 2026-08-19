import { vars } from '@seed-design/css/vars';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const light = vars.$color.bg.layerDefault;
const ink = vars.$color.fg.neutral;
const dark = '#090909';
const mobile = 'screen and (max-width: 799px)';

const revealUp = keyframes({
  from: { opacity: 0, transform: 'translateY(48px)' },
});

const heroScale = keyframes({
  to: { transform: 'scale(1.08)' },
});

export const page = style({ overflow: 'clip' });

globalStyle(`${page} a:focus-visible`, {
  outline: '2px solid currentColor',
  outlineOffset: 5,
});

export const skipLink = style({
  position: 'fixed',
  zIndex: 100,
  top: 12,
  left: 12,
  padding: '12px 16px',
  color: ink,
  background: light,
  transform: 'translateY(-180%)',
  selectors: { '&:focus': { transform: 'translateY(0)' } },
});

export const siteHeader = style({
  position: 'fixed',
  zIndex: 20,
  inset: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 72,
  padding: '0 4vw',
  color: '#fff',
  background: 'rgb(9 9 9 / 72%)',
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
  gap: 'clamp(18px, 3vw, 48px)',
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

export const hero = style({
  position: 'relative',
  display: 'flex',
  minHeight: '100svh',
  alignItems: 'flex-end',
  overflow: 'hidden',
  padding: '12vh 4vw 7vh',
  color: '#fff',
  background: '#050505',
  '@media': { [mobile]: { padding: '100px 20px 52px' } },
});

export const heroImage = style({
  objectFit: 'cover',
  '@supports': {
    '(animation-timeline: scroll())': {
      animation: `${heroScale} linear both`,
      animationTimeline: 'scroll()',
      animationRange: '0 100svh',
    },
  },
});

export const heroShade = style({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgb(0 0 0 / 12%) 20%, rgb(0 0 0 / 72%) 100%)',
});

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.$dimension.x4,
  width: '100%',
});

export const sectionIndex = style({
  margin: 0,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
});

export const heroTitle = style({
  margin: 0,
  fontSize: 'clamp(4rem, 13vw, 10rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
  '@media': { [mobile]: { fontSize: 'clamp(4rem, 23vw, 7rem)' } },
});

export const heroSlogan = style({
  margin: 0,
  fontSize: 'clamp(1rem, 1.7vw, 1.5rem)',
  letterSpacing: '-0.02em',
  '@media': { [mobile]: { maxWidth: '18ch' } },
});

export const heroActions = style({
  display: 'flex',
  gap: vars.$dimension.x3,
  marginTop: 8,
  '@media': { [mobile]: { flexWrap: 'wrap' } },
});

export const scrollCue = style({
  position: 'absolute',
  zIndex: 2,
  right: '4vw',
  bottom: '7vh',
  display: 'flex',
  minHeight: 44,
  alignItems: 'center',
  gap: 14,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  '@media': { [mobile]: { display: 'none' } },
});

export const revealSection = style({});

globalStyle(`${revealSection} > *`, {
  '@supports': {
    '(animation-timeline: view())': {
      animation: `${revealUp} linear both`,
      animationTimeline: 'view()',
      animationRange: 'entry 5% cover 32%',
    },
  },
});

export const invitation = style({
  display: 'grid',
  minHeight: '120svh',
  alignContent: 'center',
  gap: 'clamp(40px, 7vh, 80px)',
  padding: '14vh 4vw',
  color: ink,
  background: light,
  '@media': { [mobile]: { minHeight: '100svh', paddingInline: 20 } },
});

export const invitationTitle = style({
  maxWidth: '12ch',
  margin: 0,
  fontSize: 'clamp(3.75rem, 10.5vw, 9rem)',
  lineHeight: 0.88,
  letterSpacing: '-0.07em',
  '@media': { [mobile]: { fontSize: 'clamp(3.4rem, 17vw, 6rem)' } },
});

export const invitationNote = style({
  maxWidth: 360,
  justifySelf: 'end',
  marginRight: '9vw',
  lineHeight: 1.6,
  '@media': { [mobile]: { justifySelf: 'start', marginRight: 0 } },
});

export const coffee = style({
  position: 'relative',
  minHeight: '150svh',
  padding: '12vh 4vw 16vh',
  color: '#fff',
  background: dark,
  '@media': { [mobile]: { minHeight: 'auto', padding: '13vh 20px 16vh' } },
});

export const coffeeHeading = style({
  position: 'sticky',
  zIndex: 1,
  top: '12vh',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.$dimension.x4,
  marginBottom: '14vh',
  pointerEvents: 'none',
  '@media': { [mobile]: { position: 'static', marginBottom: '9vh' } },
});

export const coffeeTitle = style({
  margin: 0,
  fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
  lineHeight: 0.86,
  letterSpacing: '-0.065em',
  '@media': { [mobile]: { fontSize: 'clamp(3.4rem, 16vw, 6rem)' } },
});

export const coffeeGrid = style({
  position: 'relative',
  zIndex: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 'clamp(14px, 2vw, 32px)',
  alignItems: 'start',
  marginTop: '20vh',
  '@media': {
    [mobile]: { gridTemplateColumns: '1fr', gap: '12vh', marginTop: 0 },
  },
});

export const coffeeCard = style({
  margin: 0,
  '@supports': {
    '(animation-timeline: view())': {
      animation: `${revealUp} linear both`,
      animationTimeline: 'view()',
      animationRange: 'entry 5% cover 28%',
    },
  },
});

export const coffeeCardBrew = style({
  marginTop: '28vh',
  '@media': { [mobile]: { marginTop: 0 } },
});

export const coffeeCardPause = style({
  marginTop: '8vh',
  '@media': { [mobile]: { marginTop: 0 } },
});

export const coffeeImage = style({
  position: 'relative',
  aspectRatio: '3 / 4',
  overflow: 'hidden',
  background: '#222',
  '@media': { [mobile]: { aspectRatio: '4 / 5' } },
});

globalStyle(`${coffeeImage} img`, {
  objectFit: 'cover',
  filter: 'grayscale(1) contrast(1.04)',
  transition: `transform ${vars.$duration.d4} ease, filter ${vars.$duration.d4} ease`,
});

globalStyle(`${coffeeCard}:hover ${coffeeImage} img`, {
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      transform: 'scale(1.025)',
      filter: 'grayscale(1) contrast(1.14)',
    },
  },
});

export const coffeeCaption = style({
  marginTop: 14,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.15em',
});

export const visit = style({
  minHeight: '110svh',
  padding: '14vh 4vw 10vh',
  color: ink,
  background: light,
  '@media': { [mobile]: { paddingInline: 20 } },
});

export const visitHeading = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(180px, 1fr) 2fr',
  alignItems: 'end',
  paddingBottom: '6vh',
  borderBottom: `1px solid ${ink}`,
  '@media': { [mobile]: { display: 'block' } },
});

export const visitIndex = style({
  '@media': { [mobile]: { marginBottom: 40 } },
});

export const visitTitle = style({
  margin: 0,
  fontSize: 'clamp(4rem, 10vw, 9rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
  '@media': { [mobile]: { fontSize: 'clamp(4rem, 19vw, 7rem)' } },
});

export const visitDetails = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8vw',
  paddingTop: '8vh',
  '@media': { [mobile]: { gridTemplateColumns: '1fr', gap: 64 } },
});

export const visitDetail = style({
  margin: 0,
  fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
  fontStyle: 'normal',
  lineHeight: 1.55,
});

export const detailLabel = style({ marginBottom: 28 });

export const hoursList = style({ margin: 0, padding: 0, listStyle: 'none' });

export const hoursItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 24,
});

export const visitLinks = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const visitLink = style({
  minHeight: 44,
  paddingTop: 8,
  background:
    'linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat',
  transition: `background-size ${vars.$duration.d4} ease`,
  selectors: {
    '&:hover': { backgroundSize: '100% 1px' },
    '&:focus-visible': { backgroundSize: '100% 1px' },
  },
});

export const footer = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  minHeight: '34svh',
  padding: '8vh 4vw',
  color: '#fff',
  background: dark,
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

globalStyle('html', {
  '@media': { '(prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' } },
});

globalStyle(`${page} *, ${page} *::before, ${page} *::after`, {
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
