import PageHero from '@/components/sections/PageHero';
import ContactComposer from '@/components/sections/ContactComposer';

export const metadata = {
  title: 'Contact — Plan Your Escape',
  description: 'Plan your next group trip to Manali or Goa with Roam Era. Message us on WhatsApp for dates, itineraries and availability.',
  alternates: { canonical: '/contact/' },
  openGraph: { title: 'Contact · Roam Era', url: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let's plan", 'your', 'escape.']}
        accent={1}
        intro="Every great trip starts with a message. Tell us a little about yourself and where your head is at — we will take it from there."
      />
      <ContactComposer />
    </>
  );
}
