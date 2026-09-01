import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { img, exteriors } from '../data/images';

const steps = [
  { n: '01', title: 'Property Valuation', text: 'An honest, evidence-based valuation grounded in current local market activity.' },
  { n: '02', title: 'Strategic Marketing', text: 'Professional photography, floor plans and copy that present your home at its best.' },
  { n: '03', title: 'Private & Public Viewings', text: 'Qualified, accompanied viewings that respect your time and your privacy.' },
  { n: '04', title: 'Offer Management', text: 'Every offer verified and negotiated on your behalf, with regular updates throughout.' },
  { n: '05', title: 'Completion', text: 'Coordinated legal and financial steps through to keys changing hands.' },
];

export default function SellProperty({ onValuation }) {
  return (
    <section id="sell" className="py-24 md:py-32 bg-warm-white scroll-mt-24">
      <div className="container-vera grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="eyebrow mb-5">For Sellers</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest mb-6 text-balance">
            Thinking Of Selling?
          </h2>
          <p className="text-muted-brown leading-relaxed mb-10 max-w-md">
            Present your property to the right audience with a strategy built around
            photography, positioning, marketing and local expertise.
          </p>

          <ol className="space-y-7">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-5"
              >
                <span className="font-display text-2xl text-terracotta w-9 shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-medium text-dark-brown mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-brown leading-relaxed">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <button
            onClick={onValuation}
            className="mt-11 px-8 py-4 bg-deep-forest text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-terracotta transition-colors duration-300"
          >
            Request A Valuation
          </button>
        </div>

        <div className="relative aspect-[4/5] corner-frame overflow-hidden">
          <SmartImage
            src={img(exteriors[5], 1400)}
            alt="A Notting Hill townhouse recently brought to market by VERA ESTATES"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
