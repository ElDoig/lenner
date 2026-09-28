import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduce = useReducedMotion();
  return <motion.div className="reading-progress" style={{ scaleX: reduce ? scrollYProgress : smooth }} aria-hidden="true" />;
}
