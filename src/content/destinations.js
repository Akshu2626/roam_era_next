/**
 * ─────────────────────────────────────────────────────────────
 *  ROAM ERA — DESTINATIONS
 *  All destination copy lives here. Trip dates, pricing and
 *  availability are intentionally kept as editable placeholders
 *  in `trip` — update them when a departure is confirmed.
 * ─────────────────────────────────────────────────────────────
 */

export const destinations = {
  manali: {
    slug: 'manali',
    index: '01',
    name: 'Manali',
    region: 'Himachal Pradesh',
    coordinates: '32.24° N — 77.19° E',
    lat: 32.24,
    lon: 77.19,
    elevation: '2,050 m above sea level',
    mood: 'Cold air · Endless roads · Cedar forests',
    theme: 'cold',
    headline: ['Lost in', 'the', 'mountains.'],
    description: 'Cold air. Endless roads. Stories written in the mountains.',
    seo: {
      title: 'Manali Group Trips — Lost in the Mountains',
      description:
        'Join a Roam Era group journey to Manali: snow-covered peaks, winding Himalayan roads, cedar forests, riverside bonfires and like-minded travel companions.',
    },
    hero: { image: 'manali-starry-peaks', alt: 'Snow-covered Himalayan peaks beneath a sky full of stars' },
    feature: { image: 'manali-pine-ridge', alt: 'Pine trees silhouetted against towering snow-capped Himalayan ridges' },
    story: {
      kicker: 'The northern world',
      lines: ['Where the road', 'climbs, and the', 'noise falls away.'],
      paragraphs: [
        'Manali sits high in the Kullu valley, wrapped in deodar forest and watched over by the snowline. Mornings arrive slowly here — mist lifting off the Beas, woodsmoke curling from old stone houses, chai served before the sun clears the ridge.',
        'We travel it the way it deserves: unhurried drives with long stops, lanes in Old Manali you would never find alone, snowfields that make grown adults laugh like children, and evenings that end around a fire with people who were strangers a few days ago.',
      ],
      quote: 'Up here, the cold makes every cup of chai taste like a celebration.',
      image: 'manali-pine-valley',
      imageAlt: 'A valley of pine trees opening onto distant snowy mountains',
      inset: 'manali-snow-trail',
      insetAlt: 'A hiker climbing a snowy trail',
    },
    highlights: [
      { title: 'Old Manali lanes', text: 'Stone-and-timber houses, riverside cafés and slow mornings in the old village.', image: 'manali-winding-hills' },
      { title: 'Solang snowfields', text: 'Wide open snow slopes for play, adventure sports and that first-snow feeling.', image: 'manali-snow-trail' },
      { title: 'Cedar forest walks', text: 'Quiet trails under towering deodars around the Hadimba temple grounds.', image: 'manali-pine-valley' },
      { title: 'Mountain passes', text: 'High-altitude drives where the road turns to switchbacks and the views never stop.', image: 'manali-snow-pass' },
      { title: 'Bonfire nights', text: 'Music, stories and starry skies — the evenings everyone remembers most.', image: 'camp-fire-night' },
    ],
    gallery: [
      { image: 'manali-snow-pass', caption: 'Above the snowline', place: 'Manali', alt: 'Travellers on a sunlit snowy mountain pass' },
      { image: 'manali-mist-layers', caption: 'Ridges in the mist', place: 'Kullu valley', alt: 'Layered misty mountain ridges at dawn' },
      { image: 'manali-tent-forest', caption: 'Waking up in the woods', place: 'Forest camp', alt: 'View from inside a tent opening onto a pine forest' },
      { image: 'manali-himalaya-stupa', caption: 'Prayer flags & peaks', place: 'Himalaya', alt: 'A stupa on a hillside before towering snowy peaks' },
      { image: 'manali-snow-trail', caption: 'First tracks', place: 'Solang', alt: 'A hiker on a fresh snow trail' },
      { image: 'manali-winding-hills', caption: 'The long way round', place: 'Mountain roads', alt: 'A road winding over green hills' },
      { image: 'camp-milky-way', caption: 'Starlight', place: 'High camp', alt: 'A tent glowing under the Milky Way' },
      { image: 'mountain-peak-ice', caption: 'Silent giants', place: 'Himalaya', alt: 'An icy Himalayan peak' },
    ],
    // ── Editable trip placeholders. Never publish unconfirmed dates or prices. ──
    trip: [
      { label: 'Next departures', value: 'Announcing soon' },
      { label: 'Duration', value: 'Shared on enquiry' },
      { label: 'Price per person', value: 'On request' },
      { label: 'Availability', value: 'Ask us for open seats' },
    ],
    whatsappMessage: "Hi Roam Era! I'm interested in the Manali group trip. Could you share the upcoming dates and details?",
    next: 'goa',
  },

  goa: {
    slug: 'goa',
    index: '02',
    name: 'Goa',
    region: 'Konkan Coast',
    coordinates: '15.30° N — 74.12° E',
    lat: 15.3,
    lon: 74.12,
    elevation: 'Sea level, Arabian Sea',
    mood: 'Golden skies · Salty air · Long nights',
    theme: 'warm',
    headline: ['Find', 'your own', 'sunset.'],
    description: 'Golden skies. Salty air. Nights that become memories.',
    seo: {
      title: 'Goa Group Trips — Find Your Own Sunset',
      description:
        'Join a Roam Era group journey to Goa: golden beaches, palm-lined coves, sunset cliffs, Latin-quarter lanes and warm nights with like-minded travel companions.',
    },
    hero: { image: 'goa-beach-palms', alt: 'Turquoise water and a palm-fringed Goan beach' },
    feature: { image: 'goa-sunset-shore', alt: 'Waves rolling onto a beach under a soft golden sunset' },
    story: {
      kicker: 'The western world',
      lines: ['Where the days', 'are golden and', 'the nights stay young.'],
      paragraphs: [
        'Goa runs on a different clock. Mornings are for the sea, afternoons for long lunches in the shade of a beach shack, and the hour before sunset belongs to whoever finds the best cliff to watch it from.',
        'We move between both sides of it — the music and colour of the north, the calm curved bays of the south, and the pastel Portuguese lanes of Panjim in between. You will come home salt-haired, sun-warmed and with a camera roll full of gold.',
      ],
      quote: 'Every evening the sky puts on a show, and nobody is in a hurry to leave.',
      image: 'goa-palm-cottages',
      imageAlt: 'Palm-shaded beach cottages on golden sand',
      inset: 'goa-sun-on-water',
      insetAlt: 'Sunset light on the water',
    },
    highlights: [
      { title: 'Sunset from the cliffs', text: 'Fort walls and headlands made for golden hour — the whole crew, one horizon.', image: 'goa-sun-on-water' },
      { title: 'South Goa coves', text: 'Palm-fringed crescents of sand and calm, clear water for slow beach days.', image: 'goa-beach-huts' },
      { title: 'Fontainhas lanes', text: 'Pastel Portuguese houses, tiled facades and cafés in the old Latin quarter.', image: 'goa-palm-cottages' },
      { title: 'Ocean adventures', text: 'Waves, boats and water sports for anyone who would rather be in the sea.', image: 'goa-surf' },
      { title: 'Nights by the shore', text: 'Shack dinners, music on the sand and conversations that run until sunrise.', image: 'goa-umbrellas' },
    ],
    gallery: [
      { image: 'goa-aerial-waves', caption: 'Where the sea meets the palms', place: 'Coastline', alt: 'Aerial view of surf meeting a palm-lined shore' },
      { image: 'goa-sun-on-water', caption: 'Golden hour', place: 'Arabian Sea', alt: 'Sun setting over the sea' },
      { image: 'goa-beach-huts', caption: 'Huts on the sand', place: 'South Goa', alt: 'Wooden beach huts under palms' },
      { image: 'goa-palm-sail', caption: 'Lazy afternoons', place: 'The beach', alt: 'A palm tree and sailboat on a white-sand beach' },
      { image: 'goa-surf', caption: 'Into the blue', place: 'The swell', alt: 'A surfer inside a wave' },
      { image: 'goa-umbrellas', caption: 'Shade & sea breeze', place: 'Beach days', alt: 'Yellow umbrellas and loungers on the sand' },
      { image: 'goa-golden-hour', caption: 'Birds at dusk', place: 'Shoreline', alt: 'Birds over a beach at golden hour' },
      { image: 'goa-palm-cottages', caption: 'Home for a while', place: 'Palm grove', alt: 'Beach cottages beneath palms' },
    ],
    // ── Editable trip placeholders. Never publish unconfirmed dates or prices. ──
    trip: [
      { label: 'Next departures', value: 'Announcing soon' },
      { label: 'Duration', value: 'Shared on enquiry' },
      { label: 'Price per person', value: 'On request' },
      { label: 'Availability', value: 'Ask us for open seats' },
    ],
    whatsappMessage: "Hi Roam Era! I'm interested in the Goa group trip. Could you share the upcoming dates and details?",
    next: 'manali',
  },
};

export const destinationList = [destinations.manali, destinations.goa];
