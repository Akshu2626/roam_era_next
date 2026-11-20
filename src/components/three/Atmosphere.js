'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { hasWebGL, isLowPower, isSmallScreen, prefersReducedMotion } from '@/lib/device';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false, loading: () => null });

/**
 * Lazily mounts a WebGL particle layer (dust / snow / embers).
 * Renders nothing when WebGL is unavailable or motion is reduced —
 * the photographic layers underneath carry the scene on their own.
 */
export default function Atmosphere({ preset = 'dust', className }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!hasWebGL() || prefersReducedMotion()) return;
    setState({ small: isSmallScreen() || isLowPower() });
  }, []);

  if (!state) return null;
  return <ParticleField preset={preset} small={state.small} className={className} />;
}
