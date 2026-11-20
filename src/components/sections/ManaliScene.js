'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import Magnetic from '@/components/animations/Magnetic';
import Atmosphere from '@/components/three/Atmosphere';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { destinations } from '@/content/destinations';
import styles from './ManaliScene.module.css';

const d = destinations.manali;

/**
 * MANALI — the cold world. A small window into the Himalaya opens to fill
 * the screen while mist drifts across and snow falls in WebGL depth.
 */
export default function ManaliScene() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, (ctx) => {
        const q = gsap.utils.selector(ref);
        const small = window.matchMedia('(max-width: 899px)').matches;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.4}`,
            pin: q('[data-stage]')[0],
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          q('[data-window]'),
          { clipPath: small ? 'inset(22% 10% 30% 10%)' : 'inset(20% 32% 24% 32%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' },
          0
        )
          .fromTo(q('[data-window] img'), { scale: 1.55, filter: 'grayscale(1) brightness(.8)' }, { scale: 1.05, filter: 'grayscale(.35) brightness(1)', duration: 1.6, ease: 'power2.out' }, 0)
          .fromTo(q('[data-ghost]'), { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 1.15, duration: 0.7 }, 0.2)
          .fromTo(q('[data-mist-a]'), { xPercent: -20 }, { xPercent: 12, duration: 2.6 }, 0)
          .fromTo(q('[data-mist-b]'), { xPercent: 15 }, { xPercent: -15, duration: 2.6 }, 0)
          .fromTo(q('[data-snow]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.6)
          .fromTo(q('[data-title] .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 0.95)
          .fromTo(q('[data-fade]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.4)
          .fromTo(q('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 1.3)
          .to(q('[data-window] img'), { yPercent: -4, duration: 0.8 }, 1.8);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="manali" className={styles.manali} aria-labelledby="manali-title">
      <div data-stage className={styles.stage}>
        <p data-ghost className={styles.ghost} aria-hidden="true">
          {d.name}
        </p>

        <div data-window className={styles.window}>
          <Picture name={d.feature.image} alt={d.feature.alt} className="media-fill" />
        </div>

        <div data-mist-a className={`${styles.mist} ${styles.mistA}`} aria-hidden="true" />
        <div data-mist-b className={`${styles.mist} ${styles.mistB}`} aria-hidden="true" />
        <div data-snow className={styles.snow}>
          <Atmosphere preset="snow" className={styles.snowCanvas} />
        </div>
        <div className={styles.shade} />

        <div className={styles.corner} data-fade>
          <span className="eyebrow">{d.index} — The cold world</span>
        </div>
        <div className={`${styles.corner} ${styles.cornerRight}`} data-fade>
          <span className="eyebrow">{d.coordinates}</span>
          <span className="eyebrow">{d.elevation}</span>
        </div>

        <div className={styles.copy}>
          <MaskLines as="h2" id="manali-title" lines={d.headline} accent={1} data-title className={`display ${styles.title}`} />
          <span data-rule className={`rule ${styles.rule}`} />
          <div className={styles.foot}>
            <p className={styles.desc} data-fade>
              {d.description}
            </p>
            <div data-fade>
              <Magnetic>
                <Link href="/destinations/manali" className="btn">
                  Explore Manali <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
