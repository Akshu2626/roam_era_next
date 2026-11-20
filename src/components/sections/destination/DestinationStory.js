import Picture from '@/components/ui/Picture';
import MaskLines from '@/components/animations/MaskLines';
import Reveal from '@/components/animations/Reveal';
import Parallax from '@/components/animations/Parallax';
import styles from './DestinationStory.module.css';

export default function DestinationStory({ d }) {
  const s = d.story;
  return (
    <section id="story" className={styles.story} aria-labelledby="story-title">
      <Reveal className={styles.top}>
        <p className={`eyebrow ${styles.kicker}`} data-reveal="fade">
          {s.kicker}
        </p>
        <MaskLines as="h2" id="story-title" lines={s.lines} accent={1} className={`display ${styles.title}`} data-reveal="lines" />
      </Reveal>

      <div className={styles.grid}>
        <div className={styles.visual}>
          <Reveal className={styles.main}>
            <div data-reveal="media" className={styles.mainMedia}>
              <Parallax amount={10} className="media-fill" style={{ top: '-8%', height: '116%' }}>
                <Picture name={s.image} alt={s.imageAlt} className="media-fill" />
              </Parallax>
            </div>
          </Reveal>
          <Parallax amount={-30} className={styles.insetWrap}>
            <Reveal>
              <div data-reveal="media" className={styles.inset}>
                <Picture name={s.inset} alt={s.insetAlt} className="media-fill" />
              </div>
            </Reveal>
          </Parallax>
        </div>

        <Reveal className={styles.copy}>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="body-copy" data-reveal="fade" data-delay={i * 0.1}>
              {p}
            </p>
          ))}
          <span className={`rule ${styles.rule}`} data-reveal="rule" />
          <blockquote className={styles.quote} data-reveal="fade">
            “{s.quote}”
          </blockquote>
          <dl className={styles.facts} data-reveal="fade">
            <div>
              <dt className="eyebrow">Region</dt>
              <dd>{d.region}</dd>
            </div>
            <div>
              <dt className="eyebrow">Altitude</dt>
              <dd>{d.elevation}</dd>
            </div>
            <div>
              <dt className="eyebrow">Mood</dt>
              <dd>{d.mood}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
