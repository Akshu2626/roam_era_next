'use client';

import { useRef } from 'react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { storyScenes } from '@/content/site';
import styles from './StoryScroll.module.css';

/**
 * Pinned, scroll-scrubbed film sequence: three full-screen scenes wipe in
 * one after another. Each scene has three depth planes — the landscape
 * (slow), a framed inset photograph (fast) and the typography (front).
 */
export default function StoryScroll() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const scenes = q('[data-scene]');
        const n = scenes.length;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (n + 0.4)}`,
            pin: q('[data-stage]')[0],
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scenes.forEach((scene, i) => {
          const sq = gsap.utils.selector(scene);
          const at = i;
          const bg = sq('[data-bg]');
          const lines = sq('.line-inner');
          const inset = sq('[data-inset]');
          const meta = sq('[data-meta]');

          if (i > 0) {
            tl.fromTo(scene, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, at - 0.1);
            tl.fromTo(bg, { scale: 1.35, yPercent: 8 }, { scale: 1.06, yPercent: 0, duration: 1.1, ease: 'power2.out' }, at - 0.1);
            const prevBg = scenes[i - 1].querySelector('[data-bg]');
            tl.to(prevBg, { scale: 1.18, yPercent: -10, duration: 0.9, ease: 'power2.inOut' }, at - 0.1);
          } else {
            tl.fromTo(bg, { scale: 1.12 }, { scale: 1.02, duration: 1 }, 0);
          }

          if (i === 0) {
            // The first title greets the visitor as the section arrives.
            gsap
              .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 55%', toggleActions: 'play none none reverse' } })
              .fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.1, ease: 'expo.out' })
              .fromTo(meta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3);
          } else {
            tl.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, at + 0.35);
            tl.fromTo(meta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.45);
          }
          tl.fromTo(inset, { yPercent: 70, clipPath: 'inset(100% 0% 0% 0%)' }, { yPercent: -40, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2 }, at + 0.2);
        });

        tl.to(q('[data-progress]'), { scaleX: 1, duration: n + 0.3 }, 0);
        tl.to({}, { duration: 0.3 });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="journey" className={styles.story} aria-label="The journey">
      <div data-stage className={styles.stage}>
        {storyScenes.map((s, i) => (
          <div key={s.id} data-scene className={styles.scene} style={{ zIndex: i + 1 }}>
            <div data-bg className={styles.bg}>
              <Picture name={s.image} alt={s.alt} className="media-fill" />
            </div>
            <div className={styles.shade} />

            <div data-inset className={`${styles.inset} ${styles[`inset${i}`]}`}>
              <Picture name={s.inset} alt="" className="media-fill" />
            </div>

            <div className={styles.copy}>
              <p data-meta className={`eyebrow ${styles.meta}`}>
                <span>{s.index}</span>
                <span className={styles.metaRule} />
                <span>{s.label}</span>
              </p>
              <MaskLines
                as="h2"
                lines={s.lines}
                accent={s.accent}
                className={`display ${styles.text}`}
                style={{ '--chars': Math.max(...s.lines.map((l) => l.length)) }}
              />
            </div>
          </div>
        ))}

        <div className={styles.hud} aria-hidden="true">
          <span className="eyebrow">Scroll to travel</span>
          <span className={styles.progress}>
            <span data-progress className={styles.progressBar} />
          </span>
          <span className="eyebrow">0{storyScenes.length}</span>
        </div>
      </div>
    </section>
  );
}
