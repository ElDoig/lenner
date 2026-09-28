import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { copy, profile } from '../data/profile';
export function ProfileSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [-30, 35]);
  const reduce = useReducedMotion();
  return <section className="profile-section section-shell" id="vision" ref={ref}>
    <Reveal><SectionLabel number="02">{copy.profileLabel}</SectionLabel></Reveal>
    <div className="profile-grid"><Reveal><h2 className="display-title">{copy.profileTitle[0]}<br />{copy.profileTitle[1]}<br /><span className="text-blue">{copy.profileTitle[2]}</span></h2></Reveal>
    <div className="profile-copy"><Reveal delay={.1}><span className="small-cross" aria-hidden="true">+</span><p className="lead-copy">{profile.bio}</p><p className="body-copy">{profile.bioSecondary}</p><span className="signature">Lenner Amaya <span>/</span></span></Reveal></div></div>
    <div className="horizon" aria-hidden="true"><motion.span style={reduce ? undefined : { x }}>PERSONAS &nbsp; / &nbsp; PROCESOS &nbsp; / &nbsp; MOVIMIENTO</motion.span><i /></div>
  </section>;
}
