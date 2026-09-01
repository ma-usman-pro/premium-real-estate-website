# VERA ESTATES — Luxury Real Estate Website

A premium, production-quality real estate portfolio site for a fictional London
luxury agency, **VERA ESTATES** — "Spaces worth coming home to."

Built with React + Vite + Tailwind CSS v4 + Framer Motion + Lucide React.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **Home**: cinematic hero, live property search, featured properties,
  location explorer (stylised map), editorial category grid, About/stats,
  agent team, new developments, investment section, sell-your-property
  process, testimonials, the buying journey, an architectural photography
  gallery, a validated viewing request form, newsletter signup and full
  contact/location details.
- **Properties**: a dedicated listings view with live filtering (buy/rent,
  location, type, bedrooms, price range), sorting, a results count and a
  polished empty state.
- **Property details**: a full-screen modal with an image gallery,
  keyboard-navigable fullscreen lightbox, features, amenities, floor plan
  placeholder and agent contact.
- Favourites persist to `localStorage`; all imagery lazy-loads below the
  fold and degrades gracefully to a branded placeholder if a source image
  fails to load.

## Structure

```
src/
  components/   UI components (one per section)
  data/         properties, agents, developments, testimonials, images
  hooks/        useFavorites (localStorage-backed)
  App.jsx       view routing + global state (no router dependency)
  index.css     design tokens (Tailwind v4 @theme) + global styles
```

## Notes for handover

- Photography is sourced from Unsplash (free license) and wrapped in a
  `SmartImage` component with automatic fallback — swap any URL in
  `src/data/images.js` or `src/data/*.js` for licensed photography before
  a real launch.
- Agent portraits use `i.pravatar.cc` placeholders — replace with real
  headshots in `src/data/agents.js`.
- The contact form simulates submission (with a success/error state) —
  wire `ViewingForm.jsx`'s `submit` handler to a real endpoint or CRM.
