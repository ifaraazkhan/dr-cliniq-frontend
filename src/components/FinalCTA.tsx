'use client';

import SignupForm from './SignupForm';

export default function FinalCTA() {
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

        <div className="flex justify-center">
          <SignupForm theme="dark" />
        </div>

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
