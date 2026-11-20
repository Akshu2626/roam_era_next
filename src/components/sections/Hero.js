'use client';

import { useRef } from 'react';
import Picture from '@/components/ui/Picture';
import Atmosphere from '@/components/three/Atmosphere';
import { scrollToTarget, useLenis } from '@/components/layout/SmoothScroll';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import { site } from '@/content/site';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // Entrance — plays the moment the intro curtain lifts.
        const intro = gsap.timeline({ paused: true });
        intro
          .fromTo(q('[data-media-intro]'), { scale: 1.4 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
          .fromTo(q('[data-hero-line] .line-inner'), { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1.7, stagger: 0.12, ease: 'expo.out' }, 0.15)
          .fromTo(q('[data-hero-fade]'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, 0.7);
        const unsubscribe = onIntroDone(() => intro.play());

        // Scroll — the landscape sinks and darkens while the title lifts away.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        tl.to(q('[data-media-scroll]'), { yPercent: 22, scale: 1.12, ease: 'none' }, 0)
          .to(q('[data-hero-title]'), { yPercent: -40, ease: 'none' }, 0)
          .to(q('[data-hero-content]'), { autoAlpha: 0, ease: 'power1.in' }, 0)
          .to(q('[data-hero-dim]'), { opacity: 0.75, ease: 'none' }, 0);

        return () => unsubscribe();
      });

      // Mouse depth — background and title drift in opposite directions.
      mm.add(`${MQ.desktop} and (pointer: fine)`, () => {
        const bgX = gsap.quickTo(q('[data-media-mouse]'), 'x', { duration: 1.6, ease: 'power3.out' });
        const bgY = gsap.quickTo(q('[data-media-mouse]'), 'y', { duration: 1.6, ease: 'power3.out' });
        const tX = gsap.quickTo(q('[data-hero-title]'), 'x', { duration: 1.6, ease: 'power3.out' });
        const move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          bgX(nx * -28);
          bgY(ny * -18);
          tX(nx * 14);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <div data-media-intro className={styles.layer}>
          <div data-media-scroll className={styles.layer}>
            <div data-media-mouse className={styles.mouseLayer}>
              <Picture name="hero-peaks-above-clouds" alt="Himalayan peaks rising above a sea of clouds at sunset" priority className="media-fill" />
            </div>
          </div>
        </div>
      </div>

      <Atmosphere preset="dust" className={styles.particles} />
      <div className={styles.shade} />
      <div data-hero-dim className={styles.dim} />

      <div data-hero-content className={styles.content}>
        <div className={styles.topMeta}>
          <span data-hero-fade className="eyebrow">
            Vol. 01 — Group journeys
          </span>
          <span data-hero-fade className="eyebrow">
            Manali <i className={styles.dot} /> Goa
          </span>
        </div>

        <h1 id="hero-title" data-hero-title data-hero-line className={`display ${styles.title}`}>
          <span className="line">
            <span className="line-inner">The world</span>
          </span>
          <span className={`line ${styles.lineRight}`}>
            <span className="line-inner">
              <em className={styles.is}>is</em> waiting.
            </span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <p data-hero-fade className={styles.sub}>
            {site.tagline.split('. ').map((s, i, arr) => (
              <span key={i}>
                {s}
                {i < arr.length - 1 ? '.' : ''}
              </span>
            ))}
          </p>

          <button type="button" data-hero-fade className={styles.cue} onClick={() => scrollToTarget(lenis, '#journey')}>
            <span className="eyebrow">Begin the journey</span>
            <span className={styles.cueTrack} aria-hidden="true">
              <span className={styles.cueBar} />
            </span>
          </button>

          <p data-hero-fade className={`eyebrow ${styles.coords}`}>
            <span>32.24° N</span>
            <span>77.19° E</span>
          </p>
        </div>
      </div>
    </section>
  );
}
