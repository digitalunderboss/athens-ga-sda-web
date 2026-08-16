# Current State

_Last updated: 2026-08-15_

## Last Session Completed
- Fixed "I'm New" page: "We'd Love to Meet You" section now uses the regular page background instead of a green band (see DECISIONS.md for the padding fix that came with it, avoiding a doubled gap after the FAQ section)
- Sermon Hero slide CTAs now link to real YouTube content: "Watch Sermon" jumps to the sermon's start timestamp, "Watch Full Experience" links to the video from the top. Sanity's `heroSlide` schema gained `youtubeVideoUrl` + `youtubeTimestamp` (pastor types `54:50` or `1:26:04`, app computes the `&t=`  seconds param via `src/lib/youtube.ts`)
- "Watch Live" button (Online Worship card, homepage) now opens `https://www.youtube.com/@athensgasda/streams` in a new tab
- `Hero` and `OptionCards` now branch on `isExternalLink()` for CTA buttons (external → real `<a target="_blank">`, internal → React Router `Link`), matching the pattern already used in nav components
- Deployed updated schema to the pastor's Studio (`athens-sda.sanity.studio`) — along the way, fixed a pre-existing react/react-dom patch-version mismatch in `/studio` (`npm install react@19.2.8 react-dom@19.2.8`) that was blocking the Studio build
- Pushed all "I'm New" page work from the prior session (commit `ee6bd3f`) plus this session's changes

## In Progress
- Nothing in progress — all requested changes verified in-browser (desktop + mobile) and pushed/deployed

## Next Up
- Pastor/Ricardo review of the "I'm New" page, especially: the empty "Current Sermon Series" field (intentionally blank, hidden until filled in), and the reused hero photo (originally the homepage's "You Belong Here" image)
- Continue building out remaining `ComingSoon` routes (About, Discipleship, Sermons, Group Bible Study) as outline docs become available
- Consider polish items: loading states while Sanity content fetches, image alt text
- Favicon still deferred — the icon-only SDA symbol (Cave color) already in Sanity could be reused when Ricardo wants it

## Known Issues
- Two design-inspiration sites (calhounsdachurch.com, revisionchurchatlanta.org) couldn't be loaded due to a browser tool permission block — revisit later if needed
- Local dev requires Node 24.18.0 (via `nvm use`) in both `/` and `/studio` — Node 20 will fail to install/run either
- Any new local dev port *or* deployment domain needs its own Sanity CORS origin added (`npx sanity cors add <origin> --credentials` from `/studio`) or Sanity fetches will fail with a 403
- Always confirm `pwd` is the repo root before running root-level commands like `tsc -b` or `npm run dev` — running them from `/studio` targets the wrong app or emits stray build artifacts
