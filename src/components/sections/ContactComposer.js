'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import MaskLines from '@/components/animations/MaskLines';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { whatsappLink } from '@/lib/whatsapp';
import { site } from '@/content/site';
import styles from './ContactComposer.module.css';

const DESTINATIONS = ['Manali', 'Goa', 'Not sure yet'];
const GROUP = ['Just me', '2 people', '3–5 people', '6+ people'];

/**
 * Trip enquiry that composes a WhatsApp message — no backend, nothing stored.
 * Submitting opens WhatsApp (app or web) with the details pre-filled.
 */
export default function ContactComposer() {
  const [form, setForm] = useState({ name: '', destination: 'Manali', group: 'Just me', when: '', note: '' });
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    setError('');
    const lines = [
      `Hi Roam Era! I'm ${form.name.trim()}.`,
      `I'd love to join a group trip — destination: ${form.destination}.`,
      `Travellers: ${form.group}.`,
      form.when.trim() && `Preferred time: ${form.when.trim()}.`,
      form.note.trim() && `${form.note.trim()}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.contact} aria-labelledby="composer-title">
      <Reveal className={styles.aside}>
        <p className="eyebrow" data-reveal="fade">
          Start a conversation
        </p>
        <MaskLines as="h2" id="composer-title" lines={['Tell us', 'where you', 'want to wake up.']} accent={1} className={`display ${styles.title}`} data-reveal="lines" />
        <p className="body-copy" data-reveal="fade">
          Fill in a few details and we will continue the conversation on WhatsApp — dates, stays, plans and every question
          in between. Nothing is stored on this website.
        </p>
        <ul className={styles.channels} data-reveal="fade">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.channel}>
              <WhatsAppIcon size={18} />
              <span>
                <span className="eyebrow">WhatsApp</span>
                <span className={styles.channelText}>Chat with us directly</span>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.25} />
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.channel}>
              <InstagramIcon size={18} />
              <span>
                <span className="eyebrow">{site.instagram.label}</span>
                <span className={styles.channelText}>Moments from the road</span>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.25} />
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal as="form" className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.field} data-reveal="fade">
          <label htmlFor="c-name" className="eyebrow">
            Your name
          </label>
          <input
            id="c-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            placeholder="Who's travelling?"
            aria-invalid={!!error}
            aria-describedby={error ? 'c-error' : undefined}
          />
        </div>

        <fieldset className={styles.field} data-reveal="fade">
          <legend className="eyebrow">Destination</legend>
          <div className={styles.chips}>
            {DESTINATIONS.map((dest) => (
              <label key={dest} className={`${styles.chip} ${form.destination === dest ? styles.chipOn : ''}`}>
                <input type="radio" name="destination" value={dest} checked={form.destination === dest} onChange={update('destination')} />
                {dest}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.field} data-reveal="fade">
          <legend className="eyebrow">Group size</legend>
          <div className={styles.chips}>
            {GROUP.map((g) => (
              <label key={g} className={`${styles.chip} ${form.group === g ? styles.chipOn : ''}`}>
                <input type="radio" name="group" value={g} checked={form.group === g} onChange={update('group')} />
                {g}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.field} data-reveal="fade">
          <label htmlFor="c-when" className="eyebrow">
            When are you thinking?
          </label>
          <input id="c-when" type="text" value={form.when} onChange={update('when')} placeholder="A month, a season, a long weekend…" />
        </div>

        <div className={styles.field} data-reveal="fade">
          <label htmlFor="c-note" className="eyebrow">
            Anything else
          </label>
          <textarea id="c-note" rows={3} value={form.note} onChange={update('note')} placeholder="Questions, ideas, wishes" />
        </div>

        <div className={styles.submitRow} data-reveal="fade">
          {error && (
            <p id="c-error" role="alert" className={styles.error}>
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--solid">
            <WhatsAppIcon size={16} /> Continue on WhatsApp <ArrowUpRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
