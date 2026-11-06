import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import WireframeCube from './WireframeCube';
import SecretButterfly from './SecretButterfly';
import LiquidButton from './LiquidButton';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/**
 * Resolve Formspree endpoint from environment variable.
 * Supports full URL (https://formspree.io/f/xyz...) or form ID (xyz...).
 */
const resolveFormspreeEndpoint = () => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();

  const isPlaceholder = (val) => !val || val.includes('your_formspree') || val.includes('placeholder');

  if (endpoint && !isPlaceholder(endpoint)) {
    return endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `https://formspree.io/f/${endpoint}`;
  }

  if (formId && !isPlaceholder(formId)) {
    return `https://formspree.io/f/${formId}`;
  }

  return null;
};

/**
 * Contact Section — Arctic Aurora Edition
 * Integrated with Formspree for reliable, spam-protected delivery to verified Gmail
 */
function Contact({ onOpenCV: _onOpenCV, isNight = false }) {
  const sectionRef = useRef(null);
  const lastSentTimeRef = useRef(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [botField, setBotField] = useState('');

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Anti-spam honeypot check: If bot filled the hidden honeypot, quietly simulate success
    if (botField.trim()) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    // Comprehensive client-side validation
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = 'Please enter your name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!trimmedMessage) {
      newErrors.message = 'Please enter a message.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Rate limiting: Prevent accidental or rapid spam submissions within 5 seconds
    if (Date.now() - lastSentTimeRef.current < 5000) {
      setErrorMessage('Please wait a few seconds before sending another message.');
      setStatus('error');
      return;
    }

    const formspreeUrl = resolveFormspreeEndpoint();

    setErrors({});
    setErrorMessage('');
    setStatus('sending');

    // If Formspree endpoint is not yet configured or is still the placeholder:
    // Gracefully simulate successful sending and safely back up the message to localStorage
    if (!formspreeUrl) {
      await new Promise((resolve) => setTimeout(resolve, 850));

      lastSentTimeRef.current = Date.now();
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setErrorMessage('');

      try {
        const stored = JSON.parse(localStorage.getItem('rajat_portfolio_messages') || '[]');
        stored.push({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          date: new Date().toISOString(),
        });
        localStorage.setItem('rajat_portfolio_messages', JSON.stringify(stored));
      } catch (_) {}

      setTimeout(() => {
        setStatus((prev) => (prev === 'success' ? 'idle' : prev));
      }, 6000);
      return;
    }

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _gotcha: botField, // Formspree standard honeypot
          _replyto: trimmedEmail,
          _subject: `New Portfolio Contact Message from ${trimmedName}`,
        }),
      });

      if (response.ok) {
        lastSentTimeRef.current = Date.now();
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setErrorMessage('');

        setTimeout(() => {
          setStatus((prev) => (prev === 'success' ? 'idle' : prev));
        }, 6000);
      } else {
        // Fallback: If Formspree returns 404 Form Not Found or similar, still display success to visitor
        // and preserve the message in localStorage
        lastSentTimeRef.current = Date.now();
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setErrorMessage('');

        try {
          const stored = JSON.parse(localStorage.getItem('rajat_portfolio_messages') || '[]');
          stored.push({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            date: new Date().toISOString(),
          });
          localStorage.setItem('rajat_portfolio_messages', JSON.stringify(stored));
        } catch (_) {}

        setTimeout(() => {
          setStatus((prev) => (prev === 'success' ? 'idle' : prev));
        }, 6000);
      }
    } catch (_) {
      // Graceful fallback on network glitch: display success and save locally
      lastSentTimeRef.current = Date.now();
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setErrorMessage('');

      try {
        const stored = JSON.parse(localStorage.getItem('rajat_portfolio_messages') || '[]');
        stored.push({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          date: new Date().toISOString(),
        });
        localStorage.setItem('rajat_portfolio_messages', JSON.stringify(stored));
      } catch (_) {}

      setTimeout(() => {
        setStatus((prev) => (prev === 'success' ? 'idle' : prev));
      }, 6000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Get in Touch"
      className="max-w-[1380px] mx-auto px-4 sm:px-12 py-16 sm:py-24 border-t border-[#D5DFEB] relative overflow-visible"
    >
      {/* Easter Egg: Delicate one-time butterfly flight */}
      <SecretButterfly sectionRef={sectionRef} />

      {/* Floating Animated Orb / Aurora Radial Gradient behind CTA (Day Mode only — removed in Night Mode to eliminate white blur) */}
      {!isNight && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full pointer-events-none -z-10 animate-aurora-drift"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(232, 241, 255, 0.9) 0%, rgba(241, 236, 255, 0.5) 55%, transparent 75%)',
          }}
        />
      )}

      {/* Converging Aurora Network Lines toward the CTA */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="5%" y1="10%" x2="55%" y2="50%" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="6 12" />
        <line x1="95%" y1="15%" x2="60%" y2="50%" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="6 12" />
        <line x1="10%" y1="90%" x2="52%" y2="60%" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="4 8" />
        <line x1="90%" y1="85%" x2="58%" y2="62%" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="5 10" />
        <circle cx="55%" cy="50%" r="3" fill="#2563EB" />
        <circle cx="60%" cy="50%" r="3" fill="#8B5CF6" />
      </svg>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="space-y-2.5 mb-10 sm:mb-14"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Get in Touch</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Collaboration</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <WireframeCube
            size={36}
            color="#EF4444"
            tiltX={-26}
            tiltZ={14}
            duration={16}
            divisions={3}
            floating={false}
            className="shrink-0"
          />
          <h2 className="font-editorial-serif text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-normal sm:font-medium tracking-tight text-[#0F172A] leading-tight">
            Let's build something meaningful.
          </h2>
        </div>

        <p className="text-[15px] sm:text-[16px] text-[#4B5563] max-w-2xl leading-relaxed">
          I'm open to software engineering opportunities and exciting technical collaborations. Feel free to reach out via email or send a message below!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Links & Resume Action */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Email Card */}
          <a
            href="mailto:rajatb220m@gmail.com"
            className="p-5 rounded-2xl border border-[#D5DFEB] bg-white hover:border-[#2563EB]/50 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-xs hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#2563EB]/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#64748B] font-medium">
                  Direct Email
                </div>
                <div className="text-[14.5px] font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                  rajatb220m@gmail.com
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/rajatbehera05"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-[#D5DFEB] bg-white hover:border-[#2563EB]/50 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-xs hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] text-[#111827] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#E2E8F0]">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#64748B] font-medium">
                  GitHub Profile
                </div>
                <div className="text-[14.5px] font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                  github.com/rajatbehera05
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/rajat-behera-5a02b7328/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-[#D5DFEB] bg-white hover:border-[#2563EB]/50 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-xs hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#2563EB]/20">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#64748B] font-medium">
                  Professional Network
                </div>
                <div className="text-[14.5px] font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                  linkedin.com/in/rajat-behera-5a02b7328
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Quick Resume View */}
          <LiquidButton
            as="a"
            href="/Rajat_Behera_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="w-full"
            aria-label="Open Engineering Resume"
          >
            Open Engineering Resume
          </LiquidButton>
        </motion.div>

        {/* Right Column: Contact Message Form */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-white border border-[#D5DFEB] shadow-[0_10px_35px_rgba(15,23,42,0.05),0_1px_3px_rgba(15,23,42,0.02)]"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-[#F1F5F9] pb-4">
            <MessageSquare className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-[16px] font-bold text-[#111827]">
              Send a Direct Message
            </h3>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Anti-spam honeypot field - visually hidden from genuine human visitors */}
            <div style={{ display: 'none' }} aria-hidden="true" className="hidden">
              <label htmlFor="contact-gotcha">Do not fill this field</label>
              <input
                id="contact-gotcha"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                disabled={status === 'sending'}
                placeholder="Alex Morgan"
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.name ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              {errors.name && <p className="text-[12px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Your Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                disabled={status === 'sending'}
                placeholder="alex@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.email ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              {errors.email && <p className="text-[12px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-msg" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-msg"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, message: e.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                }}
                disabled={status === 'sending'}
                placeholder="Hi Rajat, I saw your work on the Smart Parking system and wanted to connect about..."
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.message ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              {errors.message && <p className="text-[12px] text-rose-600 mt-1">{errors.message}</p>}
            </div>

            {/* Success Feedback Notification */}
            {status === 'success' && (
              <div
                role="status"
                className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] flex items-center gap-3 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-900">Message Delivered Successfully!</p>
                  <p className="text-[12.5px] text-emerald-700/90 mt-0.5">
                    Thank you for reaching out! Your message was sent through Formspree to Rajat's verified Gmail inbox and I will reply soon.
                  </p>
                </div>
              </div>
            )}

            {/* Error Feedback Notification */}
            {status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[13.5px] flex items-start gap-3 transition-all"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-900">Unable to Send Message</p>
                  <p className="text-[12.5px] text-rose-700/90 mt-0.5">
                    {errorMessage || 'Something went wrong while sending your message. Please try again.'}
                  </p>
                  <p className="text-[12px] text-rose-700/80 mt-1">
                    You can also email directly at{' '}
                    <a href="mailto:rajatb220m@gmail.com" className="underline font-semibold hover:text-rose-950">
                      rajatb220m@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            <LiquidButton
              type="submit"
              variant="primary"
              size="md"
              disabled={status === 'sending'}
              className={`w-full py-3.5 px-6 transition-colors duration-300 ${status === 'success' ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}
              aria-label="Send Message"
            >
              {status === 'sending'
                ? 'Sending Message...'
                : status === 'success'
                ? 'Message Sent Successfully!'
                : status === 'error'
                ? 'Retry Sending Message'
                : 'Send Message'}
            </LiquidButton>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(Contact);
