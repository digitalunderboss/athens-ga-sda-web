# Current State

_Last updated: 2026-08-07_

## Last Session Completed
- Added a `siteSettings` singleton to Sanity (same pattern as `homePage`) for site name, logo, nav links, footer tagline, contact info, social links — seeded with real placeholder nav (Home/About/I'm New/Discipleship/Sermons/Group Bible Study/Offering)
- Built all Phase 1 components, component-first: `Menu` (owns burger toggle state + mobile overlay), `Header` (logo + Menu), `Footer`, `Hero` (carousel with autoplay, arrows, dot indicators), `OptionCards` (reusable card grid, generalized from the original `WorshipOptions`)
- Added `Layout` (Header + `<Outlet />` + Footer) and wired `App.tsx` with nested routes: `/` → `Home`, catch-all `*` → `ComingSoon` placeholder (so every nav link is clickable now even though those pages don't exist yet)
- Added `src/lib/image.ts` (Sanity image URL builder) and `src/lib/content.ts` (GROQ fetch helpers for `homePage`/`siteSettings`), typed via `src/lib/types.ts`
- Hit and fixed a CORS 403 error: each local dev port needs its own allowed origin in Sanity (added `localhost:5173` for the main app, alongside the Studio's `localhost:3339`)
- Ricardo caught two Hero bugs after review: (1) images cropped faces out on the "You Belong Here" slide — fixed by requesting width-only from Sanity instead of a forced width+height (which double-cropped against the CSS `object-cover`), plus `object-top` so faces stay in frame; (2) prev/next arrow buttons weren't clickable — the transparent text-overlay div was `h-full` in normal flow and silently intercepted clicks meant for the arrows underneath; fixed with `pointer-events-none` on that wrapper and `pointer-events-auto` on the actual interactive elements inside it. Both fixes verified on desktop and mobile.
- Pushed to GitHub (`digitalunderboss/athens-ga-sda-web`, `main`) and deployed to Vercel: **https://athens-ga-sda-web.vercel.app/** — added that URL as an allowed Sanity CORS origin and verified the live deployment renders correctly on both desktop and mobile
- Added the "Engaging in Ministry" homepage section (heading/subheading + 4 cards: Community Service, Children's Ministry, Youth Ministry, Young Adult Ministry) — new `ministryHeading`/`ministrySubheading`/`ministryOptions` fields on `homePage`, sourced 4 free Pexels photos
- Added official Seventh-day Adventist Church branding: full icon+wordmark lockup (white) in the Footer, icon-only mark (black) in the Header — both sourced from the denomination's official brand site (adventist.design), added `siteSettings.logo` / `logoDark` fields
- Renamed the site everywhere from "Athens GA SDA Church" to "Athens SDA Church" per Ricardo's request (Sanity `siteName`, hero copy, code fallback strings, HTML `<title>`)
- Fixed Header spacing between logo and site name (`gap-2` → `gap-4`)
- Caught and cleaned up a self-inflicted mistake: ran `tsc -b` while the shell was still in `/studio` from an earlier script, which emitted stray compiled `.js` files that briefly broke the Studio dev server (conflicting `sanity.config.js`/`.ts`) — deleted the stray files, confirmed both apps run clean again

## In Progress
- **Not yet pushed**: all of the above (Ministry section, official logo, branding rename) exists locally and in Sanity, but hasn't been committed/pushed to GitHub, so the live Vercel site does not yet reflect it

## Next Up
- Commit and push this session's work so the pastor can see the updated site
- Pastor/Ricardo review of the live site (colors, copy, image choices — especially the "Online Worship" popcorn photo flagged earlier)
- Consider polish items: loading states while Sanity content fetches (currently renders blank until loaded), image alt text (currently empty strings — should pull from Sanity or derive from heading/label)
- Revisit the two still-unreviewed design inspiration sites (calhounsdachurch.com, revisionchurchatlanta.org) if more visual inspiration is wanted
- Favicon still deferred (still the default Vite icon) — the icon-only SDA symbol we now have in Sanity could be reused for this when Ricardo wants it
- Eventually build out the real pages behind the `ComingSoon` placeholder routes (Phase 2/3 and beyond, per CLAUDE.md)

## Known Issues
- Two design-inspiration sites (calhounsdachurch.com, revisionchurchatlanta.org) couldn't be loaded due to a browser tool permission block — revisit later if needed
- Local dev requires Node 24.18.0 (via `nvm use`) in both `/` and `/studio` — Node 20 will fail to install/run either
- Any new local dev port *or* deployment domain needs its own Sanity CORS origin added (`npx sanity cors add <origin> --credentials` from `/studio`) or Sanity fetches will fail with a 403 — remember this for future Vercel preview-deployment URLs too, since each gets a unique subdomain
- **Gotcha to avoid repeating**: always confirm `pwd` is the repo root before running root-level commands like `tsc -b` or `npm run dev` — running them from `/studio` either targets the wrong app or (as happened this session) emits stray build artifacts into the Studio
