'use client';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isSmallScreen() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 899px)').matches;
}

export function isLowPower() {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  return cores <= 4 || memory <= 2;
}

let webglCache = null;
export function hasWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement('canvas');
    webglCache = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    webglCache = false;
  }
  return webglCache;
}
