import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { img, exteriors, livingRooms } from '../data/images';

const stats = [
  { value: '18+', label: 'Years of Experience' },
  { value: '850+', label: 'Properties Sold' },
  { value: '32', label: 'Prime Locations' },
  { value: '98%', label: 'Client Satisfaction' },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-warm-white scroll-mt-24">
      <div className="container-vera">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-24">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 h-[420px] sm:h-[520px]">
            <div className="col-span-3 row-span-5 corner-frame overflow-hidden">
              <SmartImage src={img(exteriors[4], 1400)} alt="A VERA ESTATES advisor reviewing plans in a light-filled London home" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 col-start-4 corner-frame overflow-hidden">
              <SmartImage src={img(livingRooms[2], 1000)} alt="Detail of a considered London interior" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 row-span-2 col-start-4 row-start-4 bg-terracotta flex items-center justify-center p-6">
              <p className="font-display text-warm-white text-2xl leading-tight text-center">Est. 2008<br />London</p>
            </div>
          </div>

          <div>
            <span className="eyebrow mb-5">About VERA ESTATES</span>
            <h2 className="font-display text-4xl md:text-5xl text-deep-forest mb-7 text-balance">
              Property, With Perspective.
            </h2>
            <div className="space-y-5 text-muted-brown leading-relaxed">
              <p>
                VERA ESTATES was founded on a simple belief: that finding a home should feel
                considered, not transactional. We combine deep local knowledge with a genuine
                eye for design, working across London's most sought-after neighbourhoods to
                represent properties that reward a closer look.
              </p>
              <p>
                Every home we list is walked, photographed and understood by our own team before
                it ever reaches a client — because the right match is rarely found from a
                spreadsheet. It comes from listening, from experience, and from caring about the
                outcome as much as our clients do.
              </p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-6">
              {['Local Expertise', 'Design Awareness', 'Personal Service', 'Discretion & Trust'].map((v) => (
                <div key={v} className="flex items-center gap-3 text-dark-brown text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-terracotta rounded-full shrink-0" />
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 border-t border-dark-brown/10 pt-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-display text-5xl md:text-6xl text-terracotta leading-none mb-3">{s.value}</p>
              <p className="text-sm text-muted-brown tracking-[0.02em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
