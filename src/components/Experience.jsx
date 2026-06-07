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
      'Hands-on performance marketing / growth marketing for a subscription-based EdTech app.',
      'Optimized paid acquisition across App and Web funnels: Google Ads & Meta Ads.',
      'Identified technical and funnel bottlenecks impacting CPA and LTV.',
      'Improved tracking architecture and data accuracy across web journeys.',
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
  const [height, setHeight] = useState(isOpen ? 'auto' : '0px')

  useEffect(() => {
    if (isOpen) {
      /* Read the real scroll height, set it as max-height to animate to */
      const h = contentRef.current.scrollHeight
      setHeight(`${h}px`)
      /* After the transition ends, switch to 'auto' so the container    */
      /* can adapt if content changes (e.g. window resize)               */
      const timer = setTimeout(() => setHeight('auto'), 300)
      return () => clearTimeout(timer)
    } else {
      /* To animate closed, we first need an explicit pixel value        */
      /* (can't transition from 'auto'). Set current height, then       */
      /* on the next frame set 0 so the browser sees the change.        */
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
        overflow: 'hidden',
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
