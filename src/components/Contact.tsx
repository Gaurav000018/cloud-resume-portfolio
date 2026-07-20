import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const socialLinks = [
    { name: 'GitHub', value: 'github.com/Gaurav000018', icon: <FaGithub className="text-white text-lg" />, href: 'https://github.com/Gaurav000018' },
    { name: 'LinkedIn', value: 'linkedin.com/in/gaurav-singh-a86175325', icon: <FaLinkedin className="text-blue-500 text-lg" />, href: 'https://www.linkedin.com/in/gaurav-singh-a86175325/' },
    { name: 'Email', value: 'heygaurav33@gmail.com', icon: <FaEnvelope className="text-red-400 text-lg" />, href: 'mailto:heygaurav33@gmail.com' },
    { name: 'Location', value: 'Sahibzada Ajit Singh Nagar, Punjab, India', icon: <FaMapMarkerAlt className="text-green-400 text-lg" />, href: 'https://maps.google.com/?q=Sahibzada+Ajit+Singh+Nagar,+Punjab,+India' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace('form-', '')]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFeedbackMsg('Please complete all form fields.');
      return;
    }

    setStatus('loading');
    
    // Compose mailto link and redirect
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`From: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:heygaurav33@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      setFeedbackMsg('Thank you! Redirecting to your mail client...');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm max-w-lg mx-auto">
            Have an open role, project proposal, or query? Fill out the form or reach out via social profiles.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Info cards and Map mockup */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div
                  key={link.name}
                  className="glass-panel p-4 rounded-xl flex items-center space-x-4 border-slate-800/80 shadow-md hover:border-slate-700/50 transition-colors"
                >
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{link.name}</h4>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors mt-0.5 block"
                    >
                      {link.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Styled Maps Mockup/Placeholder */}
            <div className="glass-panel p-2 rounded-xl border-slate-800 overflow-hidden shadow-lg h-56 relative group">
              <iframe
                title="Google Maps Location Mock"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4795906230676!2d76.7153!3d30.7046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee613d965e63%3A0x7d01309f98722c!2sSahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1721381234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.6)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg pointer-events-none"
              />
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800/80 px-2.5 py-1 rounded text-[10px] font-mono text-slate-400">
                Lat: 30.7046° N, Lon: 76.7179° E
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 sm:p-10 rounded-2xl border-slate-800 text-left shadow-xl"
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="form-name" className="text-xs font-semibold text-slate-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Gaurav Kumar Singh"
                      className="bg-slate-950 border border-slate-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="form-email" className="text-xs font-semibold text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="heygaurav33@gmail.com"
                      className="bg-slate-950 border border-slate-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="form-message" className="text-xs font-semibold text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Let's build something scalable..."
                    className="bg-slate-950 border border-slate-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all resize-none"
                  />
                </div>

                {/* Status Indicator */}
                {status !== 'idle' && (
                  <div
                    className={`text-xs font-bold px-4 py-2.5 rounded-lg ${
                      status === 'success'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : status === 'error'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}
                  >
                    {feedbackMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Transmitting logs...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
