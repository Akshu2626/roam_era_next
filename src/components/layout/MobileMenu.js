'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { navigation, site } from '@/content/site';
import { whatsappLink } from '@/lib/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { useLenis } from './SmoothScroll';
import styles from './MobileMenu.module.css';

const ease = [0.76, 0, 0.24, 1];

export default function MobileMenu({ open, onClose, pathname, isActive }) {
  const lenis = useLenis();
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const focusables = panel.current.querySelectorAll('a, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panel.current?.querySelector('a')?.focus(), 400);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className={styles.top}>
            <span className={styles.brand}>
              Roam <em>Era</em>
            </span>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
              <span>Close</span>
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul className={styles.list}>
              {navigation.map((item, i) => (
                <li key={item.href} className={styles.item}>
                  <motion.span
                    className={styles.mask}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`${styles.link} ${isActive(pathname, item.href) ? styles.active : ''}`}
                    >
                      <span className={styles.num}>0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className={styles.bottom}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.social}>
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.social}>
              <InstagramIcon size={16} /> {site.instagram.label}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
