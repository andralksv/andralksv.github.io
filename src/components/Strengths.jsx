const strengths = [
  'Scaling user onboarding, activation & monetization across Web, iOS and Android',
  'E2E product strategy & roadmapping for SaaS platforms. Agile-mindset.',
  'Continious Discovery, user research & data-driven prioritization with strong advocacy for users',
  'Growth analytics, A/B experimentation & conversion funnel optimization',
  'Cross-functional product ownership & stakeholder alignment from ideation to launch',
  'Performance marketing expertise driving product-led growth (PLG)',
]

const Strengths = () => (
  <section>
    <p className="section-label">what I do</p>
    <ul className="strengths-list">
      {strengths.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
)

export default Strengths
