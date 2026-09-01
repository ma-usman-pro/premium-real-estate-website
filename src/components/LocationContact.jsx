import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'By appointment' },
];

export default function LocationContact() {
  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="container-vera grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
        <div>
          <span className="eyebrow mb-5">Visit Us</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest mb-8 text-balance">
            24 Berkeley Square
          </h2>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
              <p className="text-dark-brown">VERA ESTATES<br />24 Berkeley Square, London, UK</p>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
              <a href="tel:+442079460958" className="text-dark-brown hover:text-terracotta transition-colors">+44 20 7946 0958</a>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
              <a href="mailto:hello@veraestates.com" className="text-dark-brown hover:text-terracotta transition-colors">hello@veraestates.com</a>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
              <div className="space-y-1">
                {hours.map((h) => (
                  <p key={h.day} className="text-dark-brown text-sm">
                    <span className="text-muted-brown">{h.day}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=24+Berkeley+Square+London"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-deep-forest text-deep-forest text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest hover:text-warm-white transition-colors duration-300"
          >
            Get Directions <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="relative min-h-[320px] bg-forest overflow-hidden">
          <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none">
            <path d="M0 40 Q 25 30 50 42 T 100 38" stroke="#8FA89A" strokeWidth="0.6" fill="none" />
            <path d="M10 0 L 8 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
            <path d="M45 0 L 48 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
            <path d="M75 0 L 72 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <span className="w-14 h-14 rounded-full bg-terracotta flex items-center justify-center">
              <MapPin className="w-6 h-6 text-warm-white" />
            </span>
            <p className="text-warm-white font-display text-xl">Mayfair, London</p>
            <p className="text-warm-white/60 text-sm">W1J &middot; United Kingdom</p>
          </div>
        </div>
      </div>
    </section>
  );
}
