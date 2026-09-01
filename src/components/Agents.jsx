import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import SmartImage from './SmartImage';
import { agents } from '../data/agents';

export default function Agents() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow mb-5">Our Team</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">Meet Your Property Advisors</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-warm-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden corner-frame">
                <SmartImage
                  src={agent.photo}
                  alt={`Portrait of ${agent.name}, ${agent.role} at VERA ESTATES`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                  <p className="text-warm-white/90 text-sm leading-relaxed">{agent.bio}</p>
                </div>
              </div>
              <div className="pt-5 px-1">
                <h3 className="font-display text-xl text-deep-forest">{agent.name}</h3>
                <p className="text-sm text-terracotta mb-4">{agent.role}</p>
                <div className="space-y-2 text-sm text-muted-brown mb-4">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-deep-forest transition-colors">
                    <Phone className="w-3.5 h-3.5" /> {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-deep-forest transition-colors break-all">
                    <Mail className="w-3.5 h-3.5" /> {agent.email}
                  </a>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-dark-brown/10">
                  <span className="text-xs text-muted-brown">{agent.listings} listings</span>
                  <a href="#" aria-label={`${agent.name} on LinkedIn`} className="text-deep-forest hover:text-terracotta transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
