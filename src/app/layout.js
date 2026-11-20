import { Instrument_Serif, Inter_Tight } from 'next/font/google';
import AppShell from '@/components/layout/AppShell';
import { site } from '@/content/site';
import '@/styles/globals.css';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Roam Era — Group Journeys to Manali & Goa',
    template: '%s · Roam Era',
  },
  description: site.description,
  applicationName: site.name,
  keywords: ['Manali group trip', 'Goa group trip', 'group travel India', 'Himachal trips', 'Goa beach trip', 'Roam Era', 'travel community'],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Roam Era — The world is waiting.',
    description: site.description,
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Himalayan peaks above the clouds — Roam Era' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roam Era — The world is waiting.',
    description: site.description,
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Runs before paint: enables JS-gated styles and skips the intro on repeat visits.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('roam-intro'))d.classList.add('intro-seen')}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
