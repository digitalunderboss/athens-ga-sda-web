# Current State

_Last updated: 2026-07-22_

## Last Session Completed
- Added a `siteSettings` singleton to Sanity (same pattern as `homePage`) for site name, logo, nav links, footer tagline, contact info, social links — seeded with real placeholder nav (Home/About/I'm New/Discipleship/Sermons/Group Bible Study/Offering)
- Built all Phase 1 components, component-first: `Menu` (owns burger toggle state + mobile overlay), `Header` (logo + Menu), `Footer`, `Hero` (carousel with autoplay, arrows, dot indicators), `WorshipOptions` (card grid)
- Added `Layout` (Header + `<Outlet />` + Footer) and wired `App.tsx` with nested routes: `/` → `Home`, catch-all `*` → `ComingSoon` placeholder (so every nav link is clickable now even though those pages don't exist yet)
- Added `src/lib/image.ts` (Sanity image URL builder) and `src/lib/content.ts` (GROQ fetch helpers for `homePage`/`siteSettings`), typed via `src/lib/types.ts`
- Hit and fixed a CORS 403 error: each local dev port needs its own allowed origin in Sanity (added `localhost:5173` for the main app, alongside the Studio's `localhost:3339`)
- Ricardo caught two Hero bugs after review: (1) images cropped faces out on the "You Belong Here" slide — fixed by requesting width-only from Sanity instead of a forced width+height (which double-cropped against the CSS `object-cover`), plus `object-top` so faces stay in frame; (2) prev/next arrow buttons weren't clickable — the transparent text-overlay div was `h-full` in normal flow and silently intercepted clicks meant for the arrows underneath; fixed with `pointer-events-none` on that wrapper and `pointer-events-auto` on the actual interactive elements inside it. Both fixes verified on desktop and mobile.
- Verified everything else in-browser at both desktop and mobile widths: worship cards, footer, and the mobile burger menu (including navigating to a not-yet-built page and seeing the ComingSoon placeholder) all work correctly

## In Progress
- Nothing mid-flight — Phase 1's core homepage/nav/footer loop is functionally complete and Sanity-driven

## Next Up
- Pastor/Ricardo review of the live site (colors, copy, image choices — especially the "Online Worship" popcorn photo flagged earlier)
- Consider polish items: loading states while Sanity content fetches (currently renders blank until loaded), image alt text (currently empty strings — should pull from Sanity or derive from heading/label)
- Revisit the two still-unreviewed design inspiration sites (calhounsdachurch.com, revisionchurchatlanta.org) if more visual inspiration is wanted
- Eventually build out the real pages behind the `ComingSoon` placeholder routes (Phase 2/3 and beyond, per CLAUDE.md)

## Known Issues
- Two design-inspiration sites (calhounsdachurch.com, revisionchurchatlanta.org) couldn't be loaded due to a browser tool permission block — revisit later if needed
- Local dev requires Node 24.18.0 (via `nvm use`) in both `/` and `/studio` — Node 20 will fail to install/run either
- Any new local dev port needs its own Sanity CORS origin added (`npx sanity cors add <origin> --credentials` from `/studio`) or Sanity fetches will fail with a 403
