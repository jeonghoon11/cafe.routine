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
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
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
  width: '100%',
  flexDirection: 'column',
  gap: vars.$dimension.x4,
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
  width: '100%',
  height: '100%',
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

export const explore = style({
  display: 'grid',
  minHeight: '100svh',
  alignContent: 'center',
  gap: 'clamp(36px, 7vh, 72px)',
  padding: '14vh 4vw',
  color: ink,
  background: light,
  '@media': { [mobile]: { minHeight: '90svh', paddingInline: 20 } },
});

export const exploreTitle = style({
  maxWidth: '13ch',
  margin: 0,
  fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
  lineHeight: 0.92,
  letterSpacing: '-0.065em',
});

export const exploreLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px 40px',
});

globalStyle(`${exploreLinks} a`, {
  display: 'inline-flex',
  minHeight: 44,
  alignItems: 'center',
  borderBottom: '1px solid currentColor',
  fontWeight: 700,
});
