/**
 * Image registry. Every photo lives in /public/images as WebP.
 * Full-screen scenes also have a portrait crop in /public/images/m
 * which is served to phones automatically through <Picture />.
 *
 * To replace a photo: drop a new file with the same name into
 * /public/images (and /public/images/m for portrait crops).
 */
const MOBILE_CROPS = new Set([
  'hero-peaks-above-clouds',
  'story-lake-boat',
  'story-summit-gaze',
  'story-friends-alive',
  'manali-pine-ridge',
  'manali-starry-peaks',
  'mountain-dusk',
  'goa-beach-palms',
  'goa-sunset-shore',
]);

export function img(name) {
  return {
    src: `/images/${name}.webp`,
    mobile: MOBILE_CROPS.has(name) ? `/images/m/${name}.webp` : null,
  };
}
