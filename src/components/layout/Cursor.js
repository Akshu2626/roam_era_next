'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Cursor.module.css';

/**
 * A quiet trailing cursor ring for fine pointers. Elements with
 * `data-cursor="Label"` expand it and show the label.
 */
export default function Cursor() {
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const onChange = (e) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled || !ring.current) return;
    const el = ring.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let visible = false;

    const move = (e) => {
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add(styles.visible);
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button');
      if (!target) {
        el.classList.remove(styles.hover, styles.labelled);
        setLabel('');
        return;
      }
      const text = target.getAttribute('data-cursor');
      if (text) {
        setLabel(text);
        el.classList.add(styles.labelled);
        el.classList.remove(styles.hover);
      } else {
        setLabel('');
        el.classList.add(styles.hover);
        el.classList.remove(styles.labelled);
      }
    };
    const leave = () => {
      visible = false;
      el.classList.remove(styles.visible);
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ring} className={styles.ring} aria-hidden="true">
      <span className={styles.label}>{label}</span>
    </div>
  );
}
