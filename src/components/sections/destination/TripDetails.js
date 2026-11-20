import { ArrowUpRight } from 'lucide-react';
import MaskLines from '@/components/animations/MaskLines';
import Reveal from '@/components/animations/Reveal';
import Magnetic from '@/components/animations/Magnetic';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { whatsappLink } from '@/lib/whatsapp';
import styles from './TripDetails.module.css';

/**
 * Trip facts + enquiry. Values come from `trip` in content/destinations.js
 * and are deliberately editable placeholders until a departure is confirmed.
 */
export default function TripDetails({ d }) {
  return (
    <section className={styles.details} aria-labelledby="details-title">
      <Reveal className={styles.inner}>
        <div className={styles.left}>
          <p className="eyebrow" data-reveal="fade">
            Trip details
          </p>
          <MaskLines as="h2" id="details-title" lines={['Save', 'your seat.']} accent={0} className={`display ${styles.title}`} data-reveal="lines" />
          <p className={`body-copy ${styles.copy}`} data-reveal="fade">
            Departures, pricing and seat availability are confirmed personally — message us and we will send the latest
            {` ${d.name}`} itinerary, inclusions and dates straight to your WhatsApp.
          </p>
          <div data-reveal="fade" className={styles.cta}>
            <Magnetic>
              <a href={whatsappLink(d.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                <WhatsAppIcon size={16} /> Enquire about {d.name} <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className={styles.table}>
          {d.trip.map((t, i) => (
            <div key={t.label} className={styles.cell} data-reveal="fade" data-delay={i * 0.06}>
              <dt className="eyebrow">{t.label}</dt>
              <dd>{t.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
