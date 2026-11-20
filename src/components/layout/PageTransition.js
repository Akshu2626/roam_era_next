'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

let hasMounted = false;

/**
 * Route-change curtain (skipped on the very first load, where the intro plays).
 * Only opacity is animated on the page wrapper so ScrollTrigger pins
 * (position: fixed) are never trapped inside a transformed parent.
 */
export default function PageTransition({ children }) {
  const [isFirst] = useState(() => !hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  if (isFirst) return children;

  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          background: '#080808',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
