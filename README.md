# Roam Era

A cinematic, static-export website for Roam Era, which runs group journeys to Manali and Goa.
It is built with Next.js (App Router, JavaScript), GSAP + ScrollTrigger, Lenis, React Three Fiber/Drei and Framer Motion.

## Commands  

```bash
yarn            # install
yarn dev        # local development → http://localhost:3000
yarn build      # static export → /out
yarn preview    # serve /out locally
```

## Deploying to Hostinger

1. Run `yarn build`.
2. Upload the **contents** of `/out` (not the folder itself) to `public_html`.
   The included `.htaccess` handles trailing slashes, the custom 404 page and caching.`

## Editing content (no code knowledge needed)

| What | Where |
| --- | --- |
| **WhatsApp number** (currently a placeholder), Instagram link, domain, tagline | `src/content/site.js` |
| Story scenes, "Why Roam Era" pillars, home gallery | `src/content/site.js` |
| Manali & Goa copy, highlights, galleries | `src/content/destinations.js` |
| **Trip dates / price / availability** (editable placeholders) | `trip` arrays in `src/content/destinations.js` |
| Photos | `public/images/*.webp` (portrait phone crops in `public/images/m/`) |

Before launch, set `site.url` to your real domain and `whatsapp.number` to your business number
(digits only, with country code, e.g. `91XXXXXXXXXX`).

To replace a photo, save a new file with the same name. Current photos come from Unsplash
(free to use under the Unsplash License); swap in your own trip photos whenever you have them.

## Structure

```
src/app/                 routes: /, /destinations, /destinations/[slug], /our-story, /contact
src/components/layout    header, mobile menu, footer, intro, smooth scroll, cursor, page transition
src/components/sections  hero, story scroll, worlds/globe, Manali & Goa scenes, why, gallery, CTA…
src/components/animations MaskLines, Reveal, Parallax, Magnetic
src/components/three     particle atmosphere (dust/snow/embers), interactive globe, WebGL wrapper
src/content/             all editable copy & settings
src/lib/                 gsap setup, image registry, WhatsApp link builder, device checks
src/styles/globals.css   design tokens & global styles
```

## Motion, performance & accessibility

- 3D is lazy-loaded, pauses when off-screen, uses fewer particles and a capped pixel ratio on phones,
  and falls back gracefully (static SVG globe / no particles) when WebGL is unavailable.
- `prefers-reduced-motion` turns off smooth scroll, the intro, pinning and particles, leaving a calm, static layout.
- Phones get native scrolling, portrait image crops, a swipeable gallery and a vertical "Why" section.
