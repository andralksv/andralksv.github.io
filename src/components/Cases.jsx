import { useState } from 'react'
import ArticleModal from './ArticleModal'

/* ─── HELPER COMPONENTS FOR ARTICLE CONTENT ─── */

const Step = ({ num, title, children }) => (
  <div className="step-block">
    <div className="step-num">{num}</div>
    <div className="step-text">
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  </div>
)

const Flow = ({ steps }) => (
  <div className="flow-diagram">
    {steps.map((s, i) => (
      <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
        <span className="flow-step">{s}</span>
        {i < steps.length - 1 && <span className="flow-arrow">→</span>}
      </span>
    ))}
  </div>
)

const Tip = ({ children }) => (
  <div className="tip-block"><strong>Pro tip: </strong>{children}</div>
)

/* ─── CASE STUDIES DATA ─── */

const cases = [
  {
    title: 'A Cancellation Save-Flow That Recovers ~€200k/Year',
    desc: 'Designed and shipped a web cancellation save-flow from scratch – targeted win-back offers, exit survey, and end-to-end tracking. Churn dropped 15% → 13%, retaining ~€15–18k/month (≈€200k/year).',
    tag: 'Retention & Monetization',
    content: [
      'Price is always the number-one cancellation reason. We confirmed it once we added a cancellation survey, but the data also showed something actionable: many users leaving over cost would stay if offered a short-term discount. The existing cancellation flow was a dead end – click "cancel" and you\'re gone. No recovery attempt, no counter-offer, no feedback loop.',
      'I scoped, designed, and shipped a full cancellation recovery system for the web platform from scratch – recovery offers, conditional logic, survey, and end-to-end Mixpanel tracking.',
      <Flow steps={['Map churn reasons', 'Design recovery offers', 'Build cancellation survey', 'Implement conditional logic', 'Track & measure']} />,
      <Step num={1} title="Identified the levers">
        Analyzed cancellation patterns and user interviews to understand who was leaving and why. Segmented by subscription plan (monthly, quarterly, annual) to figure out which cohorts were recoverable and what offers would resonate.
      </Step>,
      <Step num={2} title="Designed tiered recovery offers">
        Built a recovery page that intercepts the cancellation flow and presents personalized discount offers – 50% off for 3 months or 60% off for 12 months – depending on the user's current plan. Non-eligible users (free trial, already discounted) skip straight to the standard cancellation path.
      </Step>,
      <Step num={3} title="Added a cancellation survey">
        Introduced a structured survey capturing the actual reason for leaving. This data fed back into product and marketing decisions – not just retention metrics.
      </Step>,
      <Step num={4} title="Wired up end-to-end tracking">
        Set up Mixpanel events for every step: offer viewed, offer accepted, offer declined, cancellation completed. This let us measure the true recovery rate and revenue impact without guessing.
      </Step>,
      <Step num={5} title="Measured results">
        Year-over-year web cancellation rate dropped from 15% to 13% – a 2 percentage point improvement. In the first full month, 91 users accepted a recovery offer, generating roughly €15–18k/month in retained revenue – about €200k/year at that run-rate. The flow paid for itself within weeks.
      </Step>,
      <Tip>Don't overthink the offer design – start with simple discounts and iterate. The biggest win is just having a recovery step at all. Most of our impact came from users who simply needed a reason to pause before clicking "confirm."</Tip>,
    ],
  },
  {
    title: 'Two Onboarding Questions That Reshaped Our Paywall & Content',
    desc: 'Added two onboarding questions – "who\'s learning?" and "how old are you?" The segments overturned our audience assumptions (11% were adult-child pairs we\'d been missing) and became the foundation for the personalization work that followed.',
    tag: 'User Research & Personalization',
    content: [
      'We assumed we knew our users. Turns out we were wrong about a big chunk of them. By adding just two screens to the onboarding questionnaire – "Who will be learning?" and "How old are you?" – we learned things that changed how we build the product.',
      <Flow steps={['Add questionnaire screens', 'Collect segment data', 'Analyze cohorts', 'Personalize product & offers']} />,
      <Step num={1} title="Designed the experiment">
        Ran an A/B test with two new onboarding screens. The first asked whether the user is learning for themselves, with a family member, or for someone else. The second captured age brackets. Minimal friction – just two taps.
      </Step>,
      <Step num={2} title="Discovered the real audience split">
        85% of new users planned to learn for themselves, dominated by under-18s (63%). But 11% were signing up for multiple people – and this group turned out to be mostly adults aged 30–54 registering themselves alongside a child aged 3–12.
      </Step>,
      <Step num={3} title="Found unexpected patterns">
        Among kids aged 8–12, 44% also indicated another 8–12-year-old as a family member – likely siblings. Teens aged 13–17 often listed an 8–12-year-old too, suggesting sibling learning. Young adults (18–29) frequently signed up as a pair with a same-age partner.
      </Step>,
      <Step num={4} title="Turned insights into product changes">
        These segments directly informed four downstream initiatives: personalized paywall messaging by cohort, adapted lesson content for different age groups, a redesigned first-lesson experience (Individual Learning Entry), and targeted marketing campaigns by segment.
      </Step>,
      'The questionnaire data became the foundation for nearly every personalization initiative that followed. A two-screen addition turned into the single most valuable piece of user research we had.',
      <Tip>You don't need a survey tool or a research sprint. Two well-placed questions inside your existing onboarding flow can teach you more about your users than months of assumption-driven roadmapping.</Tip>,
    ],
  },
  {
    title: '+37% Trial Starts from a Personalized First Lesson',
    desc: 'Used questionnaire data to personalize the first app experience – level, song choice, and lesson routing. A/B tested on iOS + Android: install-to-trial 3.6% → 4.9% (+37%), trial-to-paid holding steady.',
    tag: 'Conversion Optimization',
    content: [
      'Once we had real segment data from the onboarding questionnaire, the next question was obvious: can we use it to make the first experience feel tailor-made? The hypothesis was simple – if new users see content that matches their skill level and taste from the very first screen, they\'re more likely to start a free trial.',
      <Flow steps={['Questionnaire insights', 'Design personalized entry', 'A/B test across platforms', 'Analyze & roll out']} />,
      <Step num={1} title="Redesigned the entry flow">
        Replaced the generic first-lesson experience with a personalized one. Users now see a skill-level question with clear explanations (not just "Beginner" / "Advanced"), followed by a song selection screen populated with tracks matched to their profile. The first lesson adapts accordingly.
      </Step>,
      <Step num={2} title="Launched the A/B test">
        Ran the experiment simultaneously on iOS and Android for 4 weeks. Primary metric: conversion from install to started free trial. Secondary metric: conversion from free trial to started paid subscription. Guardrail metrics included 7-day retention and cancellation rates.
      </Step>,
      <Step num={3} title="Measured strong results">
        Install-to-free-trial conversion improved from a 3.6% baseline to 4.9% – a +37% relative uplift that justified a full rollout. Trial-to-paid conversion held steady, meaning we weren't just attracting lower-intent users. Recommended rolling out to 100% of traffic immediately.
      </Step>,
      <Step num={4} title="Extracted lasting learnings">
        Discovered that pinning a high-converting song at the top of the selection list directly influences user choice – keep your best-performing content front and center. Also learned that "No preference" users mostly exit to the home screen, suggesting they need a different nudge entirely.
      </Step>,
      <Tip>Personalization doesn't have to mean machine learning. Simple conditional logic based on a few onboarding answers can dramatically outperform a one-size-fits-all experience. Start with the data you already have.</Tip>,
    ],
  },
]

const Cases = () => {
  const [openArticle, setOpenArticle] = useState(null)

  return (
    <section>
      <p className="section-label">Cases</p>
      <div className="cases-grid">
        {cases.map((c) => (
          <button
            className="case-card"
            key={c.title}
            onClick={() => setOpenArticle(c)}
            aria-label={`Read case study: ${c.title}`}
          >
            <p className="case-card-title">{c.title}</p>
            <p className="case-card-desc">{c.desc}</p>
            <span className="case-card-tag">{c.tag}</span>
          </button>
        ))}
      </div>

      {openArticle && (
        <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
      )}
    </section>
  )
}

export default Cases
