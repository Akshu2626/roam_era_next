'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

/** Scroll to an element or y-position, using Lenis when it is active. */
export function scrollToTarget(lenis, target, opts = {}) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, ...opts });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else el?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Lenis smooth scrolling (desktop, motion allowed) synced with GSAP's ticker
 * so ScrollTrigger timelines stay perfectly in step. Touch devices keep
 * native scrolling; reduced-motion users get no smoothing at all.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return () => window.removeEventListener('load', refresh);

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Every route change starts at the top and re-measures triggers.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
