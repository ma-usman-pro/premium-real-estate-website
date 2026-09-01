import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Properties', view: 'properties' },
  { label: 'Buy', view: 'properties', status: 'Buy' },
  { label: 'Rent', view: 'properties', status: 'Rent' },
  { label: 'Sell', view: 'home', anchor: 'sell' },
  { label: 'Developments', view: 'home', anchor: 'developments' },
  { label: 'About', view: 'home', anchor: 'about' },
  { label: 'Contact', view: 'home', anchor: 'contact' },
];

export default function Navbar({ onNavigate, onBookViewing, currentView }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLink = (link) => {
    setOpen(false);
    onNavigate(link);
  };

  const isDark = !scrolled && currentView === 'home';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || currentView !== 'home'
          ? 'bg-warm-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(24,53,47,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-vera flex items-center justify-between transition-all duration-500 ${
          scrolled || currentView !== 'home' ? 'py-4' : 'py-7'
        }`}
      >
        <button
          onClick={() => handleLink({ view: 'home' })}
          className="font-display text-2xl tracking-[0.08em] font-medium"
          style={{ color: isDark ? '#FCFAF5' : '#18352F' }}
        >
          VERA <span className="text-terracotta">ESTATES</span>
        </button>

        <ul className="hidden lg:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleLink(link)}
                className="btn-underline text-[13px] tracking-[0.04em] font-medium uppercase transition-colors"
                style={{ color: isDark ? 'rgba(252,250,245,0.92)' : '#302923' }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button
            onClick={onBookViewing}
            className="px-6 py-3 bg-terracotta text-warm-white text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-deep-forest transition-colors duration-300"
          >
            Book a Viewing
          </button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="w-6 h-6" color={isDark && !open ? '#FCFAF5' : '#18352F'} />
          ) : (
            <Menu className="w-6 h-6" color={isDark ? '#FCFAF5' : '#18352F'} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden bg-deep-forest overflow-hidden"
          >
            <ul className="container-vera py-8 flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleLink(link)}
                    className="w-full text-left py-3 text-2xl font-display text-warm-white/95 border-b border-warm-white/10"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="pt-6"
              >
                <button
                  onClick={() => { setOpen(false); onBookViewing(); }}
                  className="w-full py-4 bg-terracotta text-warm-white text-sm tracking-[0.08em] uppercase font-medium"
                >
                  Book a Viewing
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
