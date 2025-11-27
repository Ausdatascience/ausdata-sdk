'use client';

import { useState, FormEvent } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ContactForm() {
  const { theme } = useTheme();
  const formTheme = theme.contactForm;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: formData
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.error?.message || `Submission failed (${response.status}): ${result.error?.code || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Request error:', error);
      setStatus('error');
      setErrorMessage(`Network error: ${error instanceof Error ? error.message : 'Please check your connection and try again'}`);
    }
  };

  return (
    <div className={`${formTheme.background.light} ${formTheme.background.dark} rounded-2xl shadow-lg p-8 md:p-12`}>
      <h1 className={`text-4xl font-bold text-center mb-2 ${formTheme.title.light} ${formTheme.title.dark}`}>
        G'day! Let's Chat
      </h1>
      <p className={`text-center ${formTheme.subtitle.light} ${formTheme.subtitle.dark} mb-8`}>
        Drop us a line and we'll get back to you as soon as possible
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={`block text-sm font-medium ${formTheme.label.light} ${formTheme.label.dark} mb-2`}>
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${formTheme.input.border.light} ${formTheme.input.border.dark} ${formTheme.input.background.light} ${formTheme.input.background.dark} ${formTheme.input.text.light} ${formTheme.input.text.dark} focus:ring-2 ${formTheme.input.focus} focus:border-transparent outline-none transition`}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${formTheme.label.light} ${formTheme.label.dark} mb-2`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${formTheme.input.border.light} ${formTheme.input.border.dark} ${formTheme.input.background.light} ${formTheme.input.background.dark} ${formTheme.input.text.light} ${formTheme.input.text.dark} focus:ring-2 ${formTheme.input.focus} focus:border-transparent outline-none transition`}
            placeholder="your@email.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className={`block text-sm font-medium ${formTheme.label.light} ${formTheme.label.dark} mb-2`}>
              Phone <span className={formTheme.labelOptional.light}>(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${formTheme.input.border.light} ${formTheme.input.border.dark} ${formTheme.input.background.light} ${formTheme.input.background.dark} ${formTheme.input.text.light} ${formTheme.input.text.dark} focus:ring-2 ${formTheme.input.focus} focus:border-transparent outline-none transition`}
              placeholder="+61 4XX XXX XXX"
            />
          </div>

          <div>
            <label htmlFor="company" className={`block text-sm font-medium ${formTheme.label.light} ${formTheme.label.dark} mb-2`}>
              Company <span className={formTheme.labelOptional.light}>(optional)</span>
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${formTheme.input.border.light} ${formTheme.input.border.dark} ${formTheme.input.background.light} ${formTheme.input.background.dark} ${formTheme.input.text.light} ${formTheme.input.text.dark} focus:ring-2 ${formTheme.input.focus} focus:border-transparent outline-none transition`}
              placeholder="Company name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={`block text-sm font-medium ${formTheme.label.light} ${formTheme.label.dark} mb-2`}>
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${formTheme.input.border.light} ${formTheme.input.border.dark} ${formTheme.input.background.light} ${formTheme.input.background.dark} ${formTheme.input.text.light} ${formTheme.input.text.dark} focus:ring-2 ${formTheme.input.focus} focus:border-transparent outline-none transition resize-none`}
            placeholder="What can we help you with?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-3 px-6 rounded-lg ${formTheme.button.background} ${formTheme.button.hover} ${formTheme.button.disabled} ${formTheme.button.text} font-medium transition-colors duration-200 disabled:cursor-not-allowed`}
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <div className={`p-4 rounded-lg ${formTheme.success.background.light} ${formTheme.success.background.dark} border ${formTheme.success.border.light} ${formTheme.success.border.dark}`}>
            <p className={`${formTheme.success.text.light} ${formTheme.success.text.dark} text-center`}>
              ✓ Thanks mate! We'll be in touch shortly
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className={`p-4 rounded-lg ${formTheme.error.background.light} ${formTheme.error.background.dark} border ${formTheme.error.border.light} ${formTheme.error.border.dark}`}>
            <p className={`${formTheme.error.text.light} ${formTheme.error.text.dark} text-center`}>
              ✗ {errorMessage}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
