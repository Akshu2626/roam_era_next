'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';

/** Scroll-linked vertical drift (percentage of own height). */
export default function Parallax({ children, amount = 10, className, style }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -amount / 2 },
          { yPercent: amount / 2, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [amount] }
  );
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
