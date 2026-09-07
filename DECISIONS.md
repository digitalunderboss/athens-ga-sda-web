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

**Header nav has three explicit width zones, using custom pixel breakpoints
(960px and 560px), not Tailwind's default named breakpoints**
Ricardo specified exact cutoffs, which don't line up with Tailwind's default
scale (`sm`=640, `md`=768, `lg`=1024), so `Menu.tsx` and `MobileQuickNav.tsx`
use arbitrary-value breakpoints (`min-[960px]:`, `min-[560px]:`) directly
rather than the named ones:
- **≥960px**: full desktop `<nav>` shown (`hidden min-[960px]:flex`); burger
  button and mobile overlay menu hidden (`min-[960px]:hidden`); quick-nav
  hidden (it's `<560px` only, so already off at this width).
- **560–959px**: burger button only. Full nav is hidden (`<960px`), and the
  icon quick-nav is hidden too (`min-[560px]:hidden` — at ≥560px it's off).
  This zone exists because the full nav doesn't fit here (it crowded the
  site name / wrapped mid-word at these widths), but Ricardo didn't want the
  icon strip cluttering tablet-sized screens either — tablets get burger-only.
- **<560px**: burger button *and* the icon quick-nav both shown.

Do not consolidate these back onto one shared breakpoint (e.g. reusing `lg`
for both the burger and the quick-nav) — the whole point is that the
burger's on/off point (960px) and the quick-nav's on/off point (560px) are
different from each other. If nav link count changes and 960px no longer
fits the full nav, raise that number — don't change 560px along with it
unless explicitly asked.

**Mobile quick-nav (icon strip) icon mapping**
`MobileQuickNav.tsx` is a horizontally-scrollable icon+label row (Heroicons
outline set), sitting inside the sticky `Header` right below the top
logo/burger row — modeled on elevationchurch.org's mobile nav. Icons are
mapped by nav-link **label** via a hardcoded `ICONS_BY_LABEL` record in the
component, with `Squares2X2Icon` as the fallback for any label not in the
map. This is intentionally a code-level mapping, not a Sanity schema field —
do not add an "icon" field to the `navLink` Sanity schema for this; if a new
nav link label is added in Sanity, just add a matching entry to
`ICONS_BY_LABEL` in code (it'll fall back gracefully in the meantime).

**Stacked homepage sections use `pt-16` + `last:pb-16`, not `py-16` each**
`OptionCards` (used for both Worship and Ministry) only applies top padding
per instance, with bottom padding added via Tailwind's `last:` variant so
only the actual last section before the Footer gets it. This works because
`Hero`, and each `OptionCards` section, are direct siblings under `Layout`'s
`<main>`. Do not go back to a symmetric `py-16` per section — with sections
stacked directly, that doubles the visual gap between them (bottom padding
of one + top padding of the next), which is exactly the bug Ricardo caught.
If a non-`OptionCards` section is ever inserted between them, re-check this
still resolves to the right element being `:last-child`.

**Nav links can be external URLs — detected by an `isExternalLink()` helper**
`src/lib/links.ts` exports `isExternalLink(path)`, checking for a
`http(s)://` prefix. `Menu`, `MobileQuickNav`, and `Footer` all branch on
this per-link: external links render as plain `<a target="_blank"
rel="noreferrer">`, internal ones use React Router's `Link`/`NavLink`. Do
not pass an absolute URL straight into React Router's `Link`/`NavLink` — it
does not reliably do a real browser navigation for cross-origin URLs. The
`navLink.path` Sanity field now documents both usages. The Offering nav
link is the first real example: it points straight to
`https://adventistgiving.org/donate/ANTFBV` — there is intentionally no
`/offering` page. Do not build one; if the giving link ever changes, update
`siteSettings.navLinks[label="Offering"].path` in Sanity, not code.

**"I'm New" is the first real page beyond Home — built from the pastor's
own outline doc, not improvised copy**
`imNewPage` is a new Sanity singleton (same pattern as `homePage`), and
`/im-new` now routes to a real page instead of `ComingSoon`. Content and
section order come directly from
`~/Downloads/I'm New - Webpage Outline.docx`, including which sections the
pastor marked "(banner)" vs "(card)" vs "(dropdown)" — that determined the
component choice (`TextBanner`/`PlanVisitCta` for banners, `OptionCards`
for the 5-card discipleship pathway, a new `Faq` accordion for the
dropdown). Do not rewrite this page's copy without checking the source doc
— it's the pastor's actual wording, not a placeholder.

**Empty optional fields hide their section, they don't get filler text**
`sermonSeriesText` is seeded empty (the pastor's doc literally says "Place
current sermon series here" — a note to fill in later, not real copy).
`SaturdaySchedule` only renders that block when the field is non-empty.
Do not invent a fake sermon series name to fill the gap — leave it empty
until the pastor supplies one in Sanity, and follow this same pattern
(hide-if-empty over fabricated content) for any other "TBD" pastor notes
that show up in future page outlines.

**FAQ accordion uses native `<details>/<summary>`, not JS state**
`Faq.tsx` needs no `useState` — native HTML handles open/closed, keyboard
access, and screen readers for free. Do not rewrite this with
`useState`/`onClick` toggle logic unless a real need for custom animation
or "only one open at a time" behavior comes up.

**`OptionCards` now supports `columns={3}` alongside 2 and 4**
Added for the 5-card discipleship pathway (3+2 wrap on desktop, single
column on mobile). Reused rather than building a new card-grid component —
see the earlier decision on `OptionCards` being the shared card-grid
component for exactly this reason.

**I'm New hero image reuses the homepage's "You Belong Here" photo asset**
Rather than sourcing a new stock photo, `imNewPage.heroSlides[0].image`
references the same already-uploaded Sanity asset
(`image-4a2420e2f14632fb666c65070d0be23fad08e913-5171x3447-jpg`) that the
homepage's second hero slide used before it was repurposed for the Sermons
slide. Thematically it fit "We're Glad You're Here" better than any new
search result found (repeated attempts kept surfacing corporate-office or
clergy-vestment photos inappropriate for this SDA church site). Reusing an
already-uploaded asset like this is fine — no need to re-upload a duplicate
file when an existing one fits.

**Sermon hero CTA links are computed from a YouTube URL + timestamp field,
not typed in as a full link**
`heroSlide` gained two optional fields — `youtubeVideoUrl` and
`youtubeTimestamp` (MM:SS or H:MM:SS, e.g. `54:50` or `1:26:04`). When
`youtubeVideoUrl` is set it overrides `primaryCtaLink`/`secondaryCtaLink`
for that slide: the Secondary CTA links to the bare video, and the Primary
CTA links to the same video with `&t=<seconds>s` appended, computed by
`src/lib/youtube.ts` (`withYoutubeTimestamp`). This means the pastor only
ever edits a timestamp like the sermon start time in his own notation
(`54:50`), not a raw seconds count or a hand-built query string. Reuse this
same field pair (not a hand-typed link) for any future YouTube CTA that
needs to jump to a specific point in a video — e.g. the future Sermons page.

**External CTA links (YouTube, Offering, etc.) render a plain `<a
target="_blank">`, not a React Router `Link`**
`Hero` and `OptionCards` now branch on `isExternalLink()` the same way
`Menu`/`Footer`/`MobileQuickNav` already did — external URLs get a real
anchor tag that opens in a new tab; internal paths still use `<Link>` for
client-side routing. Apply this same branch to any new component that
renders a Sanity-supplied CTA link, since any of those fields can end up
holding either an internal path or a full external URL.

**"We'd Love to Meet You" (I'm New page) uses the page background color,
not a green band**
`PlanVisitCta` originally used `bg-primary` (matching `TextBanner`'s
banner styling) but the pastor wanted it to blend into the page instead.
Because it's now the same background as the section above it (`Faq`), its
top padding does the job `last:pb-16` used to do — `Faq` was changed back
to `pt-16` only (no bottom padding) so the gap between the last FAQ item
and this section isn't doubled. Don't reintroduce `bg-primary` here without
also reverting `Faq`'s padding, or the doubled-gap bug will come back.

**About page is the second real page built directly from a pastor outline
doc — same rule as "I'm New"**
`aboutPage` is a new Sanity singleton (same singleton pattern as `homePage`
and `imNewPage`), and `/about` now routes to a real page instead of
`ComingSoon`. Every heading, paragraph, stat, and card comes verbatim from
`About Page Layout.docx` (Hero → Local/Pastor → Conference → Worldwide →
Stats → Global Family → Beliefs CTA) — do not paraphrase or "improve" this
copy without checking the source doc, same as the I'm New page rule.

**Pastor's family photo is used as-is for the Pastor Profile section, not
cropped to just Pastor Scott**
The outline doc's text says "Large photograph of Pastor Scott," but the
photo Ricardo actually supplied (and explicitly asked to be used) is a
family portrait — Scott, his wife Pashal, and their two kids — which
pairs naturally with the bio paragraph that mentions the family. Don't
crop this down to a solo headshot; the family photo is the intended
asset.

**Local CTA button ("Plan Your Visit") links to `/im-new`, not something
copied from the outline doc**
The outline never specified a href for this button — only the label. Since
"Plan Your Visit" is the same label already used on the I'm New page's own
final CTA, `/im-new` is the natural target (it's literally the page whose
job is to help a first-time visitor plan a visit). If a dedicated
"plan your visit" flow is ever built elsewhere, update
`aboutPage.localCtaButtonLink` in Sanity — don't assume the doc specified
this link, because it didn't.

**Local → Conference → Worldwide scroll-spotlight is sticky-with-highlight
on desktop, static-inline on mobile — not two different layouts**
`ScrollSpotlightImage` (the pastor's local/regional/worldwide infographic)
sits in a CSS grid alongside the Local/Conference/Worldwide sections:
`grid-cols-1 lg:grid-cols-[280px_1fr]`. On `lg:` screens the image column
gets `lg:sticky lg:top-24`, so it stays pinned while the three sections
scroll past beside it; an `IntersectionObserver` in `About.tsx` (watching
one ref per section, `rootMargin: '-40% 0px -40% 0px'`) tracks which
section is centered in the viewport and moves a glowing ring overlay to
that section's icon on the image (position values are hardcoded
percentages measured against this specific graphic — they will need
re-measuring if the pastor ever supplies a differently-laid-out graphic).
Below `lg:`, the same grid just collapses to one column, so the image
renders once, inline, at its normal (non-sticky) position — there's
intentionally no separate mobile-only image treatment or reduced/simplified
animation to maintain; the single grid does both jobs. Don't try to make
the sticky/spotlight effect happen on mobile — there's no second column
for text to scroll past beside a pinned image, so it would just overlap.

## Future-Phase Decisions (recorded now, not yet built)

**Sermon detail pages use dynamic routing via slug**
Sermon pages will be `/sermons/:slug`, not query-parameter based
(`/sermons?id=...`). Do not refactor to query-parameter routing when this is
built in a later phase.

**Contact form uses a Vercel Edge Function + Resend**
The contact form's send logic will run as a Vercel Edge Function calling
Resend for email delivery. Do not suggest alternative email providers
(SendGrid, Mailgun, etc.) or a traditional Node server for this.
