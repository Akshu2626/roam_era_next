/**
 * ─────────────────────────────────────────────────────────────
 *  ROAM ERA — GLOBAL SITE SETTINGS
 *  Edit this file to change brand copy, contact details & links.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Roam Era',
  tagline: 'Leave the ordinary. Find your era.',
  description:
    'Roam Era curates cinematic group journeys to Manali and Goa — like-minded companions, carefully planned experiences and stories that go far beyond the tourist checklist.',

  // Your live domain (used for canonical URLs, sitemap & social previews).
  // Replace before deploying.
  url: 'https://www.example.com',

  // WhatsApp — PLACEHOLDER NUMBER. Replace with your real business number.
  // Format: country code + number, digits only (e.g. 91 + 10-digit mobile).
  whatsapp: {
    number: '910000000000',
    defaultMessage: "Hi Roam Era! I'd love to plan my next escape. Can you share upcoming group trips?",
  },

  // Instagram — PLACEHOLDER. Replace with your profile URL.
  instagram: {
    label: 'Instagram',
    url: 'https://www.instagram.com/',
  },

  // The year the copyright line starts from.
  foundedYear: 2026,
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

/** Opening storytelling scroll (home page). */
export const storyScenes = [
  {
    id: 'location',
    index: '01',
    label: 'Location',
    lines: ['Some journeys', 'change your', 'location.'],
    accent: 2,
    image: 'story-lake-boat',
    inset: 'manali-mist-layers',
    alt: 'A wooden boat gliding across a still alpine lake framed by mountains',
  },
  {
    id: 'perspective',
    index: '02',
    label: 'Perspective',
    lines: ['Some change', 'your', 'perspective.'],
    accent: 2,
    image: 'story-summit-gaze',
    inset: 'manali-winding-hills',
    alt: 'A traveller in a red jacket standing before a snow-covered summit',
  },
  {
    id: 'alive',
    index: '03',
    label: 'Alive',
    lines: ['And some remind you', 'what it feels like', 'to be alive.'],
    accent: 2,
    image: 'story-friends-alive',
    inset: 'camp-fire-night',
    alt: 'A group of friends laughing together on a mountain trail',
  },
];

/** "Why Roam Era" pillars. */
export const pillars = [
  {
    index: '01',
    title: ['Like-minded', 'companions'],
    text: 'Arrive as strangers, leave as a crew. We bring together curious, easy-going travellers who came for the same thing you did — the story.',
    image: 'group-friends-shoulders',
    alt: 'Friends sitting arm in arm looking out at the horizon',
  },
  {
    index: '02',
    title: ['Carefully', 'planned'],
    text: 'Stays, routes, transfers and timings are worked out long before you pack. You get the freedom of the road without the friction of planning it.',
    image: 'manali-winding-hills',
    alt: 'A road winding through rolling green Himalayan hills',
  },
  {
    index: '03',
    title: ['Memorable', 'places'],
    text: 'Snowlines and cedar forests in the north. Palm-lined coves and golden water in the west. Two worlds, chosen for how they make you feel.',
    image: 'goa-golden-hour',
    alt: 'Sunlight spilling across a quiet beach with birds overhead',
  },
  {
    index: '04',
    title: ['Beyond the', 'checklist'],
    text: 'Bonfires that run late, detours worth taking, cafés no list mentions. We plan for the moments you will still talk about years later.',
    image: 'camp-fire-night',
    alt: 'Travellers gathered around a campfire under a night sky',
  },
];

/** Home page "Travel moments" gallery. Layout slots are art-directed in Gallery.module.css. */
export const homeGallery = [
  { image: 'mountain-peak-ice', caption: 'The high country', place: 'Himalaya', alt: 'Ice-covered Himalayan peak under soft clouds' },
  { image: 'goa-beach-huts', caption: 'Huts on the sand', place: 'Goa', alt: 'Colourful wooden beach huts beneath tall palm trees' },
  { image: 'manali-snow-trail', caption: 'Footsteps in fresh snow', place: 'Manali', alt: 'A lone hiker on a snowy mountain trail' },
  { image: 'camp-milky-way', caption: 'Nights under the galaxy', place: 'Mountains', alt: 'A glowing tent beneath the Milky Way' },
  { image: 'goa-surf', caption: 'Chasing the swell', place: 'Coastline', alt: 'A surfer riding inside a turquoise wave' },
  { image: 'road-canyon', caption: 'The road is the plan', place: 'On the way', alt: 'An empty road cutting through rugged red hills' },
  { image: 'goa-sun-on-water', caption: 'Last light', place: 'Goa', alt: 'The sun setting over glittering sea water' },
  { image: 'traveler-backpack', caption: 'Wherever it leads', place: 'Lakeside', alt: 'A backpacker looking out over a misty mountain lake' },
];
