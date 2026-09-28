import { MotionConfig } from 'framer-motion';
import { HeroIntro } from './sections/HeroIntro';
import { copy } from './data/profile';
import { ProfileSection } from './sections/ProfileSection';
import { CareerSection } from './sections/CareerSection';
import { PrinciplesSection } from './sections/PrinciplesSection';
import { OperationsVisual } from './sections/OperationsVisual';
import { ClosingSection } from './sections/ClosingSection';
import { ProgressRail } from './components/ProgressRail';
export default function App() {
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#vision">{copy.skip}</a><ProgressRail /><main><HeroIntro /><ProfileSection /><CareerSection /><PrinciplesSection /><OperationsVisual /><ClosingSection /></main></MotionConfig>;
}
