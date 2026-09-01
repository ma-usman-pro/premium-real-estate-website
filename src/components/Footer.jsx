import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';

const nav = [
  { label: 'Properties', view: 'properties' },
  { label: 'Buy', view: 'properties', status: 'Buy' },
  { label: 'Rent', view: 'properties', status: 'Rent' },
  { label: 'Sell', view: 'home', anchor: 'sell' },
  { label: 'Developments', view: 'home', anchor: 'developments' },
  { label: 'About', view: 'home', anchor: 'about' },
  { label: 'Contact', view: 'home', anchor: 'contact' },
];

const legal = ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'];

const socials = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: LinkedinIcon, label: 'LinkedIn' },
  { icon: YoutubeIcon, label: 'YouTube' },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-deep-forest text-warm-white pt-20 pb-8">
      <div className="container-vera">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-12 pb-16 border-b border-warm-white/10">
          <div>
            <p className="font-display text-3xl tracking-[0.06em] mb-3">
              VERA <span className="text-terracotta">ESTATES</span>
            </p>
            <p className="text-warm-white/60 italic font-display text-lg mb-6">
              &ldquo;Spaces worth coming home to.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-warm-white/20 flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-sage mb-5">Navigation</p>
            <ul className="space-y-3">
              {nav.map((link) => (
                <li key={link.label}>
                  <button onClick={() => onNavigate(link)} className="text-warm-white/75 hover:text-warm-white transition-colors text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-sage mb-5">Legal</p>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l}>
                  <a href="#" className="text-warm-white/75 hover:text-warm-white transition-colors text-sm">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-warm-white/50 text-xs">
          <p>&copy; 2026 VERA ESTATES. All rights reserved.</p>
          <p>24 Berkeley Square, London, UK</p>
        </div>
      </div>
    </footer>
  );
}
