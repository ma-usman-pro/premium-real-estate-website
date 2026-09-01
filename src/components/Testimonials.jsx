import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/developments';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-deep-forest text-warm-white">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow eyebrow-light mb-5">Client Stories</span>
          <h2 className="font-display text-4xl md:text-5xl text-balance">What Our Clients Say</h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-forest/50 border border-warm-white/10 p-8 flex flex-col"
            >
              <Quote className="w-7 h-7 text-terracotta mb-5" strokeWidth={1.2} />
              <blockquote className="font-display text-xl leading-relaxed mb-6 flex-1">&ldquo;{item.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                ))}
              </div>
              <figcaption className="text-sm text-warm-white/60">
                <span className="text-warm-white font-medium">{item.name}</span> &middot; {item.propertyType}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="bg-forest/50 border border-warm-white/10 p-8 min-h-[280px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col flex-1"
              >
                <Quote className="w-7 h-7 text-terracotta mb-5" strokeWidth={1.2} />
                <blockquote className="font-display text-xl leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                  ))}
                </div>
                <p className="text-sm text-warm-white/60">
                  <span className="text-warm-white font-medium">{t.name}</span> &middot; {t.propertyType}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button onClick={prev} aria-label="Previous testimonial" className="w-10 h-10 rounded-full border border-warm-white/25 flex items-center justify-center hover:bg-warm-white/10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-terracotta' : 'bg-warm-white/30'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full border border-warm-white/25 flex items-center justify-center hover:bg-warm-white/10">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
