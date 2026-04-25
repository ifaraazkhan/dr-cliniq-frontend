'use client';

import { useState } from 'react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinalCTA() {
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section
      id="signup"
      className="relative overflow-hidden"
      style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '100px 0' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: 'linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-ed relative text-center max-w-3xl mx-auto">
        <div className="eyebrow justify-center mb-4" style={{ color: 'oklch(0.7 0.02 95)' }}>
          <span className="live-dot" /> One last thing
        </div>

        <h2 className="mb-6" style={{ fontSize: 'var(--fs-h1)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          You won&apos;t redesign WhatsApp.<br />
          <span style={{ color: 'var(--accent)' }}>You can teach it medicine.</span>
        </h2>

        <p className="mx-auto mb-10" style={{ fontSize: 17, color: 'oklch(0.75 0.01 95)', maxWidth: 540 }}>
          One number. Ten digits. Tap once — WhatsApp opens, our team replies in under 30 seconds.
        </p>

        {!done ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (phone.length < 10) return;
              setDone(true);
              const url = buildWhatsAppUrl(phone);
              setTimeout(() => { window.location.href = url; }, 600);
            }}
            className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 sm:gap-0"
          >
            <div
              className="flex items-stretch flex-1 rounded-full sm:rounded-r-none"
              style={{
                background: 'oklch(0.22 0.012 250)',
                border: '1px solid oklch(0.32 0.012 250)',
                padding: 5,
              }}
            >
              <div
                className="flex items-center mono shrink-0"
                style={{ padding: '0 16px', color: 'oklch(0.7 0.02 95)', fontSize: 13, borderRight: '1px solid oklch(0.32 0.012 250)' }}
              >
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={phone}
                aria-label="Enter your phone number"
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98765 43210"
                className="flex-1 border-none outline-none bg-transparent mono min-w-0"
                style={{ padding: 14, fontSize: 15, color: 'var(--paper)', letterSpacing: '0.04em' }}
              />
            </div>
            <button
              type="submit"
              className="btn-ed btn-accent-ed sm:rounded-l-none justify-center"
              style={{ padding: '12px 22px' }}
            >
              Send setup link
            </button>
          </form>
        ) : (
          <div
            className="flex flex-col sm:flex-row gap-3 sm:items-center text-left rounded-2xl max-w-md mx-auto"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--emerald-deep)',
              padding: 16,
              animation: 'fadeUp 400ms cubic-bezier(.2,.8,.2,1) both',
            }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="grid place-items-center rounded-full shrink-0" style={{ width: 36, height: 36, background: 'var(--accent)', color: 'white' }}>✓</div>
              <div className="min-w-0">
                <div className="font-medium">Opening WhatsApp…</div>
                <div className="text-xs opacity-85">If it doesn&apos;t open, tap the button.</div>
              </div>
            </div>
            <a
              href={buildWhatsAppUrl(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ed btn-accent-ed justify-center shrink-0 w-full sm:w-auto"
              style={{ padding: '12px 18px', fontSize: 13 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0012.04 0C5.5 0 .19 5.31.19 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 005.64 1.44h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.38-8.43zM12.05 21.7h-.01a9.84 9.84 0 01-5.02-1.38l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 1118.27-5.18c0 5.43-4.42 9.85-9.87 9.85zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35z" /></svg>
              Open WhatsApp
            </a>
          </div>
        )}

        <div className="mt-3 text-xs" style={{ color: 'oklch(0.6 0.02 95)' }}>
          No credit card required. Free plan available forever.
        </div>

        <div className="flex flex-wrap gap-10 sm:gap-14 mt-16 justify-center">
          {[
            { n: '<2s', l: 'AI reply time' },
            { n: '50+', l: 'ready-made protocols' },
            { n: '₹0', l: 'to get started' },
            { n: 'Made', l: 'for Indian practice' },
          ].map(s => (
            <div key={s.l}>
              <div className="serif" style={{ fontSize: 'clamp(32px, 4vw, 40px)' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 11, color: 'oklch(0.6 0.02 95)', letterSpacing: '0.06em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
