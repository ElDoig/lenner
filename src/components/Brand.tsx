import { profile } from '../data/profile';
export function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>{profile.company}</span></span>;
}
