import PageHero from '@/components/sections/PageHero';
import Manifesto from '@/components/sections/Manifesto';
import WhyRoamEra from '@/components/sections/WhyRoamEra';
import Gallery from '@/components/sections/Gallery';
import FinalCTA from '@/components/sections/FinalCTA';
import { homeGallery } from '@/content/site';

export const metadata = {
  title: 'Our Story — We Create Stories',
  description:
    'Roam Era is a travel community that plans group journeys to Manali and Goa for people who want more than a tourist checklist — companions, care and stories worth keeping.',
  alternates: { canonical: '/our-story/' },
  openGraph: { title: 'Our Story · Roam Era', url: '/our-story/' },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        lines={['Born from', 'the itch', 'to leave.']}
        accent={1}
        intro="Roam Era began with a simple feeling: that the best parts of life rarely happen at home, on schedule, or alone."
        image="traveler-backpack"
        imageAlt="A traveller with a backpack looking over a misty mountain lake"
      />
      <Manifesto
        eyebrow="What we believe"
        text="We believe a trip is only as good as the *people* you share it with. That planning should be invisible, so *wonder* can be loud. That the right destination can reset a whole year. And that the stories you bring home matter far more than the photos — though we will make sure you have *plenty* of those too."
      />
      <WhyRoamEra showStoryLink={false} />
      <Gallery items={homeGallery.slice(0, 6)} eyebrow="Along the way" title={['Where', 'we', 'roam.']} />
      <FinalCTA image="camp-milky-way" />
    </>
  );
}
