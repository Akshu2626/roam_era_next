'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap';

/**
 * Scroll-triggered entrance for any block.
 *  - `[data-reveal="lines"]`  → masked line rise (MaskLines children)
 *  - `[data-reveal="fade"]`   → soft fade + lift
 *  - `[data-reveal="rule"]`   → horizontal rule draw
 *  - `[data-reveal="media"]`  → clip-path wipe + image settle
 */
export default function Reveal({ children, as: Tag = 'div', className, start = 'top 82%', ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const root = ref.current;
        const groups = [
          ['lines', (el) => gsap.from(el.querySelectorAll('.line-inner'), { yPercent: 110, duration: 1.3, stagger: 0.09, ease: 'expo.out', paused: true })],
          ['fade', (el) => gsap.from(el, { autoAlpha: 0, y: 36, duration: 1.2, ease: 'expo.out', paused: true })],
          ['rule', (el) => gsap.from(el, { scaleX: 0, duration: 1.4, ease: 'expo.inOut', paused: true })],
          [
            'media',
            (el) => {
              const tl = gsap.timeline({ paused: true });
              tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
              const inner = el.querySelector('img');
              if (inner) tl.from(inner, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.1);
              return tl;
            },
          ],
        ];
        const targets = root.matches('[data-reveal]') ? [root] : [];
        targets.push(...root.querySelectorAll('[data-reveal]'));
        targets.forEach((el) => {
          const builder = groups.find(([k]) => k === el.dataset.reveal);
          if (!builder) return;
          const anim = builder[1](el);
          const delay = parseFloat(el.dataset.delay || 0);
          if (delay) anim.delay(delay);
          ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => anim.play() });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
