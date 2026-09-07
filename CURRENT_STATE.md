# Current State

_Last updated: 2026-09-07_

## Last Session Completed
- Built the full **About page** (`/about`) from the pastor's outline doc (`About Page Layout.docx`) and his family photo — replaces its `ComingSoon` placeholder
- New `aboutPage` Sanity singleton covers: Hero, Local/Pastor profile (with pull quote + "Plan Your Visit" CTA), Conference (Georgia-Cumberland stats + leadership cards), Worldwide (Three Angels' Messages cards), a 6-number stats strip, Global Family section, and a final "Explore Our Fundamental Beliefs" CTA
- New reusable Sanity object types: `statItem`, `leaderCard`, `angelCard`
- New **scroll-spotlight** interaction: the pastor's Local→Regional→Worldwide infographic (`scrollVisual`) stays sticky next to the Local/Conference/Worldwide sections on larger screens, with a glowing ring that moves to the matching pin/icon on the graphic as each section scrolls into view (`IntersectionObserver`-driven, no new dependencies). On mobile it just renders inline once at the top since there's no room for a sticky side-by-side layout — see DECISIONS.md
- Since prior snapshot, also shipped in smaller sessions: real SDA favicon, responsive/hotspot-aware Hero images with an optional per-slide `mobileImage`, Sermon Hero CTAs linking to real YouTube timestamps, "Find Service Times" deep-linking to the I'm New page's Saturday schedule, a duplicated "Plan Your Visit" button on the I'm New page, a Vercel SPA rewrite (fixes 404s on refreshing client-side routes), and an undraw.co illustration on the `ComingSoon` pages

## In Progress
- About page is built and verified in-browser (desktop + mobile) but **not yet committed/pushed** — awaiting Ricardo's review

## Next Up
- Ricardo's review of the About page, especially the scroll-spotlight animation and whether the Local CTA button should link somewhere other than `/im-new` (no explicit link was given in the outline doc)
- Continue building out remaining `ComingSoon` routes (Discipleship, Sermons, Group Bible Study) as outline docs become available
- Consider polish items: loading states while Sanity content fetches, image alt text audit

## Known Issues
- Root `npm run lint` currently crashes — it isn't scoped away from `/studio`, which has its own separate ESLint config/deps. Flagged as a follow-up task; lint the two apps separately in the meantime (`npx eslint src/...` from root, `npm run lint` from `/studio`)
- Local dev requires Node 24.18.0 (via `nvm use`) in both `/` and `/studio` — Node 20 will fail to install/run either
- Any new local dev port *or* deployment domain needs its own Sanity CORS origin added (`npx sanity cors add <origin> --credentials` from `/studio`) or Sanity fetches will fail with a 403
- Browser favicon caching is unusually sticky — after deploying a new favicon, a hard refresh often isn't enough; closing/reopening the tab (or an incognito window) is the reliable way to see it update
