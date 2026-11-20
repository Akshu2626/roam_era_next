'use client';

import { useRef, useState } from 'react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import Reveal from '@/components/animations/Reveal';
import Lightbox from '@/components/ui/Lightbox';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import styles from './Gallery.module.css';

/**
 * Asymmetric editorial gallery. Desktop: staggered grid with clip reveals,
 * parallax and hover captions. Phones: a native swipe reel with snap.
 * Every frame opens a full-screen lightbox.
 */
export default function Gallery({ items, eyebrow = 'Travel moments', title = ['Moments', 'worth the', 'journey.'], intro }) {
  const ref = useRef(null);
  const reel = useRef(null);
  const [open, setOpen] = useState(-1);
  const [current, setCurrent] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const q = gsap.utils.selector(ref);
        q('[data-item]').forEach((item, i) => {
          const media = item.querySelector('[data-media]');
          const image = item.querySelector('img');
          gsap.fromTo(media, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: item, start: 'top 88%' } });
          gsap.fromTo(image, { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 88%' } });
          const speed = [-6, 10, -4, 8, -10, 6, -6, 10][i % 8];
          gsap.to(item, { yPercent: speed, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const onReelScroll = () => {
    const el = reel.current;
    if (!el) return;
    const first = el.firstElementChild;
    const w = first ? first.getBoundingClientRect().width + 14 : el.clientWidth;
    setCurrent(Math.min(items.length, Math.round(el.scrollLeft / w) + 1));
  };

  return (
    <section ref={ref} className={styles.gallery} aria-labelledby="gallery-title">
      <Reveal className={styles.head}>
        <p className="eyebrow" data-reveal="fade">
          {eyebrow}
        </p>
        <MaskLines as="h2" id="gallery-title" lines={title} accent={1} className={`display ${styles.title}`} data-reveal="lines" />
        {intro && (
          <p className={`lead ${styles.intro}`} data-reveal="fade" data-delay="0.2">
            {intro}
          </p>
        )}
      </Reveal>

      <ul ref={reel} className={styles.grid} onScroll={onReelScroll} data-lenis-prevent-touch>
        {items.map((it, i) => (
          <li key={`${it.image}-${i}`} data-item className={styles.item}>
            <button type="button" className={styles.frame} onClick={() => setOpen(i)} data-cursor="View" aria-label={`Open photo: ${it.caption}`}>
              <span data-media className={styles.media}>
                <Picture name={it.image} alt={it.alt} className="media-fill" />
              </span>
              <span className={styles.caption}>
                <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.capText}>{it.caption}</span>
                <span className={`eyebrow ${styles.place}`}>{it.place}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.reelMeta} aria-hidden="true">
        <span className="eyebrow">Swipe</span>
        <span className={styles.reelBar}>
          <span style={{ transform: `scaleX(${current / items.length})` }} />
        </span>
        <span className="eyebrow">
          {String(current).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(-1)} onChange={setOpen} />
    </section>
  );
}
