'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import Magnetic from '@/components/animations/Magnetic';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { whatsappLink } from '@/lib/whatsapp';
import styles from './FinalCTA.module.css';

export default function FinalCTA({ image = 'mountain-dusk', message, secondary = { href: '/destinations', label: 'Or explore destinations' } }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(q('[data-bg]'), { scale: 1.25, yPercent: -8 }, { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 55%' } });
        tl.from(q('.line-inner'), { yPercent: 115, duration: 1.5, stagger: 0.1, ease: 'expo.out' })
          .from(q('[data-fade]'), { autoAlpha: 0, y: 24, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, 0.5);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="plan" className={styles.cta} aria-labelledby="cta-title">
      <div data-bg className={styles.bg}>
        <Picture name={image} alt="" className="media-fill" />
      </div>
      <div className={styles.shade} />

      <div className={styles.content}>
        <p className={`eyebrow ${styles.kicker}`} data-fade>
          The next chapter
        </p>
        <MaskLines as="h2" id="cta-title" lines={['Your next', 'story', 'starts here.']} accent={1} className={`display ${styles.title}`} />
        <p className={styles.sub} data-fade>
          The world is too beautiful to experience through a screen.
        </p>
        <div className={styles.actions} data-fade>
          <Magnetic>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
              <WhatsAppIcon size={16} /> Let&apos;s plan your escape <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </Magnetic>
          {secondary && (
            <Link href={secondary.href} className={`link-line ${styles.secondary}`}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
