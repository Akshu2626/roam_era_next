'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { markIntroDone } from '@/lib/intro';
import styles from './Intro.module.css';

const WORD = 'ROAM ERA';

/**
 * Short brand reveal on the first load of a session (~2.4s).
 * Skipped for returning visits in the same session and for reduced motion.
 */
export default function Intro() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const root = document.documentElement;
      const finish = () => {
        root.classList.remove('is-intro');
        try {
          sessionStorage.setItem('roam-intro', '1');
        } catch {}
        if (ref.current) ref.current.style.display = 'none';
      };

      if (root.classList.contains('intro-seen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
        markIntroDone();
        return;
      }

      root.classList.add('is-intro');
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ onComplete: finish });
      tl.from(q('[data-char]'), { yPercent: 115, duration: 1.1, stagger: 0.055, ease: 'expo.out' }, 0.15)
        .from(q('[data-rule]'), { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 0.25)
        .from(q('[data-meta]'), { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.08 }, 0.6)
        .to(q('[data-char]'), { yPercent: -115, duration: 0.7, stagger: 0.035, ease: 'expo.in' }, 1.55)
        .to(q('[data-meta]'), { autoAlpha: 0, duration: 0.4 }, 1.55)
        .to(q('[data-rule]'), { scaleX: 0, transformOrigin: 'right', duration: 0.7, ease: 'expo.in' }, 1.6)
        .add(() => markIntroDone(), 2.05)
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'expo.inOut' }, 2.0);

      return () => root.classList.remove('is-intro');
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={styles.intro} aria-hidden="true">
      <div className={styles.inner}>
        <p className={styles.word}>
          {WORD.split('').map((c, i) => (
            <span key={i} className={styles.mask}>
              <span data-char className={styles.char}>
                {c === ' ' ? ' ' : c}
              </span>
            </span>
          ))}
        </p>
        <span data-rule className={styles.rule} />
        <div className={styles.meta}>
          <span data-meta className="eyebrow">Manali</span>
          <span data-meta className="eyebrow">Group journeys</span>
          <span data-meta className="eyebrow">Goa</span>
        </div>
      </div>
    </div>
  );
}
