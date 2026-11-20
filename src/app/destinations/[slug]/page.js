import { notFound } from 'next/navigation';
import DestinationHero from '@/components/sections/destination/DestinationHero';
import DestinationStory from '@/components/sections/destination/DestinationStory';
import TripHighlights from '@/components/sections/destination/TripHighlights';
import TripDetails from '@/components/sections/destination/TripDetails';
import NextDestination from '@/components/sections/destination/NextDestination';
import Gallery from '@/components/sections/Gallery';
import FinalCTA from '@/components/sections/FinalCTA';
import { destinations } from '@/content/destinations';
import { site } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = destinations[slug];
  if (!d) return {};
  const url = `/destinations/${slug}/`;
  const image = `/images/${d.hero.image}.webp`;
  return {
    title: d.seo.title,
    description: d.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${d.seo.title} · Roam Era`,
      description: d.seo.description,
      url,
      images: [{ url: image, alt: d.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: d.seo.title, description: d.seo.description, images: [image] },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const d = destinations[slug];
  if (!d) notFound();
  const next = destinations[d.next];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${d.name} group trip by ${site.name}`,
    description: d.seo.description,
    touristType: 'Group travellers',
    provider: { '@type': 'TravelAgency', name: site.name, url: site.url },
    itinerary: { '@type': 'ItemList', itemListElement: d.highlights.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h.title })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DestinationHero d={d} />
      <DestinationStory d={d} />
      <TripHighlights d={d} />
      <Gallery items={d.gallery} eyebrow={`${d.name} — In frames`} title={d.theme === 'cold' ? ['Notes', 'from the', 'north.'] : ['Postcards', 'from the', 'coast.']} />
      <TripDetails d={d} />
      <FinalCTA image={d.feature.image} message={d.whatsappMessage} secondary={{ href: `/destinations/${next.slug}`, label: `Or discover ${next.name}` }} />
      <NextDestination d={next} />
    </>
  );
}
