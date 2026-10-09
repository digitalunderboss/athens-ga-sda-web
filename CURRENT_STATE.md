# Current State

_Last updated: 2026-10-09_

## Last Session Completed
- **About page polish** (live on production): cropped infographic swapped in; on smaller screens it now sits right under the "A Local Church. A Regional Family. A Worldwide Movement." headline; extra top padding above the Local heading; section headings now "Local - It starts here", "Conference - Connected across Georgia & Tennessee", "Worldwide - A church without borders"; leadership heading "Meet the Conference Leaders"
- **MobileStageBar** is now a continuous scroll-driven progress bar that stays pinned from the Local section to the footer (see DECISIONS.md)
- **Links wired up** (all set in Sanity): About "Meet with the Pastor" → Church Center form; both I'm New "Plan Your Visit" buttons → Church Center form; home hero button renamed "Keep Me Updated" → https://eepurl.com/dfeQEj (new tab). There is no `/connect` page
- `PlanVisitCta` now supports external links; Studio hero-link field hints updated (needs a schema deploy to show)
- Earlier: About page built from the pastor's outline doc, leader photos, favicon, responsive hero images with `mobileImage`, Sermon hero CTAs → YouTube timestamps, Vercel SPA rewrite, `ComingSoon` illustration

## In Progress
- Nothing — all work is merged to `main` and deployed

## Next Up
- Continue building out remaining `ComingSoon` routes (Discipleship, Sermons, Group Bible Study) as outline docs become available
- Finish `staging.athensgasda.org` (DNS in GoDaddy + Vercel) and turn off Vercel Authentication on Preview deployments so the pastor can review without a Vercel login
- Consider polish items: loading states while Sanity content fetches, image alt text audit

## Known Issues
- Local dev can show stale Sanity data (the client uses the CDN and the browser HTTP-caches the responses). If a content change in Sanity doesn't appear locally, restart the dev server and/or re-fetch the `apicdn.sanity.io` URLs with `cache: 'reload'`
- Workflow: work on `staging` (Vercel preview), merge to `main` for production when asked
- Local dev requires Node 24.18.0 (via `nvm use`) in both `/` and `/studio` — Node 20 will fail to install/run either
- Any new local dev port *or* deployment domain needs its own Sanity CORS origin added (`npx sanity cors add <origin> --credentials` from `/studio`) or Sanity fetches will fail with a 403
- Browser favicon caching is unusually sticky — after deploying a new favicon, a hard refresh often isn't enough; closing/reopening the tab (or an incognito window) is the reliable way to see it update
