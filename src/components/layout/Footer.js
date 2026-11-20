'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { navigation, site } from '@/content/site';
import { destinationList } from '@/content/destinations';
import { whatsappLink } from '@/lib/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import Reveal from '@/components/animations/Reveal';
import { scrollToTarget, useLenis } from './SmoothScroll';
import styles from './Footer.module.css';

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();
  const years = year > site.foundedYear ? `${site.foundedYear}–${year}` : `${year}`;

  return (
    <footer className={styles.footer}>
      <Reveal className={styles.top}>
        <p className={styles.statement} data-reveal="fade">
          Two worlds.
          <br />
          <em>One era.</em>
        </p>

        <div className={styles.cols}>
          <div data-reveal="fade" data-delay="0.05">
            <h2 className="eyebrow">Destinations</h2>
            <ul>
              {destinationList.map((d) => (
                <li key={d.slug}>
                  <Link href={`/destinations/${d.slug}`} className={styles.link}>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="fade" data-delay="0.1">
            <h2 className="eyebrow">Navigate</h2>
            <ul>
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={styles.link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="fade" data-delay="0.15">
            <h2 className="eyebrow">Connect</h2>
            <ul>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <WhatsAppIcon size={15} /> WhatsApp <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <InstagramIcon size={15} /> {site.instagram.label} <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.wordmark} start="top 95%">
        <p aria-hidden="true" data-reveal="lines">
          <span className="line">
            <span className="line-inner">
              Roam <em>Era</em>
            </span>
          </span>
        </p>
      </Reveal>

      <div className={styles.bottom}>
        <p>
          © {years} {site.name}. All rights reserved.
        </p>
        <p className={styles.hideSm}>Group journeys · Manali &amp; Goa</p>
        <button type="button" className={styles.top_btn} onClick={() => scrollToTarget(lenis, 0, { duration: 2 })}>
          Back to top <ArrowUp size={14} strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
}
