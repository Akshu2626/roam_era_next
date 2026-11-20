'use client';

import SmoothScroll from './SmoothScroll';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import Cursor from './Cursor';

export default function AppShell({ children }) {
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Intro />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </SmoothScroll>
  );
}
