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
import styles from './GoaScene.module.css';

const d = destinations.goa;
const WORDS = ['Golden skies', 'Salty air', 'Long nights', 'Barefoot days', 'Warm water'];

/**
 * GOA — the warm world. The scene opens from a single sun-disc that
 * rises and floods the frame with the coast, while embers drift upward.
 */
export default function GoaScene() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
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

        tl.fromTo(q('[data-sun]'), { clipPath: 'circle(9% at 50% 64%)' }, { clipPath: 'circle(16% at 50% 50%)', duration: 0.5, ease: 'power1.inOut' }, 0)
          .to(q('[data-sun]'), { clipPath: 'circle(150% at 50% 50%)', duration: 0.9, ease: 'power2.in' }, 0.5)
          .fromTo(q('[data-sun] img'), { scale: 1.6 }, { scale: 1.05, duration: 1.5, ease: 'power2.out' }, 0)
          .fromTo(q('[data-glow]'), { autoAlpha: 1, scale: 0.6 }, { autoAlpha: 0, scale: 1.8, duration: 1.2 }, 0)
          .fromTo(q('[data-horizon]'), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.05)
          .to(q('[data-horizon]'), { autoAlpha: 0, duration: 0.3 }, 0.9)
          .fromTo(q('[data-pre]'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0.45)
          .fromTo(q('[data-embers]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.9)
          .fromTo(q('[data-title] .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 1.05)
          .fromTo(q('[data-fade]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.45)
          .fromTo(q('[data-marquee]'), { xPercent: 0 }, { xPercent: -50, duration: 2.4 }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const marquee = [...WORDS, ...WORDS];

  return (
    <section ref={ref} id="goa" className={styles.goa} aria-labelledby="goa-title">
      <div data-stage className={styles.stage}>
        <div data-glow className={styles.glow} aria-hidden="true" />
        <span data-horizon className={styles.horizon} aria-hidden="true" />
        <p data-pre className={`eyebrow ${styles.pre}`} aria-hidden="true">
          Meanwhile, on the west coast…
        </p>

        <div data-sun className={styles.sun}>
          <Picture name={d.feature.image} alt={d.feature.alt} className="media-fill" />
          <div className={styles.grade} />
        </div>

        <div data-embers className={styles.embers}>
          <Atmosphere preset="embers" className={styles.embersCanvas} />
        </div>

        <div className={styles.corner} data-fade>
          <span className="eyebrow">{d.index} — The warm world</span>
        </div>
        <div className={`${styles.corner} ${styles.cornerRight}`} data-fade>
          <span className="eyebrow">{d.coordinates}</span>
          <span className="eyebrow">{d.elevation}</span>
        </div>

        <div className={styles.copy}>
          <MaskLines as="h2" id="goa-title" lines={d.headline} accent={1} data-title className={`display ${styles.title}`} />
          <div className={styles.foot}>
            <p className={styles.desc} data-fade>
              {d.description}
            </p>
            <div data-fade>
              <Magnetic>
                <Link href="/destinations/goa" className="btn">
                  Explore Goa <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className={styles.marqueeWrap} aria-hidden="true">
          <div data-marquee className={styles.marquee}>
            {marquee.map((w, i) => (
              <span key={i}>
                {w} <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
