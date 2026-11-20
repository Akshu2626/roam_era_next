'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { pillars } from '@/content/site';
import styles from './WhyRoamEra.module.css';

/**
 * Editorial manifesto on paper-white. On desktop it travels sideways —
 * a horizontal chapter pinned in place; on phones it becomes a vertical read.
 */
export default function WhyRoamEra({ showStoryLink = true }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.desktop, () => {
        const track = q('[data-track]')[0];
        const distance = () => track.scrollWidth - window.innerWidth;
        const scroller = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        q('[data-panel]').forEach((panel) => {
          const pq = gsap.utils.selector(panel);
          const img = pq('[data-img] img');
          const num = pq('[data-num]');
          if (img.length) gsap.fromTo(img, { xPercent: -14, scale: 1.2 }, {
            xPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
          });
          gsap.from(pq('.line-inner'), {
            yPercent: 115,
            duration: 1.2,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: panel, containerAnimation: scroller, start: 'left 75%', toggleActions: 'play none none reverse' },
          });
          if (num.length) gsap.from(num, {
            yPercent: 40,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: panel, containerAnimation: scroller, start: 'left 80%', toggleActions: 'play none none reverse' },
          });
        });

        gsap.from(q('[data-intro] .line-inner'), {
          yPercent: 115,
          duration: 1.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        });
        gsap.to(q('[data-progress]'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });
      });

      mm.add(MQ.mobile, () => {
        q('[data-panel], [data-intro]').forEach((panel) => {
          gsap.from(panel.querySelectorAll('.line-inner'), {
            yPercent: 115,
            duration: 1.2,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: panel, start: 'top 80%' },
          });
          const image = panel.querySelector('[data-img]');
          if (image) {
            gsap.fromTo(image, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: image, start: 'top 85%' } });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="why" className={styles.why} aria-labelledby="why-title">
      <div data-track className={styles.track}>
        <div data-intro className={`${styles.panel} ${styles.intro}`}>
          <p className={`eyebrow ${styles.kicker}`}>Why Roam Era</p>
          <h2 id="why-title" className={`display ${styles.title}`}>
            <MaskLines lines={["We don't", 'sell trips.']} />
            <MaskLines lines={['We create', 'stories.']} accent={1} className={styles.titleB} />
          </h2>
          <p className={styles.introText}>
            A Roam Era trip is not a package. It is a group of people, a place that changes them, and a handful of days
            that turn into a story they keep telling.
          </p>
          <span className={`eyebrow ${styles.hint}`} aria-hidden="true">
            Keep scrolling <ArrowUpRight size={12} style={{ transform: 'rotate(45deg)' }} />
          </span>
        </div>

        {pillars.map((p, i) => (
          <article key={p.index} data-panel className={`${styles.panel} ${styles.pillar} ${styles[`p${i}`]}`}>
            <span data-num className={styles.num} aria-hidden="true">
              {p.index}
            </span>
            <div data-img className={styles.img}>
              <Picture name={p.image} alt={p.alt} className="media-fill" />
            </div>
            <div className={styles.text}>
              <MaskLines as="h3" lines={p.title} accent={1} className={styles.pillarTitle} />
              <p>{p.text}</p>
            </div>
          </article>
        ))}

        <div data-panel className={`${styles.panel} ${styles.outro}`}>
          <MaskLines as="p" lines={['Four promises.', 'Countless', 'stories.']} accent={1} className={`display ${styles.outroTitle}`} />
          {showStoryLink && (
            <Link href="/our-story" className={`btn btn--dark ${styles.outroBtn}`}>
              Read our story <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span data-progress />
      </div>
    </section>
  );
}
