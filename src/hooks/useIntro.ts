import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type IntroPhase = 'loading' | 'videoReveal' | 'videoPlaying' | 'transitionToPortrait' | 'portrait' | 'unavailable';

export function useIntro() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const phaseRef = useRef<IntroPhase>('loading');
  const [phase, setPhase] = useState<IntroPhase>('loading');
  const [imageReady, setImageReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const playPending = useRef(false);
  const frameRequest = useRef<number | undefined>(undefined);
  const animationFrame = useRef<number | undefined>(undefined);

  const changePhase = useCallback((next: IntroPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);
  // Una salida anticipada nunca autoriza mostrar el retrato.
  const skip = useCallback(() => {
    changePhase('unavailable');
    videoRef.current?.pause();
  }, [changePhase]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (reduce || phaseRef.current !== 'loading' || !video || video.readyState < 3 || playPending.current) return;
    playPending.current = true;
    video.muted = true;
    // No se revela al resolver play(): esperamos playing y un frame presentado.
    void video.play().catch(() => {
      // Mantener negro; canplaythrough o un gesto podrán reintentar.
    }).finally(() => { playPending.current = false; });
  }, [reduce]);

  const onPlaying = useCallback(() => {
    setWaiting(false);
    const video = videoRef.current;
    if (!video || phaseRef.current !== 'loading' || frameRequest.current !== undefined || animationFrame.current !== undefined) return;
    const reveal = () => {
      frameRequest.current = undefined;
      animationFrame.current = undefined;
      if (phaseRef.current === 'loading' && !video.paused && video.readyState >= 2) changePhase('videoReveal');
    };
    if ('requestVideoFrameCallback' in video) frameRequest.current = video.requestVideoFrameCallback(reveal);
    else animationFrame.current = requestAnimationFrame(reveal);
  }, [changePhase]);

  const onImageLoad = useCallback(() => {
    const image = imageRef.current;
    if (!image?.naturalWidth) return;
    void image.decode().then(() => setImageReady(true)).catch(() => {
      if (image.complete && image.naturalWidth) setImageReady(true);
    });
  }, []);

  useEffect(() => {
    if (imageRef.current?.complete) onImageLoad();
    if (reduce) { skip(); return; }
    play();
    const video = videoRef.current;
    return () => {
      if (frameRequest.current !== undefined) video?.cancelVideoFrameCallback(frameRequest.current);
      if (animationFrame.current !== undefined) cancelAnimationFrame(animationFrame.current);
      frameRequest.current = undefined;
      animationFrame.current = undefined;
    };
  }, [reduce, skip, play, onImageLoad]);

  useEffect(() => {
    if (phase !== 'loading') return;
    const timeout = window.setTimeout(skip, 7500);
    window.addEventListener('pointerdown', play);
    window.addEventListener('keydown', play);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('pointerdown', play);
      window.removeEventListener('keydown', play);
    };
  }, [phase, play, skip]);

  useEffect(() => {
    if (phase !== 'videoReveal') return;
    const timer = window.setTimeout(() => changePhase('videoPlaying'), 650);
    return () => clearTimeout(timer);
  }, [phase, changePhase]);

  useEffect(() => {
    if (!ended || !imageReady || (phase !== 'videoReveal' && phase !== 'videoPlaying')) return;
    // Conservar el último frame antes de permitir la primera aparición del PNG.
    const timer = window.setTimeout(() => changePhase('transitionToPortrait'), 280);
    return () => clearTimeout(timer);
  }, [ended, imageReady, phase, changePhase]);

  useEffect(() => {
    if (phase !== 'transitionToPortrait') return;
    const timer = window.setTimeout(() => changePhase('portrait'), 450);
    return () => clearTimeout(timer);
  }, [phase, changePhase]);

  useEffect(() => {
    if ((!waiting && !(ended && !imageReady)) || (phase !== 'videoReveal' && phase !== 'videoPlaying')) return;
    const timer = window.setTimeout(skip, 7500);
    return () => clearTimeout(timer);
  }, [waiting, ended, imageReady, phase, skip]);

  const onEnded = useCallback(() => {
    videoRef.current?.pause();
    setWaiting(false);
    setEnded(true);
  }, []);
  const showPortrait = ended && imageReady && (phase === 'transitionToPortrait' || phase === 'portrait');
  const showContent = showPortrait || phase === 'unavailable';
  return { videoRef, imageRef, phase, reduce, play, onPlaying, onEnded, onImageLoad, skip, showPortrait, showContent, onWaiting: () => setWaiting(true) };
}
