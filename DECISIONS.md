# Decisions

Architecture and tradeoff decisions for this project, with the reasoning
behind them. If a decision here seems suboptimal or inconsistent, ask before
"fixing" it — it was likely made deliberately. Update this file whenever a
non-obvious choice is made, even if the feature it applies to isn't built yet.

## Architecture Decisions

**No custom backend or database — Sanity CMS only**
All content is managed through Sanity. Do not introduce a database or
server-side API for content that Sanity can handle.

**Tailwind only — no CSS files, no CSS modules**
All styling is done with Tailwind utility classes. Do not suggest extracting
styles to CSS modules or standalone stylesheets.

**Mobile-first Tailwind classes always**
Base (unprefixed) classes target mobile; `sm:`/`md:`/`lg:` layer on top for
larger screens. Do not write desktop-first styles and scale down.

**Function components only**
No class components anywhere in the codebase.

**React Compiler enabled**
Keep `babel-plugin-react-compiler` on. Do not suggest manual `useMemo`/
`useCallback` optimizations that the compiler already handles, unless there's
a specific measured reason.

**Deploy via Vercel + GitHub integration, no custom CI**
Do not introduce a separate CI/CD pipeline (e.g. GitHub Actions build steps)
unless a real need for one comes up.

**Component-first build order, not page-first**
Build reusable components in isolation before assembling pages from them.
Phase 1 build order: `Header`, `Menu`, `Footer`, `Hero`/`Carousel`,
`WorshipOptions` — then compose the Homepage from those. Header and Menu are
separate components (Header owns layout/logo, Menu owns nav links + burger
toggle state) rather than one combined component, so the mobile burger logic
stays isolated and testable. Do not inline homepage-specific markup that
duplicates what one of these components already does — extend the component
instead.

**Sanity Studio lives in its own `/studio` folder, not embedded in the site**
The Studio is a standalone Sanity app (own `package.json`) deployed
independently via `npx sanity deploy` to Sanity's free hosting. The main site
never bundles Studio code and its deploys are decoupled from Vercel. Do not
suggest mounting the Studio as a route (e.g. `/studio`) inside the main Vite
app.

**Main app only reads from Sanity, never writes**
`src/lib/sanity.ts` uses the public/CDN client for reads. Content editing
happens exclusively through the Studio. Do not add a write-token or
authenticated write flow to the main site.

**Use the `react-router` package directly, not `react-router-dom`**
As of the version installed here (v8.3.0), `react-router` itself provides the
DOM bindings (`BrowserRouter`, etc. — see its `./dom` export) and its peer
dependency (`react >=19.2.7`) matches our React version exactly.
`react-router-dom` is a separate, older-lineage package (still on v7) that
just wraps `react-router` — installing it alongside would add a duplicate,
version-mismatched dependency. Do not add `react-router-dom`.

**Tailwind v4 via `@tailwindcss/vite`, theme colors in `@theme` (index.css)**
No `tailwind.config.js` — Tailwind v4's Vite plugin + CSS-based `@theme`
block in `src/index.css` is the current standard setup. Color tokens
(`background`, `primary`, `secondary`, `text`, `accent`) are defined there as
CSS variables and used as Tailwind utilities (e.g. `bg-background`,
`text-primary`). Do not add a JS/TS Tailwind config file for this.

**`homePage` is a singleton document, enforced via Studio structure**
There should only ever be one Home Page content document. `sanity.config.ts`
uses a custom `structureTool` structure that presents a single fixed "Home
Page" list item (`documentId('homePage')`) instead of the generic
document-type list, and filters `homePage` out of the "create new" templates.
Do not revert to a generic document list for `homePage` — that would let
editors accidentally create duplicate homepage documents.

**Hero is a slides array on `homePage`, not a separate document type**
`heroSlide` and `worshipOption` are `object` types (not `document` types)
embedded as arrays directly on `homePage`. There's exactly one homepage, so
there's no reuse case that would justify making these standalone documents
with references.

**Site-wide nav/footer content lives in a `siteSettings` singleton**
Same singleton pattern as `homePage` (fixed Studio list item, filtered out of
"create new" templates, `_id: 'siteSettings'`). Holds `siteName`, `logo`,
`navLinks`, `footerTagline`, contact info, and `socialLinks`. Header and
Footer both read from this one document rather than hardcoding nav items or
contact details. Do not hardcode nav links in the `Menu` component — they
must come from `siteSettings.navLinks`.

**Menu owns the full nav list, including routes that don't have pages yet**
`siteSettings.navLinks` includes all Phase-1-and-beyond top-level nav items
(About, I'm New, Discipleship, Sermons, Group Bible Study, Offering), and
`App.tsx` has a catch-all `*` route rendering a `ComingSoon` placeholder for
any path without a real page yet. This lets the full nav/burger menu be
navigable and testable now, per CLAUDE.md's "wire up routing before pages
exist" instruction. Do not remove nav links just because their page isn't
built — add real pages under those paths as later phases land instead.

**Plain `useEffect` + `useState` for data fetching, no data-fetching library**
`Home.tsx` and `Layout.tsx` fetch Sanity content with a plain
`useEffect(() => { getX().then(setX) }, [])`. No React Query/SWR/etc. — the
site's data needs are simple singleton-document reads, not complex caching
scenarios. Do not introduce a data-fetching library unless a real need
(e.g. mutations, polling, complex cache invalidation) comes up.

**Each local dev server needs its own Sanity CORS origin**
`localhost:3339` (Studio) and `localhost:5173` (main app) were each added via
`npx sanity cors add <origin> --credentials`. Browser-side Sanity API calls
(including CDN reads) fail with a CORS/403 error from any origin not on this
list. If dev is run on a different port, add that origin the same way before
debugging further — this is not a code bug.

**Request Sanity images at a single `width` only; let CSS `object-cover` do the crop**
Do not chain `.width().height()` on `urlFor()` for images displayed in a
different aspect ratio than the source photo (e.g. `Hero`'s wide/short
banner). Forcing both dimensions makes Sanity crop server-side around the
image's (default-centered) hotspot, and then CSS crops *again* to fit the
actual element — the two crops don't agree and can cut off the subject
(this cropped people's heads out of the hero on the "You Belong Here"
slide). Request width only, and control framing with the `object-position`
utility (`object-top` for the Hero, since subjects are usually higher in
frame than dead-center) on the `<img>` itself.

**Hero's CTA/text overlay wrapper must stay `pointer-events-none`, with
`pointer-events-auto` re-enabled only on the actual interactive children**
The overlay div is `h-full` in normal flow to allow `justify-end` text
positioning, so its invisible box spans the full slide — including over the
prev/next arrow buttons underneath. Without `pointer-events-none` on that
wrapper (and `pointer-events-auto` on the CTA links / dot buttons inside
it), it silently swallows clicks meant for the arrows. Do not remove these
classes when touching `Hero.tsx`.

## Future-Phase Decisions (recorded now, not yet built)

**Sermon detail pages use dynamic routing via slug**
Sermon pages will be `/sermons/:slug`, not query-parameter based
(`/sermons?id=...`). Do not refactor to query-parameter routing when this is
built in a later phase.

**Contact form uses a Vercel Edge Function + Resend**
The contact form's send logic will run as a Vercel Edge Function calling
Resend for email delivery. Do not suggest alternative email providers
(SendGrid, Mailgun, etc.) or a traditional Node server for this.
