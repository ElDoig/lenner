import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useIntro() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<'loading' | 'playing' | 'holding' | 'complete'>('loading');
  const [imageReady, setImageReady] = useState(false);
  const done = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const finish = useCallback(() => {
    done.current = true;
    setPhase('complete');
  }, []);
  const hold = useCallback(() => {
    if (done.current) return;
    videoRef.current?.pause();
    setPhase('holding');
    holdTimer.current = setTimeout(finish, 280);
  }, [finish]);
  useEffect(() => () => clearTimeout(holdTimer.current), []);
  useEffect(() => {
    if (phase !== 'loading') return;
    const loadingLimit = window.setTimeout(finish, 2800);
    return () => window.clearTimeout(loadingLimit);
  }, [phase, finish]);
  const play = useCallback(() => {
    if (done.current || reduce) return;
    const promise = videoRef.current?.play();
    promise?.catch(finish);
  }, [finish, reduce]);
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth) setImageReady(true);
    if (reduce) { finish(); return; }
    play();
    // Una conexión lenta nunca bloquea el acceso a la presentación.
    const fallback = window.setTimeout(finish, 7500);
    return () => window.clearTimeout(fallback);
  }, [reduce, finish, play]);
  useEffect(() => {
    if (phase !== 'complete') return;
    const timer = window.setTimeout(() => videoRef.current?.pause(), 500);
    return () => window.clearTimeout(timer);
  }, [phase]);
  return { videoRef, imageRef, phase, imageReady, setImageReady, finish, hold, play, reduce, onPlaying: () => { if (!done.current) setPhase('playing'); } };
}
