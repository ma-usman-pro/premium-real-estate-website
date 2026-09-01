import { motion } from 'framer-motion';
import { Search, Eye, FileSignature, Key } from 'lucide-react';

const steps = [
  { n: '01', title: 'Discover', text: 'Tell us what matters — location, lifestyle, budget — and we curate a shortlist worth your time.', icon: Search },
  { n: '02', title: 'View', text: 'Private, accompanied viewings at a pace that suits you, with honest guidance at every step.', icon: Eye },
  { n: '03', title: 'Offer', text: 'We negotiate on your behalf, keeping you informed and in control throughout.', icon: FileSignature },
  { n: '04', title: 'Complete', text: 'From legal coordination to the final walkthrough, we stay involved until keys are in hand.', icon: Key },
];

export default function PropertyJourney() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container-vera">
        <div className="mb-16 max-w-xl">
          <span className="eyebrow mb-5">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">From Search To Sold.</h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-dark-brown/15" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-warm-white border border-deep-forest/15 flex items-center justify-center mb-6">
                <s.icon className="w-6 h-6 text-terracotta" strokeWidth={1.4} />
              </div>
              <span className="font-display text-sm text-terracotta tracking-[0.1em]">{s.n}</span>
              <h3 className="font-display text-2xl text-deep-forest mt-1 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-brown leading-relaxed max-w-xs">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
