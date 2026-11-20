'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { navigation } from '@/content/site';
import { whatsappLink } from '@/lib/whatsapp';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

function isActive(pathname, href) {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (href === '/') return clean === '/';
  return clean === href || clean.startsWith(href + '/');
}

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 160);
          last = y;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <header className={`${styles.header} ${hidden && !open ? styles.hidden : ''}`}>
        <Link href="/" className={styles.brand} aria-label="Roam Era — home">
          <span>Roam</span>
          <em>Era</em>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`${styles.link} ${active ? styles.active : ''}`} aria-current={active ? 'page' : undefined}>
                    <span className={styles.roll} data-text={item.label}>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          Plan a trip <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <span className={styles.burger} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <MobileMenu open={open} onClose={closeMenu} pathname={pathname} isActive={isActive} />
    </>
  );
}
