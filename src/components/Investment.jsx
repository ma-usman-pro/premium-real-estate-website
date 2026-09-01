import { motion } from 'framer-motion';
import { Building2, Home, KeyRound, ArrowRight } from 'lucide-react';

const tracks = [
  {
    icon: Home,
    title: 'Residential',
    text: 'Established homes in resilient, high-demand postcodes — selected for long-term capital stability.',
  },
  {
    icon: Building2,
    title: 'Development',
    text: 'Off-plan and early-stage opportunities within vetted new developments across London.',
  },
  {
    icon: KeyRound,
    title: 'Buy to Let',
    text: 'Rental-ready properties in areas with strong tenant demand, managed with full transparency.',
  },
];

export default function Investment() {
  return (
    <section className="py-24 md:py-32 bg-forest text-warm-white">
      <div className="container-vera">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-end mb-16">
          <div>
            <span className="eyebrow eyebrow-light mb-5">For Investors</span>
            <h2 className="font-display text-4xl md:text-5xl text-balance">Invest With Confidence</h2>
          </div>
          <p className="text-warm-white/75 leading-relaxed max-w-md">
            From emerging neighbourhoods to established prime locations, discover opportunities
            selected with long term value in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-warm-white/15 mb-14">
          {tracks.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-forest p-9"
            >
              <t.icon className="w-8 h-8 text-terracotta mb-6" strokeWidth={1.2} />
              <h3 className="font-display text-2xl mb-3">{t.title}</h3>
              <p className="text-warm-white/70 leading-relaxed text-sm">{t.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-warm-white/55 text-sm max-w-md">
            Property values can fall as well as rise. We share our view on each opportunity but
            always recommend independent financial advice before investing.
          </p>
          <button className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-warm-white hover:text-deep-forest transition-colors duration-300">
            Explore Investment Opportunities <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
