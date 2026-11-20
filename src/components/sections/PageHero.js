'use client';

import { useRef } from 'react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import styles from './PageHero.module.css';

/** Typographic page opener with a cinematic image strip. */
export default function PageHero({ eyebrow, lines, accent = -1, intro, image, imageAlt = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const strip = q('[data-strip]')[0];
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(q('[data-hero-line] .line-inner'), { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.6, stagger: 0.1, ease: 'expo.out' })
          .fromTo(q('[data-hero-fade]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, 0.4);
        if (strip) {
          const img = strip.querySelector('img');
          tl.fromTo(strip, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' }, 0.3)
            .fromTo(img, { scale: 1.4 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0.4);
          gsap.to(img, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: strip, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
        const off = onIntroDone(() => tl.play());
        return () => off();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.text}>
        <p data-hero-fade className={`eyebrow ${styles.eyebrow}`}>
          {eyebrow}
        </p>
        <MaskLines as="h1" lines={lines} accent={accent} data-hero-line className={`display ${styles.title}`} />
        {intro && (
          <p data-hero-fade className={`lead ${styles.intro}`}>
            {intro}
          </p>
        )}
      </div>
      {image && (
        <div data-strip className={styles.strip}>
          <Picture name={image} alt={imageAlt} priority className="media-fill" />
        </div>
      )}
    </section>
  );
}
