'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import MaskLines from '@/components/animations/MaskLines';
import Globe from '@/components/three/Globe';
import { destinationList } from '@/content/destinations';
import styles from './Worlds.module.css';

/** "Two different worlds" — destination index paired with an interactive globe. */
export default function Worlds({ eyebrow = 'Destinations', title = ['Two', 'different', 'worlds.'] }) {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const select = (slug, navigate) => {
    setActive(slug);
    if (navigate) router.push(`/destinations/${slug}`);
  };

  return (
    <section className={styles.worlds} aria-labelledby="worlds-title">
      <Reveal className={styles.head}>
        <p className="eyebrow" data-reveal="fade">
          {eyebrow}
        </p>
        <MaskLines as="h2" id="worlds-title" lines={title} accent={1} className={`display ${styles.title}`} data-reveal="lines" />
        <p className={`lead ${styles.lead}`} data-reveal="fade" data-delay="0.2">
          One in the clouds, one on the coast. Same people, same spirit — completely different worlds.
        </p>
      </Reveal>

      <div className={styles.grid}>
        <Reveal as="ul" className={styles.list} onMouseLeave={() => setActive(null)}>
          {destinationList.map((d, i) => (
            <li key={d.slug} data-reveal="fade" data-delay={i * 0.1}>
              <Link
                href={`/destinations/${d.slug}`}
                className={`${styles.row} ${active === d.slug ? styles.on : ''}`}
                onMouseEnter={() => setActive(d.slug)}
                onFocus={() => setActive(d.slug)}
                data-cursor="Explore"
              >
                <span className={`eyebrow ${styles.idx}`}>{d.index}</span>
                <span className={styles.name}>{d.name}</span>
                <span className={styles.meta}>
                  <span>{d.region}</span>
                  <span>{d.coordinates}</span>
                </span>
                <ArrowUpRight className={styles.arrow} size={28} strokeWidth={1} />
              </Link>
            </li>
          ))}
        </Reveal>

        <div className={styles.globe}>
          <Globe destinations={destinationList} active={active} onSelect={select} />
          <p className={`eyebrow ${styles.caption}`}>Tropic of Cancer · 23.44° N runs between them</p>
        </div>
      </div>
    </section>
  );
}
