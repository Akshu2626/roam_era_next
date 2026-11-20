'use client';

import { Component, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

class GLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

/**
 * Shared R3F canvas:
 *  - renders only while on screen (frameloop pauses off-screen)
 *  - capped pixel ratio for mobile GPUs
 *  - falls back gracefully if the WebGL context cannot be created
 */
export default function WebGLCanvas({ children, className, camera, dpr = [1, 1.5], fallback = null, interactive = false, style }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className} style={{ pointerEvents: interactive ? 'auto' : 'none', ...style }} aria-hidden={interactive ? undefined : 'true'}>
      <GLErrorBoundary fallback={fallback}>
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          dpr={dpr}
          camera={camera}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {children}
        </Canvas>
      </GLErrorBoundary>
    </div>
  );
}
