'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Picture from '@/components/ui/Picture';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import { destinationList } from '@/content/destinations';
import styles from './DestinationsSplit.module.css';

/** Two full-height worlds side by side; hovering one lets it take the stage. */
export default function DestinationsSplit() {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(q('[data-panel]'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, stagger: 0.12, ease: 'expo.inOut' })
          .fromTo(q('[data-panel] img'), { scale: 1.4 }, { scale: 1, duration: 2.2, stagger: 0.12, ease: 'expo.out' }, 0.2)
          .fromTo(q('.line-inner'), { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.08, ease: 'expo.out' }, 0.7)
          .fromTo(q('[data-fade]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 1);
        const off = onIntroDone(() => tl.play());
        return () => off();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.split} aria-labelledby="split-title">
      <h1 id="split-title" className="sr-only">
        Roam Era destinations — Manali and Goa
      </h1>
      {destinationList.map((d) => (
        <Link
          key={d.slug}
          href={`/destinations/${d.slug}`}
          data-panel
          className={`${styles.panel} ${styles[d.theme]} ${hover === d.slug ? styles.grow : ''} ${hover && hover !== d.slug ? styles.shrink : ''}`}
          onMouseEnter={() => setHover(d.slug)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(d.slug)}
          onBlur={() => setHover(null)}
          data-cursor="Enter"
        >
          <span className={styles.media}>
            <Picture name={d.feature.image} alt={d.feature.alt} className="media-fill" priority />
          </span>
          <span className={styles.shade} />
          <span className={styles.top}>
            <span className="eyebrow" data-fade>
              {d.index} — {d.region}
            </span>
            <span className="eyebrow" data-fade>
              {d.coordinates}
            </span>
          </span>
          <span className={styles.bottom}>
            <span className={styles.name}>
              <span className="line">
                <span className="line-inner">{d.name}</span>
              </span>
            </span>
            <span className={styles.desc} data-fade>
              {d.description}
            </span>
            <span className={styles.cta} data-fade>
              Explore {d.name} <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </span>
        </Link>
      ))}
    </section>
  );
}
