import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { developments } from '../data/developments';

export default function Developments() {
  return (
    <section id="developments" className="py-24 md:py-32 bg-warm-white scroll-mt-24">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow mb-5">Off-Plan &amp; New Build</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">New Developments</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {developments.map((dev, i) => (
            <motion.article
              key={dev.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group corner-frame bg-cream"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={dev.image}
                  alt={`${dev.name}, a new development in ${dev.area}`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/10 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-sage mb-2">{dev.area}</span>
                  <h3 className="font-display text-3xl text-warm-white mb-4">{dev.name}</h3>
                  <p className="text-warm-white/75 text-sm leading-relaxed mb-6">{dev.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-warm-white/90">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-sage/80 mb-1">Developer</p>
                      <p className="text-sm font-medium">{dev.developer}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-sage/80 mb-1">Completion</p>
                      <p className="text-sm font-medium">{dev.completion}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-sage/80 mb-1">From</p>
                      <p className="text-sm font-medium">£{dev.startingPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-sage/80 mb-1">Residences</p>
                      <p className="text-sm font-medium">{dev.residences}</p>
                    </div>
                  </div>

                  <button className="self-start inline-flex items-center gap-2 text-sm tracking-[0.06em] uppercase text-terracotta hover:text-warm-white transition-colors">
                    Explore Development <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
