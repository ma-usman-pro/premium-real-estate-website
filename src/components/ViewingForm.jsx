import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { properties } from '../data/properties';

const initialState = {
  firstName: '', lastName: '', email: '', phone: '',
  property: '', date: '', time: '', message: '',
};

const inputCls =
  'w-full bg-transparent border-b border-dark-brown/20 focus:border-terracotta outline-none py-2.5 text-dark-brown placeholder:text-muted-brown/60 transition-colors';

export default function ViewingForm({ presetProperty }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  useEffect(() => {
    if (presetProperty) setForm((f) => ({ ...f, property: presetProperty }));
  }, [presetProperty]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required';
    if (!/^[\d+()\s-]{7,}$/.test(form.phone)) e.phone = 'A valid phone number is required';
    if (!form.message.trim()) e.message = 'Please add a short message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await new Promise((resolve, reject) => setTimeout(() => (Math.random() > 0.06 ? resolve() : reject()), 1100));
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream scroll-mt-24">
      <div className="container-vera grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <span className="eyebrow mb-5">Book A Viewing</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest mb-6 text-balance">
            Request A Viewing
          </h2>
          <p className="text-muted-brown leading-relaxed max-w-md">
            Share a few details and one of our advisors will confirm a time that
            works for you, usually within one working day.
          </p>
        </div>

        <div className="bg-warm-white p-7 sm:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-16"
              >
                <CheckCircle2 className="w-12 h-12 text-forest mb-5" strokeWidth={1.3} />
                <h3 className="font-display text-2xl text-deep-forest mb-2">Request received.</h3>
                <p className="text-muted-brown max-w-sm mb-6">
                  Thank you — an advisor will be in touch shortly to confirm your viewing.
                </p>
                <button onClick={() => setStatus('idle')} className="text-terracotta text-sm tracking-[0.08em] uppercase font-medium hover:text-deep-forest transition-colors">
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                noValidate
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6"
              >
                <Field label="First Name" error={errors.firstName}>
                  <input className={inputCls} value={form.firstName} onChange={update('firstName')} placeholder="Jane" />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input className={inputCls} value={form.lastName} onChange={update('lastName')} placeholder="Doe" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className={inputCls} value={form.email} onChange={update('email')} placeholder="jane@email.com" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" className={inputCls} value={form.phone} onChange={update('phone')} placeholder="+44 7700 900000" />
                </Field>
                <Field label="Property Interested In" full>
                  <select className={inputCls} value={form.property} onChange={update('property')}>
                    <option value="">Select a property (optional)</option>
                    {properties.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
                  </select>
                </Field>
                <Field label="Preferred Date">
                  <input type="date" className={inputCls} value={form.date} onChange={update('date')} />
                </Field>
                <Field label="Preferred Time">
                  <input type="time" className={inputCls} value={form.time} onChange={update('time')} />
                </Field>
                <Field label="Message" error={errors.message} full>
                  <textarea rows={4} className={inputCls} value={form.message} onChange={update('message')} placeholder="Tell us a little about what you're looking for..." />
                </Field>

                {status === 'error' && (
                  <div className="sm:col-span-2 flex items-center gap-2 text-terracotta text-sm bg-terracotta/10 px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong sending your request — please try again.
                  </div>
                )}

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest transition-colors duration-300 disabled:opacity-70"
                  >
                    {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                    Request A Viewing
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, full, children }) {
  return (
    <label className={full ? 'sm:col-span-2' : ''}>
      <span className="block text-[11px] tracking-[0.14em] uppercase text-muted-brown mb-2">{label}</span>
      {children}
      {error && <span className="block text-xs text-terracotta mt-1.5">{error}</span>}
    </label>
  );
}
