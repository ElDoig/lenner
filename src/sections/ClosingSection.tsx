import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Brand } from '../components/Brand';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { LINKEDIN_URL, copy, profile } from '../data/profile';
export function ClosingSection() {
  const linkedin = /^https:\/\/(www\.)?linkedin\.com\/in\//i.test(LINKEDIN_URL) ? LINKEDIN_URL : '';
  return <section className="closing-section section-shell" id="contacto">
    <Reveal><SectionLabel number="06">{copy.closingLabel}</SectionLabel><p className="closing-message">{profile.closing}</p></Reveal>
    <Reveal className="closing-identity"><h2>{profile.firstName}<span>{profile.lastName}</span></h2><div className="closing-role"><p>{profile.role}</p><p>{profile.company}</p></div>
      {linkedin ? <a className="linkedin-button" href={linkedin} target="_blank" rel="noopener noreferrer">{copy.linkedin}<ArrowUpRight size={19} /></a> : <><button className="linkedin-button" disabled aria-describedby="linkedin-status">{copy.linkedin}<ArrowUpRight size={19} /></button><p id="linkedin-status" className="linkedin-note">{copy.linkedinPending}</p></>}
    </Reveal>
    <footer><Brand /><a className="back-top" href="#inicio" aria-label={copy.backToTop}><ArrowUp size={17} /></a><p>{copy.footer}</p><span className="footer-monogram" aria-hidden="true">LA /</span></footer>
  </section>;
}
