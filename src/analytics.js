/**
 * Mixpanel analytics — cookieless / privacy-friendly setup.
 *
 * Why it's built this way:
 *  - The Mixpanel "project token" is a PUBLIC, client-side identifier. It ships
 *    in the browser bundle by design, so it is not a secret. It lives in `.env`
 *    (VITE_MIXPANEL_TOKEN) so a future dev/prod split is a one-line change.
 *  - mixpanel-browser is loaded with a dynamic import INSIDE initAnalytics() so
 *    it is never evaluated during the Node SSR/prerender step (touching `window`
 *    in Node would break `npm run build`). This also code-splits it out of the
 *    initial bundle.
 *  - Event names are static string literals defined in one place (the `analytics`
 *    object below) — never constructed dynamically — so the tracking plan stays
 *    governable.
 */

const TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN

let mp = null // the mixpanel instance, set once initAnalytics() resolves
let started = false

/**
 * Initialize Mixpanel. Call once, on the client only (never during SSR).
 * No-ops safely if there's no token or no `window`.
 */
export async function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true

  if (!TOKEN) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] VITE_MIXPANEL_TOKEN is not set — Mixpanel disabled')
    }
    return
  }

  const { default: mixpanel } = await import('mixpanel-browser')

  mixpanel.init(TOKEN, {
    // Cookieless: no cookie, no localStorage. A fresh anonymous id lives only
    // in memory for the current page session — nothing is stored on the device.
    disable_persistence: true,
    // Do NOT infer City / Region / Country from the visitor's IP address.
    ip: false,
    // Auto-track one page view on load — our baseline event.
    track_pageview: true,
    // Anonymous-only: don't queue People/profile enrichment (we never identify),
    // which would otherwise sit pending forever in this cookieless setup.
    skip_first_touch_marketing: true,
    // Verbose SDK logging in dev only.
    debug: import.meta.env.DEV,
  })

  mp = mixpanel
}

/** Low-level passthrough. No-ops before init resolves and during SSR. */
function track(event, props) {
  if (!mp) return
  mp.track(event, props)
}

/**
 * Tracking plan. Each method maps to one static, snake_case event name.
 * Property VALUES may be dynamic; event NAMES never are.
 */
export const analytics = {
  // Value Moment — strongest hiring-intent signal.
  cvDownloaded: () => track('cv_downloaded', { source: 'hero' }),

  // Value Moment — direct outreach intent.
  contactOpened: () => track('contact_opened', { source: 'hero' }),
  emailCopied: () => track('email_copied'),
  emailSendClicked: () => track('email_send_clicked'),

  // platform: 'linkedin' | 'telegram'
  socialLinkClicked: (platform) => track('social_link_clicked', { platform }),

  // content_type: 'case_study' | 'ai_post'
  contentOpened: (contentType, title, tag) =>
    track('content_opened', {
      content_type: contentType,
      content_title: title,
      content_tag: tag,
    }),

  // tab: 'about' | 'cases' | 'ai'
  tabViewed: (tab) => track('tab_viewed', { tab }),

  // expanded: true when opening a section, false when collapsing it
  experienceSectionToggled: (sectionTitle, expanded) =>
    track('experience_section_toggled', {
      section_title: sectionTitle,
      expanded,
    }),
}
