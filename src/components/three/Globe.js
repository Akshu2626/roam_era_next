'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { hasWebGL, isSmallScreen } from '@/lib/device';
import styles from './Globe.module.css';

const GlobeScene = dynamic(() => import('./GlobeScene'), { ssr: false, loading: () => null });

/** Static editorial fallback when WebGL is unavailable. */
function GlobeFallback({ destinations, active }) {
  return (
    <svg viewBox="0 0 400 400" className={styles.fallback} aria-hidden="true">
      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(241,240,236,.25)" />
      {[40, 80, 120].map((rx) => (
        <ellipse key={rx} cx="200" cy="200" rx={rx} ry="160" fill="none" stroke="rgba(241,240,236,.1)" />
      ))}
      {[60, 110].map((ry) => (
        <ellipse key={ry} cx="200" cy="200" rx="160" ry={ry} fill="none" stroke="rgba(241,240,236,.1)" />
      ))}
      <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(241,240,236,.18)" />
      {destinations.map((d, i) => {
        const x = 190 + i * 10;
        const y = 200 - d.lat * 3.2;
        const on = active === d.slug;
        return (
          <g key={d.slug}>
            <circle cx={x} cy={y} r={on ? 5 : 3.5} fill="#f1f0ec" />
            <circle cx={x} cy={y} r={on ? 14 : 9} fill="none" stroke="rgba(241,240,236,.5)" />
            <text x={x + 18} y={y + 4} fill="#f1f0ec" fontSize="11" letterSpacing="2.2" opacity={on ? 1 : 0.55}>
              {d.name.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Globe({ destinations, active, onSelect }) {
  const [mode, setMode] = useState('pending');

  useEffect(() => {
    if (!hasWebGL()) setMode('fallback');
    else setMode(isSmallScreen() ? 'small' : 'full');
  }, []);

  const fallback = <GlobeFallback destinations={destinations} active={active} />;

  return (
    <div className={styles.wrap}>
      {mode === 'fallback' && fallback}
      {(mode === 'small' || mode === 'full') && (
        <GlobeScene
          className={styles.canvas}
          destinations={destinations}
          active={active}
          onSelect={onSelect}
          small={mode === 'small'}
          fallback={fallback}
        />
      )}
    </div>
  );
}
