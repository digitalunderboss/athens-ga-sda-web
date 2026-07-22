# Athens GA SDA Church Website

Rebuild of the Athens GA Seventh-day Adventist Church website — a single-page
application, board-approved 2026-07-06 (Pastor Scott).

Vision / tagline: **"Experience Christ's Rest While Sharing the Gospel"**

## Tech Stack

- Vite + React 19 + TypeScript
- React Compiler (`babel-plugin-react-compiler`) — already configured, keep it enabled
- React Router for client-side routing
- Sanity CMS for content — **no custom backend or database**
- Tailwind CSS for all styling
- Deployment: Vercel via GitHub integration

No server-side code is needed. Treat this as a static SPA that fetches content
from Sanity at build/runtime.

## Current Phase

**Phase 1 — Homepage, Burger Menu, Footer**

Only build these three pieces right now:
- Responsive burger/nav menu
- Homepage (hero + content sections, see below)
- Footer

Do not build out routes/pages for Discipleship, Sermons, Group Bible Study,
Offering, or "I'm New" yet — see [Future Phases](#future-phases--site-map) for
awareness only. It's fine (and expected) to wire up React Router now so the
nav/footer links point at real route paths, even before those pages exist.

### Homepage priority order (top to bottom)

1. **Visitor-focused** content first
2. **Mission / Outreach-focused** content second
3. **Member Hub** content last

Every visitor should feel welcomed before anything else; the gospel mission
stays central; member resources are always just one click away.

### Homepage content sections

- **Hero — Carousel**: media = worship video / recent sermon. Copy = "Welcome
  to Athens GA SDA Church" / "Come Experience Christ's Rest while Sharing the
  Gospel." Two CTAs: "Get Connected" (→ ministries & worship landing page) and
  "Learn More" (→ About page).
- **Worship section**: "Find the right experience for you — no matter where
  you are, online or in person, join in experiencing Christ's Rest." Two
  options: "Physical Worship" and "Online Worship".

### Design inspiration

Pastor-approved reference: [elevationchurch.org](https://www.elevationchurch.org/)
— full-bleed hero carousel with welcome message + two CTAs, followed by a
card-grid "find your experience" section (Physical Campus / Live Streams /
Watch Party / Pop-Up). Use this as a structural reference for the hero and
worship-options section, adapted to our own color palette and copy — don't
copy their dark theme or copy text verbatim.

(Two other reference sites — calhounsdachurch.com, revisionchurchatlanta.org —
were suggested but not yet reviewed due to a browser tooling block. Revisit if
more inspiration is needed.)

## Design System

Mobile-first and fully responsive is a hard requirement — most visitors will
be on a phone. Design mobile layout first, then expand up to tablet/desktop.

Clean, modern aesthetic.

### Colors

Wire these up as named Tailwind theme colors (not raw hex in components):

| Name | Hex |
|---|---|
| background | `#F7F4ED` |
| primary | `#2F5D50` |
| secondary | `#A8C5B1` |
| text | `#353535` |
| accent | `#D9A441` |

### Photography

Use stock photography as placeholders for now. The pastor will later replace
images/copy himself via the Sanity CMS. Build components to read image/text
content from Sanity schema fields rather than hardcoding — swapping stock
photos and placeholder copy later should require zero code changes.

## Component Conventions

- All components live in `/src/components`
- All pages live in `/src/pages`
- Tailwind for all styling — no inline styles, no separate CSS files
- Mobile-first Tailwind classes always — start unprefixed (mobile), layer
  `sm:`/`md:`/`lg:` on top
- Function components only — no class components

## Sanity CMS

- Project ID: `5q6580ql`
- Dataset: `production`
- Organization ID: `oXh8hrUSO`

The Studio lives in `/studio` as its own standalone Sanity Studio app (own
`package.json`, own `node_modules`, own dev server) — it is **not** embedded
into the main Vite app. It deploys independently to Sanity's free hosting
(`npx sanity deploy` from within `/studio`), so the pastor gets a stable
CMS editing URL that doesn't depend on the website's Vercel deploys. See
[DECISIONS.md](DECISIONS.md).

The main app (`/src`) talks to Sanity read-only via `@sanity/client`, wired up
in `src/lib/sanity.ts`, using `VITE_SANITY_PROJECT_ID` /
`VITE_SANITY_DATASET` env vars (see `.env.example`). Do not add a Sanity
write-token/auth flow to the main app — content editing only happens through
the Studio.

Both `/` (main app) and `/studio` require **Node ≥22.12** — this repo pins
Node `24.18.0` via `.nvmrc`. Run `nvm use` in each directory before installing
or running dev servers.

## Do Not

- Do not use Create React App conventions (this is a Vite project)
- Do not install unnecessary dependencies
- Do not use class components
- Do not hardcode content that should live in Sanity (images, copy for
  pastor-editable sections)
- Do not build pages/routes beyond the current phase's scope

## Future Phases / Site Map

For awareness only — not in scope until their respective phase:

- **Phase 2 — Discipleship**: Disciple TREK, Identify Your Gifts, Witnessing,
  Health, Community Service
- **Phase 3 — Group Bible Study**: Sabbath School → Adult, Young Adult, Youth,
  Children → Kindergarten, Primary, Junior

Also on the full site map (phase TBD): Sermons (YouTube embed + companion
notes page), Offering, "I'm New".
