'use client';

/**
 * Tiny pub/sub so page sections know when the opening intro
 * has lifted (or was skipped) and can begin their entrance.
 */
let done = false;
const listeners = new Set();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onIntroDone(cb) {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
