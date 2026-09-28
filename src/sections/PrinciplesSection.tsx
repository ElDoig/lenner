import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '../components/SectionLabel';
import { Reveal } from '../components/Reveal';
import { copy, profile } from '../data/profile';
function Principle({ item }: { item: typeof profile.principles[number] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const reduce = useReducedMotion();
  return <article className="principle-scene" ref={ref}>
    <span className="principle-ghost" aria-hidden="true">{item.id}</span>
    <div className="principle-top"><span>{item.keyword}</span><span>{item.id} / 04</span></div>
    <motion.div className="principle-content" style={reduce ? undefined : { y }}><Reveal><span className="principle-marker" aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></Reveal></motion.div>
    <span className="principle-baseline" aria-hidden="true" />
  </article>;
}
export function PrinciplesSection() {
  return <section className="principles-section" id="principios" aria-label={copy.principlesLabel}><div className="principles-label"><SectionLabel number="04">{copy.principlesLabel}</SectionLabel></div>{profile.principles.map(item => <Principle key={item.id} item={item} />)}</section>;
}
