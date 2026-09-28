import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { copy } from '../data/profile';
export function OperationsVisual() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 80%'] });
  const pathLength = useTransform(scrollYProgress, [0, .85], [0, 1]);
  const reduce = useReducedMotion();
  return <section ref={ref} className="operations-section section-shell" id="conexion">
    <Reveal><SectionLabel number="05">{copy.operationsLabel}</SectionLabel></Reveal>
    <div className="operations-grid"><Reveal className="operations-copy"><h2 className="display-title">{copy.operationsTitle}</h2><p className="body-copy">{copy.operationsText}</p></Reveal>
    <div className="route-composition" role="img" aria-label="Ruta abstracta que conecta planificación, coordinación y movimiento en una operación portuaria">
      <div className="route-caption"><span>FLUJO OPERATIVO</span><span>ESQUEMA / 01</span></div>
      <svg className="route-svg" viewBox="0 0 480 510" fill="none" aria-hidden="true">
        <defs><pattern id="route-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" stroke="#7f9abd" strokeOpacity=".1" strokeWidth=".7" /></pattern><linearGradient id="route-color" x1="65" y1="85" x2="390" y2="425" gradientUnits="userSpaceOnUse"><stop stopColor="#79b2f5" /><stop offset="1" stopColor="#2866ab" /></linearGradient></defs>
        <rect width="480" height="510" fill="url(#route-grid)" />
        <path d="M0 400H115V350H200V510M355 0V100H415V180H480M0 155H115V0" stroke="#92a8c3" strokeOpacity=".2" />
        <path d="M12 440L460 35M20 490L478 75" stroke="#637c97" strokeOpacity=".16" strokeDasharray="3 8" />
        <circle cx="247" cy="255" r="132" stroke="#7591b4" strokeOpacity=".12" /><circle cx="247" cy="255" r="88" stroke="#7591b4" strokeOpacity=".09" />
        <path d="M72 104H163Q187 104 187 128V231Q187 255 211 255H316Q342 255 342 281V376Q342 402 369 402H417" stroke="#26374a" strokeWidth="2" />
        <motion.path d="M72 104H163Q187 104 187 128V231Q187 255 211 255H316Q342 255 342 281V376Q342 402 369 402H417" stroke="url(#route-color)" strokeWidth="2" style={{ pathLength: reduce ? 1 : pathLength }} />
        {[[72,104],[247,255],[417,402]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="15" fill="#0a1523" stroke="#6ca1e1" strokeOpacity=".6" /><circle cx={cx} cy={cy} r="4" fill="#8cbbf0" /></g>)}
        <g stroke="#6c83a0" strokeWidth="1"><path d="M25 20V30M20 25H30M450 475V485M445 480H455" /></g>
      </svg>
      <span className="route-label route-label-one">01 <span>{copy.routeLabels[0]}</span></span><span className="route-label route-label-two">02 <span>{copy.routeLabels[1]}</span></span><span className="route-label route-label-three">03 <span>{copy.routeLabels[2]}</span></span>
      <div className="route-footer"><span><i className="blue-dot" /> PUERTO · EQUIPO · PROCESO</span><span>→</span></div>
    </div></div>
  </section>;
}
