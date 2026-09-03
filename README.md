# WM — Los Angeles, CA Commercial Waste Service (Redesign)

A from-scratch redesign of the WM (Waste Management) Los Angeles commercial waste
service page, built as a single responsive page in vanilla HTML, CSS and JavaScript.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — semantic markup, meta/OG/Twitter tags, LocalBusiness JSON-LD |
| `styles.css` | Full design system: tokens, components, responsive + print + reduced-motion rules |
| `script.js` | Mobile nav, ARIA tab panels, accordions, scroll spy, reveal-on-scroll, back-to-top |
| `favicon.svg` | SVG favicon |

No build step, no dependencies, no environment variables. Open `index.html` or serve
the directory statically:

```bash
python3 -m http.server 8000
```

## Content

All copy, phone numbers, document links and navigation come from the live WM Los
Angeles commercial waste page:

- **Service:** Los Angeles, CA Commercial Waste Service — Recycling & Trash Pickup
- **Program:** City of Los Angeles **recycLA** public-private partnership
- **Phone:** LASAN Customer Care Center — [1-800-773-2489](tel:1-800-773-2489)
- **Online requests:** LASAN service request portal
- **Support:** WM Support Center
- **Resources:** welcome packets, industry recycling guides, organics compliance
  documents and every recycLA newsletter from Spring 2018 through Spring 2026,
  all linking to the original PDFs

## Sections

1. Utility bar + sticky masthead with scroll-spy navigation
2. Hero — breadcrumb, headline, tagline, dual CTAs, program stat chips
3. LASAN Customer Care Center band with quick service actions
4. Services grid — commercial, roll-off, construction, organics, eWaste, bulk, national accounts, residential
5. recycLA explainer with program benefits and recycLA University training panel
6. Service Guides — accessible tabs (Welcome, Trash, Recycling, Organics, Special Programs, Invoice & Billing)
7. Helpful Resources — accordion document library
8. Holiday schedule and service tools
9. Recycling Myths / Recycle Right®
10. Local Waste Management Solutions (about)
11. Contact — phone, online/email support, service area, request portal, free waste assessment CTA
12. Full footer with all product, support, company and legal links + social profiles

## Images

- The authentic WM Los Angeles welcome hero image is reused from the source site.
- Brand and social icons are reused from the WM asset CDN.
- All remaining photography is sourced from Pexels, chosen per section subject
  (commercial recycling containers, roll-off dumpsters, demolition debris, organics,
  eWaste, baled cardboard, recycling facilities, downtown Los Angeles, support agents).

## Accessibility

Skip links, landmark elements, single `h1`, labelled sections, ARIA tablist with
arrow-key support, `aria-expanded` accordions, visible focus rings, descriptive
alt text, and `prefers-reduced-motion` support.
