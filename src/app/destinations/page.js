import DestinationsSplit from '@/components/sections/DestinationsSplit';
import Worlds from '@/components/sections/Worlds';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Destinations — Manali & Goa',
  description:
    'Two different worlds, one travel crew. Explore Roam Era group journeys to the snow-covered Himalaya of Manali and the golden beaches of Goa.',
  alternates: { canonical: '/destinations/' },
  openGraph: { title: 'Destinations — Manali & Goa · Roam Era', url: '/destinations/' },
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationsSplit />
      <Worlds eyebrow="Choose your world" title={['Mountains', 'or the', 'sea?']} />
      <FinalCTA image="goa-sunset-shore" />
    </>
  );
}
