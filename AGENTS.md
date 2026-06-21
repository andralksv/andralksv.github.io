# Analytics Tracking — Mixpanel

This project uses **Mixpanel** for all product analytics. Mixpanel is the single
source of truth for event tracking and behavioral data. Do not introduce any
other analytics tools, SDKs, or tracking libraries without explicit instruction
from a user.

---

## Before You Add or Modify Any Tracking

⛔ **Do not write Mixpanel tracking code without reading this file first.**

### Mandatory checklist before writing any Mixpanel code

- [ ] Use the shared helpers in `src/analytics.js` — do **not** import `mixpanel-browser` anywhere else.
- [ ] This is a **static, no-auth** site: there are no user accounts, so there is **no `identify()` / `reset()`**.
- [ ] Tracking is **client-side only**. Never call analytics from `src/entry-server.jsx` or anything that runs during the SSR prerender (Node).
- [ ] Preserve the **cookieless / privacy** config (see Initialization) — it's why no consent banner is required.
- [ ] Review the tracking plan below before adding new events.

---

## Tech Stack

| Detail | Value |
|---|---|
| **Platform** | React 19 + Vite 8 — static site, SSR-prerendered to HTML, deployed to GitHub Pages |
| **Mixpanel SDK** | `mixpanel-browser` |
| **SDK version** | `^2.80.0` |
| **Tracking method** | client-side only |
| **CDP (if any)** | none |
| **Consent required** | no — runs in cookieless / privacy-friendly mode (memory-only, no cookies/localStorage, IP geolocation off), so no consent banner is needed |
| **Project token location** | `.env` → `VITE_MIXPANEL_TOKEN` (public client token — safe to commit) |

---

## Mixpanel Initialization

**File:** `src/analytics.js` — initialized once via `initAnalytics()`, called from `src/main.jsx` (client entry only).

Key constraints baked into the setup:

- **Dynamic import.** `mixpanel-browser` is loaded with `await import(...)` *inside* `initAnalytics()` so it never evaluates during the Node SSR/prerender step (which would break `npm run build`). It also code-splits Mixpanel out of the main bundle.
- **Cookieless / privacy config** (do not remove without a consent banner):
  ```js
  mixpanel.init(TOKEN, {
    disable_persistence: true,        // no cookies, no localStorage — anonymous, memory-only
    ip: false,                        // no City/Region/Country from IP (request carries ip=0)
    track_pageview: true,             // baseline page view on load
    skip_first_touch_marketing: true, // no People/profile enrichment (we never identify)
    debug: import.meta.env.DEV,
  })
  ```

**Do not:**
- Import `mixpanel-browser` outside `src/analytics.js`.
- Initialize Mixpanel in more than one place, or during SSR.
- Add `identify()` / `people.set()` / `reset()` — there is no auth here, and persistence is disabled.

---

## Mixpanel Tracking Plan

All events are defined as static, `snake_case` names in the `analytics` object in
`src/analytics.js`. Components call those helpers — they never call `mixpanel.track`
directly and never build event names dynamically.

### Naming conventions

- Event names: `snake_case`, past-tense verb + noun (e.g., `cv_downloaded`).
- Property names: `snake_case`. Variants go in **properties**, never in the event name.
- No PII in properties (no emails, names, phone numbers). IP geolocation is already disabled.

### Current events

| Event | Trigger | Key Properties | File |
|---|---|---|---|
| *(auto) page view* | Page load (`track_pageview: true`) | — | `src/analytics.js` |
| `cv_downloaded` | "download CV" clicked (Value Moment) | `source` | `src/components/Hero.jsx` |
| `contact_opened` | "contact me" popover opened (Value Moment) | `source` | `src/components/Hero.jsx` |
| `email_copied` | Copy-email button clicked | — | `src/components/Hero.jsx` |
| `email_send_clicked` | `mailto:` send clicked | — | `src/components/Hero.jsx` |
| `social_link_clicked` | LinkedIn / Telegram icon clicked | `platform` (`linkedin` \| `telegram`) | `src/components/Hero.jsx` |
| `content_opened` | Case study or AI post card opened | `content_type` (`case_study` \| `ai_post`), `content_title`, `content_tag` | `src/components/Cases.jsx`, `src/components/Knowledge.jsx` |
| `tab_viewed` | Top-level tab switched | `tab` (`about` \| `cases` \| `ai`) | `src/App.jsx` |
| `experience_section_toggled` | Experience job expanded/collapsed | `section_title`, `expanded` (bool) | `src/components/Experience.jsx` |

---

## How to Add a New Event

1. **Check the table above** — reuse an existing event if it fits; don't duplicate.
2. **Add a helper to the `analytics` object** in `src/analytics.js` with a static `snake_case` name. Pass variants as properties.
3. **Call the helper** from the component's event handler (e.g., `onClick`).
4. **Update the table above** with the new event.
5. **Verify in Mixpanel Live View** that the event arrives with the right properties.

---

## What Not to Do

- **No other analytics tools.** Everything goes through Mixpanel via `src/analytics.js`.
- **No `mixpanel-browser` imports outside `src/analytics.js`**, and nothing analytics-related in the SSR path (`src/entry-server.jsx`, `scripts/prerender.mjs`).
- **No dynamically-constructed event names** — names are literals; variants are properties.
- **No PII in properties** — no emails, names, phone numbers. (IP geolocation is already off.)
- **No hardcoded token** — read it from `import.meta.env.VITE_MIXPANEL_TOKEN`.
- **Don't remove the cookieless config** (`disable_persistence`, `ip: false`) without adding a consent banner — it's what keeps this GDPR-friendly without one.
