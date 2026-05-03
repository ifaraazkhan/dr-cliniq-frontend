'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type Device = 'mobile' | 'desktop' | null;
type Stage = 'idle' | 'loading' | 'mobile-redirect' | 'desktop-qr';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.drcliniq.in';

function detectDevice(): Device {
  if (typeof window === 'undefined') return null;
  const ua = navigator.userAgent.toLowerCase();
  const isMobileUA = /android|iphone|ipad|ipod|mobile|blackberry|windows phone/.test(ua);
  const isNarrow = window.innerWidth < 768;
  return isMobileUA || isNarrow ? 'mobile' : 'desktop';
}

async function callLandingSignup(phone: string, device: 'mobile' | 'desktop'): Promise<string> {
  try {
    const res = await fetch(`${API_URL}/api/auth/landing-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: `91${phone}`, device }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.waUrl || buildWhatsAppUrl(phone);
    }
  } catch {
    // silently fall back — lead capture failed but UX continues
  }
  return buildWhatsAppUrl(phone);
}

interface SignupFormProps {
  theme?: 'light' | 'dark';
}

export default function SignupForm({ theme = 'light' }: SignupFormProps) {
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [waUrl, setWaUrl] = useState('');
  const [device, setDevice] = useState<Device>(null);

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const isDark = theme === 'dark';

  const inputBg = isDark ? 'oklch(0.22 0.012 250)' : 'var(--paper)';
  const inputBorder = isDark ? '1px solid oklch(0.32 0.012 250)' : '1.5px solid var(--ink)';
  const inputColor = isDark ? 'var(--paper)' : 'var(--ink)';
  const flagColor = isDark ? 'oklch(0.7 0.02 95)' : 'var(--ink-2)';
  const flagBorder = isDark ? '1px solid oklch(0.32 0.012 250)' : '1px solid var(--rule)';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length < 10) return;

    const det = device ?? detectDevice() ?? 'mobile';
    setStage('loading');

    const url = await callLandingSignup(phone, det);
    setWaUrl(url);

    if (det === 'mobile') {
      setStage('mobile-redirect');
      setTimeout(() => { window.location.href = url; }, 600);
    } else {
      setStage('desktop-qr');
    }
  }

  // ── Mobile redirect state ──────────────────────────────────────
  if (stage === 'mobile-redirect') {
    return (
      <div
        className="flex flex-col sm:flex-row gap-3 sm:items-center rounded-2xl"
        style={{
          padding: 16,
          background: 'var(--accent-soft)',
          color: 'var(--emerald-deep)',
          animation: 'fadeUp 400ms cubic-bezier(.2,.8,.2,1) both',
          maxWidth: 480,
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="grid place-items-center rounded-full shrink-0" style={{ width: 32, height: 32, background: 'var(--accent)', color: 'white', fontSize: 14 }}>✓</div>
          <div className="min-w-0">
            <div className="font-medium">Opening WhatsApp…</div>
            <div className="text-xs opacity-80">If it doesn&apos;t open, tap the button.</div>
          </div>
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-ed btn-accent-ed justify-center shrink-0 w-full sm:w-auto" style={{ padding: '12px 18px', fontSize: 13 }}>
          <WhatsAppIcon /> Open WhatsApp
        </a>
      </div>
    );
  }

  // ── Desktop QR state ───────────────────────────────────────────
  if (stage === 'desktop-qr') {
    return (
      <div
        style={{
          maxWidth: 420,
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeUp 400ms cubic-bezier(.2,.8,.2,1) both',
        }}
      >
        {/* Header bar */}
        <div style={{ background: 'var(--accent)', padding: '14px 20px' }} className="flex items-center gap-2">
          <WhatsAppIcon size={18} color="white" />
          <span className="font-medium text-sm" style={{ color: 'white', letterSpacing: '-0.01em' }}>WhatsApp Setup</span>
          <span className="mono ml-auto" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>SCAN TO START</span>
        </div>

        {/* QR area */}
        <div style={{ padding: '28px 32px 20px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              padding: 16,
              background: 'white',
              borderRadius: 16,
              border: '1px solid var(--rule)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <QRCode
              value={waUrl}
              size={180}
              fgColor="oklch(0.18 0.012 250)"
              bgColor="white"
              style={{ display: 'block' }}
            />
          </div>

          {/* UPI-style step pills */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-5">
            {[
              { n: '1', label: 'Open WhatsApp' },
              { n: '2', label: 'Scan code' },
              { n: '3', label: 'Tap Send' },
            ].map((step, i) => (
              <div key={step.n} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="grid place-items-center rounded-full shrink-0 mono"
                    style={{ width: 22, height: 22, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 600 }}
                  >
                    {step.n}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{step.label}</span>
                </div>
                {i < 2 && (
                  <span style={{ color: 'var(--rule)', fontSize: 14, margin: '0 2px' }}>→</span>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid var(--rule)', margin: '0 -32px', marginBottom: 16 }} />

          {/* Phone + change */}
          <div className="flex items-center justify-between" style={{ padding: '0 0' }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Sending to</span>
              <span className="mono font-medium" style={{ fontSize: 13, color: 'var(--ink)', letterSpacing: '0.04em' }}>+91 {phone}</span>
            </div>
            <button
              onClick={() => { setStage('idle'); setPhone(''); }}
              className="mono"
              style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              CHANGE
            </button>
          </div>
        </div>

        {/* Also open link on desktop if WhatsApp Desktop installed */}
        <div style={{ borderTop: '1px solid var(--rule)', padding: '12px 20px', background: 'var(--paper-2)', textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Have WhatsApp on this device? </span>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>
            Open directly →
          </a>
        </div>
      </div>
    );
  }

  // ── Default form state ─────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
      <div
        className="flex items-stretch gap-0"
        style={{
          background: inputBg,
          border: inputBorder,
          borderRadius: 999,
          padding: 5,
          overflow: 'hidden',
        }}
      >
        <div
          className="flex items-center gap-1.5 mono shrink-0"
          style={{ padding: '0 10px', color: flagColor, fontSize: 13, borderRight: flagBorder }}
        >
          🇮🇳 +91
        </div>
        <input
          type="tel"
          aria-label="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="98765 43210"
          className="mono flex-1 border-none outline-none bg-transparent min-w-0"
          style={{ padding: '0 16px', fontSize: 16, color: inputColor, letterSpacing: '0.04em' }}
        />
        <button
          type="submit"
          disabled={stage === 'loading'}
          className="btn-ed btn-accent-ed hidden sm:inline-flex"
          style={{ padding: '14px 24px', fontSize: 14, opacity: stage === 'loading' ? 0.7 : 1 }}
        >
          {stage === 'loading' ? 'Sending…' : 'Send setup link'}
          {stage !== 'loading' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={stage === 'loading'}
        className="btn-ed btn-accent-ed sm:hidden w-full mt-3 justify-center"
        style={{ padding: '14px 24px', fontSize: 14, opacity: stage === 'loading' ? 0.7 : 1 }}
      >
        {stage === 'loading' ? 'Sending…' : 'Send setup link →'}
      </button>
    </form>
  );
}

function WhatsAppIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M20.52 3.48A11.94 11.94 0 0012.04 0C5.5 0 .19 5.31.19 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 005.64 1.44h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.38-8.43zM12.05 21.7h-.01a9.84 9.84 0 01-5.02-1.38l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 1118.27-5.18c0 5.43-4.42 9.85-9.87 9.85zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}
