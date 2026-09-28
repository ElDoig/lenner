import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Brand } from '../components/Brand';
import { useIntro } from '../hooks/useIntro';
import { copy, profile } from '../data/profile';

export function HeroIntro() {
  const section = useRef<HTMLElement>(null);
  const intro = useIntro();
  const complete = intro.showContent;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, .85], [1, 0]);
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: complete ? 1 : 0, y: complete ? 0 : 22 }, transition: { duration: intro.reduce ? 0 : .9, delay: intro.reduce ? 0 : delay, ease: [.22, 1, .36, 1] as [number, number, number, number] } });
  return <section ref={section} className={`hero ${complete ? 'hero-ready' : 'hero-intro'}`} data-intro-phase={intro.phase} id="inicio" aria-label="Presentación de Lenner Amaya Esquivel">
    <header className="hero-header" inert={!complete}><a href="#inicio" aria-label="Inicio"><Brand /></a><motion.a {...reveal(.75)} href="#contacto" className="header-contact">Conectemos <ArrowUpRight size={14} /></motion.a></header>
    <motion.div className="hero-composition" style={intro.reduce ? undefined : { y, opacity }}>
      <motion.div {...reveal(.12)} className="hero-eyebrow"><span className="blue-dot" />{profile.concept}<span className="edition">LA / 01</span></motion.div>
      <motion.div {...reveal(0)} className="hero-firstname" aria-hidden="true">{profile.firstName}</motion.div>
      <div className="character" data-phase={intro.phase}>
        <img ref={intro.imageRef} className="character-image" src="/assets/lenner-final.png" alt="Lenner Amaya Esquivel, con los brazos cruzados" width="1024" height="1536" fetchPriority="high" onLoad={intro.onImageLoad} aria-hidden={!intro.showPortrait} style={{ opacity: intro.showPortrait ? 1 : 0, visibility: intro.showPortrait ? 'visible' : 'hidden' }} />
        {!intro.reduce && <video ref={intro.videoRef} className="character-video" src="/assets/lenner-intro.mp4" autoPlay muted playsInline preload="auto" onCanPlay={intro.play} onCanPlayThrough={intro.play} onPlaying={intro.onPlaying} onEnded={intro.onEnded} onWaiting={intro.onWaiting} onError={intro.onWaiting} aria-hidden="true" />}
        <span className={`portrait-veil ${intro.showPortrait ? 'veil-transition' : ''}`} />
      </div>
      <motion.div {...reveal(.15)} className="hero-name"><h1><span className="sr-only">{profile.firstName} </span>AMAYA<br /><span>ESQUIVEL</span></h1><div className="hero-role"><span className="role-rule" /><div><p>{profile.role}</p><p>{profile.company}</p></div></div></motion.div>
      <motion.div {...reveal(.7)} className="hero-side-note"><span>PERSONAS.</span><span>PROCESOS.</span><span>MOVIMIENTO.</span></motion.div>
    </motion.div>
    <motion.div {...reveal(.95)} className="hero-bottom" inert={!complete}><p>{profile.tagline}</p><a href="#vision" className="scroll-cue"><span>{copy.discover}</span><ArrowDown size={16} /></a><span className="hero-index">01 — 06</span></motion.div>
    {(intro.phase === 'videoReveal' || intro.phase === 'videoPlaying') && <button className="skip-intro" onClick={intro.skip}>{copy.introSkip}<ArrowUpRight size={13} /></button>}
    <span className="hero-baseline" />
  </section>;
}
