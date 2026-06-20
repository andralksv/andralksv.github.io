import { useState, useRef, useEffect } from 'react'

/* ─── EXPERIENCE DATA ─── */
/* Edit these arrays to add/remove/reorder jobs.                         */
/* "expandableJobs" have bullet descriptions and can be expanded.        */
/* "earlierJobs" are title-only, no expand arrow.                        */

const expandableJobs = [
  {
    title: 'Product Owner (Web + iOS + Android) at Skoove',
    location: 'Berlin',
    period: '2023 – Present',
    bullets: [
      'Subscription EdTech app teaching piano, operating across 8 markets.',
      'Owned onboarding and monetization flows across Web and App for a subscription-based SaaS platform operating internationally.',
      'Revamped new-user experience by rethinking the entry and onboarding flows across Web and App – making Skoove feel more personalized and relevant for new piano learners.',
      '+50% trial starts and +31% registration-to-trial conversion, cumulative across multiple onboarding A/B tests.',
      '+18% CLV through pricing and paywall experiments.',
      'Commercial experiments and growth initiatives consistently led to +15–20% YoY revenue growth, driven by both new customer acquisition & renewed subscription revenue.',
      'Led partner integration for a new co-branded product: translated commercial requirements into technical specs, managed cross-org stakeholder alignment, and coordinated delivery across engineering and UX teams.',
      'Translated business and marketing requirements into backend- and frontend-ready development tasks; worked closely with backend developers to define APIs, event tracking, and subscription logic.',
      'Prioritized roadmap based on user value & business impact, feasibility & technical constraints, balancing commercial goals with pedagogic mission.',
      'Subscription & billing: deep setup of subscription infrastructure – RevenueCat, App Store Connect, Google Play Console, Stripe.',
      'Web funnel optimization at scale: localization across 8 languages, performance tuning per acquisition channel.',
    ],
  },
  {
    title: 'Performance Marketing Manager (Mobile UA) at Skoove',
    location: 'Berlin',
    period: '2022 – 2023',
    bullets: [
      'Built performance marketing from zero for a subscription-based EdTech (Piano learning) app: all-around campaign management, bidding, and optimization in the pre-AI era: hardcore hands-on work.',
      'Set up and managed paid acquisition across Meta Ads (Facebook, Instagram), Google Ads (Search, Display, YouTube), Apple Search Ads, and TikTok Ads – cross-platform campaigns (Web, iOS, Android) spanning US, UK, Western & Eastern Europe, and Asia (Japan, Korea) across 8 locales.',
      'Capital-efficient test-and-learn phase: scaled monthly ad spend from €0 to €40k; reduced CAC by 80% from initial cold-start to optimized steady-state, achieving profitable paid acquisition with positive ROAS.',
      'Led end-to-end tracking implementation with the engineering team: ad account architecture, Google Tag Manager, Google Analytics (GA4), AppsFlyer for mobile attribution, Facebook Conversions API, and iOS SKAdNetwork (SKAN) setup – navigating Apple and Google\'s evolving privacy restrictions (Ah!).',
      'Collaborated with affiliates, influencers, and Youtubers to produce performance creatives – video ads, user testimonials, and UGC-style assets for top-of-funnel campaigns.',
      'Built cohorted LTV analysis and CAC reporting from scratch using manual spreadsheet modeling, giving the Marketing Director and CEO their first clear view of unit economics per acquisition channel. CSV-driven, VLOOKUP-heavy performance analysis.',
      'Managed ASO strategy using AppTweak, optimizing app store presence alongside paid acquisition to maximize organic discovery and Apple Search Ads.',
      'Onboarded a CRM manager and launched targeted seasonal campaigns that drove +20% YoY increase in new customer subscription revenue.',
      'Identified critical funnel drop-off points and channel entry friction as the true growth constraint, and advocated for product-first investment over incremental ad spend. Was promoted to the Product Owner role to own the commercial solutions to the acquisition bottlenecks I had diagnosed.',
    ],
  },
]

const earlierJobs = [
  { title: 'Senior Performance Marketing Manager at Bonify', location: 'Berlin', period: '2021 – 2022' },
  { title: 'Senior User Acquisition Manager at AliRadar', location: 'Saint Petersburg', period: '2019 – 2021' },
  { title: 'Advertising Account Manager at Yandex', location: 'Saint Petersburg', period: '2016 – 2019' },
]

/* ─── ANIMATED COLLAPSE WRAPPER ─── */
/* Smoothly slides content open/closed by animating max-height.          */
/* The ref measures the actual content height so the animation is exact. */

const Collapse = ({ isOpen, children }) => {
  const contentRef = useRef(null)
  const isFirstRender = useRef(true)
  const [height, setHeight] = useState(isOpen ? 'none' : '0px')

  useEffect(() => {
    /* Skip the animation cycle on initial mount — just show the correct */
    /* state immediately. This prevents a bad scrollHeight measurement   */
    /* before fonts/content have fully laid out (fixes overlap bug).     */
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (isOpen) {
      const h = contentRef.current.scrollHeight
      setHeight(`${h}px`)
      const timer = setTimeout(() => setHeight('none'), 300)
      return () => clearTimeout(timer)
    } else {
      const h = contentRef.current.scrollHeight
      setHeight(`${h}px`)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight('0px'))
      })
    }
  }, [isOpen])

  return (
    <div
      ref={contentRef}
      style={{
        maxHeight: height,
        overflow: height === 'none' ? 'visible' : 'hidden',
        transition: 'max-height 0.3s ease',
      }}
    >
      {children}
    </div>
  )
}

/* ─── EXPERIENCE COMPONENT ─── */

const Experience = () => {
  /* Which job is expanded. 0 = first job open by default. -1 = all closed. */
  const [openIndex, setOpenIndex] = useState(0)

  /* Toggle: click same job = close it, click different = open that one */
  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i)
  }

  return (
    <section>
      {/* Section heading – change the text here to rename the section */}
      <p className="section-label">experience</p>

      {/* Expandable jobs – each has an arrow, title, meta, and bullets */}
      {expandableJobs.map((job, i) => {
        const isOpen = openIndex === i
        return (
          <div className="experience-item" key={job.title}>
            {/* Clickable header row – the whole row is a button for accessibility */}
            <button
              className="experience-header"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              {/* Arrow icon – rotates 90° when open (via CSS class "open") */}
              <svg
                className={`experience-arrow ${isOpen ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Job title – edit the text in expandableJobs array above */}
              <span className="experience-title">{job.title}</span>
              {/* Location and date range */}
              <span className="experience-meta">{job.location} · {job.period}</span>
            </button>

            {/* Animated collapsible bullet list */}
            <Collapse isOpen={isOpen}>
              <ul className="experience-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        )
      })}

      {/* Earlier experience – plain titles, no expand/collapse */}
      <p className="section-label" style={{ marginTop: 48 }}>earlier experience</p>

      {earlierJobs.map((job) => (
        <div className="experience-item experience-item--plain" key={job.title}>
          <span className="experience-title">{job.title}</span>
          <span className="experience-meta">{job.location} · {job.period}</span>
        </div>
      ))}
    </section>
  )
}

export default Experience
