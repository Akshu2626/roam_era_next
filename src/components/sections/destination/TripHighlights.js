'use client';

import { useRef, useState } from 'react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import Reveal from '@/components/animations/Reveal';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './TripHighlights.module.css';

/**
 * Numbered highlight list. On desktop a floating photograph follows the
 * pointer and swaps as you move between rows; on touch screens each row
 * shows its own image inline.
 */
export default function TripHighlights({ d }) {
  const ref = useRef(null);
  const float = useRef(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const el = float.current;
      const list = ref.current.querySelector('[data-list]');
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
      const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3.out' });
      let lastX = 0;
      const move = (e) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      };
      list.addEventListener('pointermove', move);
      return () => list.removeEventListener('pointermove', move);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`${styles.wrap} ${styles[d.theme]}`} aria-labelledby="highlights-title">
      <Reveal className={styles.head}>
        <p className="eyebrow" data-reveal="fade">
          Trip highlights
        </p>
        <MaskLines as="h2" id="highlights-title" lines={['What the', 'days hold']} accent={1} className={`display ${styles.title}`} data-reveal="lines" />
        <p className={`lead ${styles.note}`} data-reveal="fade" data-delay="0.15">
          The experiences we build our {d.name} journeys around. Exact plans are shaped with each group.
        </p>
      </Reveal>

      <div data-list className={styles.listWrap} onMouseLeave={() => setActive(-1)}>
        <Reveal as="ol" className={styles.list}>
          {d.highlights.map((h, i) => (
            <li
              key={h.title}
              className={`${styles.row} ${active === i ? styles.on : ''}`}
              onMouseEnter={() => setActive(i)}
              data-reveal="fade"
              data-delay={i * 0.05}
            >
              <span className={`eyebrow ${styles.idx}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.rowTitle}>{h.title}</h3>
              <p className={styles.rowText}>{h.text}</p>
              <span className={styles.thumb}>
                <Picture name={h.image} alt="" className="media-fill" />
              </span>
            </li>
          ))}
        </Reveal>

        <div ref={float} className={`${styles.float} ${active >= 0 ? styles.floatOn : ''}`} aria-hidden="true">
          {d.highlights.map((h, i) => (
            <div key={h.title} className={styles.floatImg} style={{ opacity: active === i ? 1 : 0 }}>
              <Picture name={h.image} alt="" className="media-fill" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
