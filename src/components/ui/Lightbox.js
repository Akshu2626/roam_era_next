'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Picture from './Picture';
import { useLenis } from '@/components/layout/SmoothScroll';
import styles from './Lightbox.module.css';

const ease = [0.76, 0, 0.24, 1];

export default function Lightbox({ items, index, onClose, onChange }) {
  const lenis = useLenis();
  const closeBtn = useRef(null);
  const opener = useRef(null);
  const isOpen = index >= 0;
  const item = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.documentElement.style.overflow = '';
      lenis?.start();
      opener.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, index, items.length, onClose, onChange]);

  // Basic swipe for touch.
  const touch = useRef(null);
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) onChange(dx < 0 ? (index + 1) % items.length : (index - 1 + items.length) % items.length);
    touch.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease }}
          data-lenis-prevent
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.bar}>
            <span className="eyebrow">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button ref={closeBtn} type="button" onClick={onClose} className={styles.close} aria-label="Close gallery">
              Close <X size={20} strokeWidth={1.25} />
            </button>
          </div>

          <div className={styles.stage}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className={styles.imageWrap}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Picture name={item.image} alt={item.alt} className={styles.picture} imgClassName={styles.img} priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.bottom}>
            <button type="button" className={styles.nav} onClick={() => onChange((index - 1 + items.length) % items.length)} aria-label="Previous photo">
              <ChevronLeft size={22} strokeWidth={1.25} />
            </button>
            <p className={styles.caption}>
              <span className="serif">{item.caption}</span>
              <span className="eyebrow">{item.place}</span>
            </p>
            <button type="button" className={styles.nav} onClick={() => onChange((index + 1) % items.length)} aria-label="Next photo">
              <ChevronRight size={22} strokeWidth={1.25} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
