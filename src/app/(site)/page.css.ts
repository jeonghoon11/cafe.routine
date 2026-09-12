import { vars } from '@seed-design/css/vars';
import { globalStyle, style } from '@vanilla-extract/css';

import { routineVars } from './theme.css';

const mobile = 'screen and (max-width: 799px)';

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

export const heroVideo = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  '@media': {
    [mobile]: { objectPosition: '32% center' },
    '(prefers-reduced-motion: reduce)': { display: 'none' },
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
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.16em',
});

export const heroTitle = style({
  margin: 0,
  fontSize: 'clamp(4rem, 13vw, 10rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
  '@media': { [mobile]: { fontSize: 'clamp(4rem, 20vw, 7rem)' } },
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
  fontSize: vars.$fontSize.t1,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  '@media': { [mobile]: { display: 'none' } },
});

export const scrollToTop = style({
  position: 'fixed',
  zIndex: 10,
  right: 'calc(20px + env(safe-area-inset-right))',
  bottom: 'calc(20px + env(safe-area-inset-bottom))',
});

export const revealContent = style({
  opacity: 0,
  transform: 'translateY(32px)',
  transition: 'opacity 1000ms ease, transform 1000ms ease',
  selectors: {
    "&[data-reveal='visible']": { opacity: 1, transform: 'translateY(0)' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  },
});

export const invitation = style({
  display: 'grid',
  minHeight: '120svh',
  alignContent: 'center',
  padding: '14vh 4vw',
  color: routineVars.color.ink,
  background: routineVars.color.paper,
  '@media': { [mobile]: { minHeight: '100svh', paddingInline: 20 } },
});

export const invitationContent = style({
  display: 'grid',
  gap: 'clamp(40px, 7vh, 80px)',
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

export const space = style({
  position: 'relative',
  padding: '14vh 4vw 18vh',
  color: routineVars.color.paper,
  background: routineVars.color.dark,
  '@media': {
    [mobile]: { padding: '104px 20px 120px' },
  },
});

export const spaceHeading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.$dimension.x4,
});

export const spaceTitle = style({
  maxWidth: '10ch',
  margin: 0,
  fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
  lineHeight: 0.86,
  letterSpacing: '-0.065em',
  '@media': { [mobile]: { fontSize: 'clamp(3.4rem, 16vw, 6rem)' } },
});

export const spaceDescription = style({
  maxWidth: '34ch',
  margin: 0,
  color: routineVars.color.darkSecondary,
  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
  lineHeight: 1.6,
});

export const spaceGallery = style({
  position: 'relative',
  zIndex: 2,
  display: 'grid',
  gridTemplateColumns: '5fr 7fr',
  gap: 'clamp(24px, 3vw, 48px)',
  alignItems: 'start',
  marginTop: 'clamp(96px, 12vh, 144px)',
  '@media': {
    [mobile]: { gridTemplateColumns: '1fr', gap: 64, marginTop: 64 },
  },
});

export const spaceCard = style({});

export const spaceCardActive = style({
  marginTop: '10vh',
  '@media': { [mobile]: { marginTop: 0 } },
});

export const spaceCardClosing = style({
  width: '72%',
  gridColumn: '1 / -1',
  justifySelf: 'end',
  marginTop: '8vh',
  '@media': {
    [mobile]: {
      width: '100%',
      gridColumn: 'auto',
      marginTop: 0,
    },
  },
});

export const spaceFigure = style({ margin: 0 });

export const spaceImage = style({
  overflow: 'hidden',
  background: '#242526',
});

globalStyle(`${spaceImage} img`, {
  display: 'block',
  width: '100%',
  height: 'auto',
});

export const spaceCaption = style({
  marginTop: 14,
  fontSize: 10,
  fontWeight: vars.$fontWeight.bold,
  letterSpacing: '0.15em',
});

export const explore = style({
  display: 'grid',
  minHeight: '100svh',
  alignContent: 'center',
  padding: '14vh 4vw',
  color: routineVars.color.ink,
  background: routineVars.color.paper,
  '@media': { [mobile]: { minHeight: '90svh', paddingInline: 20 } },
});

export const exploreContent = style({
  display: 'grid',
  gap: 'clamp(36px, 7vh, 72px)',
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
  fontWeight: vars.$fontWeight.bold,
});
