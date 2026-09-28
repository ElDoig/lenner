import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { copy, profile } from '../data/profile';
export function CareerSection() {
  return <section className="career-section section-shell" id="recorrido">
    <Reveal><SectionLabel number="03">{copy.careerLabel}</SectionLabel><div className="section-heading"><h2>{copy.careerTitle}</h2><p>{copy.careerNote}</p></div></Reveal>
    <div className="career-list">{profile.career.map(item => <Reveal key={item.id}><article className="career-row"><span className="career-number" aria-hidden="true">{item.year || item.id}</span><div className="career-main"><p className="eyebrow">{item.role || item.label}</p><h3>{item.title}</h3><p className="body-copy">{item.description}</p></div><ArrowUpRight className="career-arrow" size={24} aria-hidden="true" /></article></Reveal>)}</div>
  </section>;
}
