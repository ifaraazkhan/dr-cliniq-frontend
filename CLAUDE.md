# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (includes type checking)
npm run start    # Serve production build (requires build first)
npm run lint     # Run Next.js ESLint
```

No test framework is configured.

## Important: Repo Separation

This is the **landing page** repo for DrCliniq. It is separate from the main PWA app.

- **This repo (landing page)**: `github.com/ifaraazkhan/dr-cliniq-frontend` — branch `main`
- **PWA app repo**: `github.com/ifaraazkhan/docAssist` — branch `dev`
- **Local PWA path**: `/Users/semanticbits/Development/YESINFOSOLUTION/docAssist`
- **Domain**: `drcliniq.in`

Note: The PWA repo has a `landing-page/` folder which is a working copy. The canonical landing page source is THIS repo.

## Architecture

**DrCliniq Landing Page** is a Next.js 14 (App Router) marketing site for DrCliniq — an AI-powered WhatsApp automation platform for Indian clinics.

### Stack
- **Next.js 14** with App Router
- **Tailwind CSS** + custom design system in `src/app/globals.css`
- **DM Sans** + **Inter** + **JetBrains Mono** fonts
- **oklch** color system (paper/ink/accent/emerald/saffron/crimson)

### Route Structure

```
src/app/
  page.tsx                        # Home — all sections (Hero, Pain, Calculator, Demo, Library, Pricing, CTA)
  layout.tsx                      # Root layout with SEO metadata, fonts, favicon
  sitemap.ts                      # Auto-generated sitemap.xml
  blog/
    page.tsx                      # Blog index
    whatsapp-automation-for-doctors-india/   # SEO post
    ai-chatbot-healthcare-india/            # SEO post
    dpdp-compliance-clinics-guide/          # SEO post
    reduce-patient-no-shows-whatsapp/       # SEO post
  privacy/page.tsx                # Privacy Policy
  terms/page.tsx                  # Terms of Service
```

### Key Components
- `Hero.tsx` — Main hero with phone form + PhoneShowcase
- `BlogPostLayout.tsx` — Shared blog post template with CTA
- `Logo.tsx` — SVG logo (`/logo.svg`) + "Cliniq" text
- `Footer.tsx` — Links to sections, legal pages, blog

### Styling Conventions
- CSS variables: `--paper`, `--ink`, `--accent`, `--rule`, `--emerald`, `--saffron`, `--crimson`
- Classes: `.container-ed`, `.eyebrow`, `.mono`, `.serif`, `.btn-ed`, `.btn-primary-ed`
- Font sizes via CSS vars: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3`
- Section titles: fontWeight 500, letterSpacing '-0.03em', lineHeight 1.05
- Path alias `@/*` maps to `src/*`

### SEO
- JSON-LD structured data (SoftwareApplication, Organization, FAQPage)
- robots.txt in `public/`
- Auto-generated sitemap at `/sitemap.xml`
- Blog posts target: WhatsApp automation, AI chatbot, LLM healthcare, DPDP compliance
