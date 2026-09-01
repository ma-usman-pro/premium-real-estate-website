import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setDone(true);
  };

  return (
    <section className="py-20 md:py-28 bg-deep-forest text-warm-white">
      <div className="container-vera flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl md:text-4xl mb-3 text-balance">Stay Ahead Of The Market.</h2>
          <p className="text-warm-white/70 leading-relaxed">
            Receive new listings, market insights and selected properties directly in your inbox.
          </p>
        </div>

        {done ? (
          <p className="flex items-center gap-2 text-sage text-sm tracking-[0.04em]">
            <Check className="w-4 h-4" /> You're subscribed — welcome to VERA ESTATES.
          </p>
        ) : (
          <form onSubmit={submit} className="flex w-full max-w-md">
            <label className="sr-only" htmlFor="newsletter-email">Email Address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border-b border-warm-white/30 focus:border-terracotta outline-none py-3 text-warm-white placeholder:text-warm-white/45 transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="shrink-0 flex items-center gap-2 px-6 border-b border-warm-white/30 text-sm tracking-[0.06em] uppercase text-terracotta hover:text-warm-white transition-colors"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
