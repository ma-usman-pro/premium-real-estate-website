// lucide-react removed brand/logo icons; these are small hand-rolled
// outline glyphs kept visually consistent with the Lucide icon set
// (1.5px stroke, 24x24 viewbox) so they sit naturally alongside them.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M14 21v-8h2.7l.4-3.2H14V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C17 3.1 15.9 3 14.6 3 12 3 10.2 4.6 10.2 7.4v2.4H7.5V13h2.7v8" />
    </svg>
  );
}

export function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5V13c0-1.4.9-2.5 2.3-2.5s2.2 1.1 2.2 2.5v3.5M12 10v6.5" />
    </svg>
  );
}

export function YoutubeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M11 10.2v3.6l3.2-1.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
