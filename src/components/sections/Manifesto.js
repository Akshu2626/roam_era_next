'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import styles from './Manifesto.module.css';

/**
 * Long-form statement whose words light up as you read down the page.
 * Wrap words in *asterisks* to set them in italic serif.
 */
export default function Manifesto({ eyebrow, text }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ref.current.querySelectorAll('[data-word]'),
          { opacity: 0.14 },
          { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: ref.current.querySelector('p'), start: 'top 80%', end: 'bottom 45%', scrub: true } }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const words = text.split(' ');

  return (
    <section ref={ref} className={styles.manifesto}>
      {eyebrow && <span className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</span>}
      <p className={styles.text}>
        {words.map((w, i) => {
          const italic = w.startsWith('*');
          const clean = w.replace(/\*/g, '');
          return (
            <span key={i} data-word className={italic ? styles.em : undefined}>
              {clean}{' '}
            </span>
          );
        })}
      </p>
    </section>
  );
}
