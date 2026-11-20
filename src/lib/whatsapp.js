import { site } from '@/content/site';

/** Builds a wa.me deep link using the configurable number in content/site.js */
export function whatsappLink(message = site.whatsapp.defaultMessage) {
  const number = String(site.whatsapp.number).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
