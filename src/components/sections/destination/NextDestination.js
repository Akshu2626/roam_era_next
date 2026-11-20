import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Picture from '@/components/ui/Picture';
import styles from './NextDestination.module.css';

export default function NextDestination({ d }) {
  return (
    <section className={styles.next} aria-label={`Next destination: ${d.name}`}>
      <Link href={`/destinations/${d.slug}`} className={styles.link} data-cursor="Travel">
        <span className={styles.media}>
          <Picture name={d.hero.image} alt="" className="media-fill" />
        </span>
        <span className={styles.shade} />
        <span className={styles.content}>
          <span className="eyebrow">Next world — {d.index} / 02</span>
          <span className={styles.name}>{d.name}</span>
          <span className={styles.desc}>
            {d.description} <ArrowRight size={18} strokeWidth={1.25} />
          </span>
        </span>
      </Link>
    </section>
  );
}
