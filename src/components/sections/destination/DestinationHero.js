'use client';

import { useRef } from 'react';
import Picture from '@/components/ui/Picture';
import Atmosphere from '@/components/three/Atmosphere';
import { scrollToTarget, useLenis } from '@/components/layout/SmoothScroll';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import styles from './DestinationHero.module.css';

export default function DestinationHero({ d }) {
  const ref = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const intro = gsap.timeline({ paused: true });
        intro
          .fromTo(q('[data-media]'), { scale: 1.3 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
          .fromTo(q('[data-char]'), { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: 0.06, ease: 'expo.out' }, 0.2)
          .fromTo(q('[data-hero-fade]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out' }, 0.6);
        const off = onIntroDone(() => intro.play());

        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(q('[data-media-scroll]'), { yPercent: 20, ease: 'none' }, 0)
          .to(q('[data-name]'), { yPercent: 35, ease: 'none' }, 0)
          .to(q('[data-dim]'), { opacity: 0.7, ease: 'none' }, 0);
        return () => off();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`${styles.hero} ${styles[d.theme]}`} aria-labelledby="dest-title">
      <div data-media-scroll className={styles.media}>
        <div data-media className={styles.media}>
          <Picture name={d.hero.image} alt={d.hero.alt} priority className="media-fill" />
        </div>
      </div>
      <Atmosphere preset={d.theme === 'cold' ? 'snow' : 'embers'} className={styles.particles} />
      <div className={styles.shade} />
      <div data-dim className={styles.dim} />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span data-hero-fade className="eyebrow">
            {d.index} / 02 — {d.region}
          </span>
          <span data-hero-fade className="eyebrow">
            {d.coordinates}
          </span>
        </div>

        <div className={styles.center}>
          <p data-hero-fade className={styles.mood}>
            {d.description}
          </p>
          <button type="button" data-hero-fade className={`eyebrow ${styles.cue}`} onClick={() => scrollToTarget(lenis, '#story')}>
            Discover {d.name} <span aria-hidden="true">↓</span>
          </button>
        </div>

        <h1 id="dest-title" data-name className={styles.name} aria-label={`${d.name} group trips`}>
          {d.name.split('').map((c, i) => (
            <span key={i} className={styles.mask} aria-hidden="true">
              <span data-char className={styles.char}>
                {c}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
