import Hero from '@/components/sections/Hero';
import StoryScroll from '@/components/sections/StoryScroll';
import Worlds from '@/components/sections/Worlds';
import ManaliScene from '@/components/sections/ManaliScene';
import GoaScene from '@/components/sections/GoaScene';
import WhyRoamEra from '@/components/sections/WhyRoamEra';
import Gallery from '@/components/sections/Gallery';
import FinalCTA from '@/components/sections/FinalCTA';
import { homeGallery, site } from '@/content/site';
import { destinationList } from '@/content/destinations';

export const metadata = {
  title: { absolute: 'Roam Era — Group Journeys to Manali & Goa' },
  description: site.description,
  alternates: { canonical: '/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  slogan: site.tagline,
  areaServed: 'IN',
  makesOffer: destinationList.map((d) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'TouristTrip', name: `${d.name} group trip`, description: d.description, touristType: 'Group travellers' },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <StoryScroll />
      <Worlds />
      <ManaliScene />
      <GoaScene />
      <WhyRoamEra />
      <Gallery
        items={homeGallery}
        intro="Snowlines, coastlines and everything in between — a few frames from the kind of days we plan for."
      />
      <FinalCTA />
    </>
  );
}
