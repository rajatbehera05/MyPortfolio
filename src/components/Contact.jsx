import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
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
 * Contact Section — Arctic Aurora Edition
 */
export default function Contact({ onOpenCV }) {
  const sectionRef = useRef(null);
  const lastSentTimeRef = useRef(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [botField, setBotField] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Anti-spam honeypot check: If filled, quietly pretend success
    if (botField) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    // Input validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please enter at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Rate limiting: Prevent multiple rapid submissions
    if (Date.now() - lastSentTimeRef.current < 10000) {
      setErrorMessage('Please wait a few seconds before sending another message.');
      setStatus('error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'your_emailjs_service_id_here') {
      console.error('EmailJS configuration missing in environment variables.');
      setErrorMessage('Email service configuration is pending. Please configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.');
      setStatus('error');
      return;
    }

    setErrors({});
    setErrorMessage('');
    setStatus('sending');

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        message: formData.message.trim(),
        reply_to: formData.email.trim(),
        to_email: 'rajatb220m@gmail.com',
      };

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (response.status === 200 || response.text === 'OK') {
        lastSentTimeRef.current = Date.now();
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Restore button state after 6 seconds
        setTimeout(() => {
          setStatus((prev) => (prev === 'success' ? 'idle' : prev));
        }, 6000);
      } else {
        throw new Error(`EmailJS responded with status: ${response.status}`);
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMessage(
        err?.text || err?.message || 'Failed to send message. Please try again or reach out directly at rajatb220m@gmail.com.'
      );
      // Notice: formData is preserved on error so user does not lose their typed message
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Get in Touch"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#D5DFEB] relative overflow-visible"
    >
      {/* Easter Egg: Delicate one-time butterfly flight */}
      <SecretButterfly sectionRef={sectionRef} />

      {/* Floating Animated Orb / Aurora Radial Gradient behind CTA */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full pointer-events-none -z-10 animate-aurora-drift"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(232, 241, 255, 0.9) 0%, rgba(241, 236, 255, 0.5) 55%, transparent 75%)',
        }}
      />

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
        className="space-y-2.5 mb-14"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Get in Touch</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Collaboration</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 sm:gap-4">
          <WireframeCube
            size={38}
            color="#EF4444"
            tiltX={-26}
            tiltZ={14}
            duration={16}
            divisions={3}
            floating={false}
            className="shrink-0"
          />
          <h2 className="font-editorial-serif text-[34px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-normal sm:font-medium tracking-tight text-[#0F172A] leading-tight">
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
            href="https://linkedin.com"
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
                  Connect on LinkedIn
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Quick Resume View */}
          <LiquidButton
            variant="secondary"
            size="md"
            onClick={onOpenCV}
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
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="contact-hp">Do not fill this field</label>
              <input
                id="contact-hp"
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                disabled={status === 'sending'}
                placeholder="Alex Morgan"
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.name ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all disabled:opacity-60`}
              />
              {errors.name && <p className="text-[12px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Your Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                disabled={status === 'sending'}
                placeholder="alex@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.email ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all disabled:opacity-60`}
              />
              {errors.email && <p className="text-[12px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-msg" className="block text-[12px] font-semibold text-[#4B5563] mb-1.5">
                Message
              </label>
              <textarea
                id="contact-msg"
                rows="4"
                required
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                disabled={status === 'sending'}
                placeholder="Hi Rajat, I saw your work on the Smart Parking system and wanted to connect about..."
                className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border ${errors.message ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400/20' : 'border-[#D5DFEB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'} text-[#111827] placeholder-[#94A3B8] text-[14px] focus:outline-none transition-all resize-none disabled:opacity-60`}
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
                  <p className="font-semibold text-emerald-900">Message Sent Successfully!</p>
                  <p className="text-[12.5px] text-emerald-700/90 mt-0.5">
                    Thank you for reaching out! Your message was delivered to my Gmail inbox and I will reply soon.
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
              className={`w-full py-3.5 px-6 ${status === 'success' ? 'bg-emerald-600' : ''}`}
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
