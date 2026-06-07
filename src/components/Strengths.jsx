const strengths = [
  'Onboarding, monetization & activation across Web, iOS and Android',
  'Product strategy & roadmapping for SaaS platforms',
  'Discovery, user research & data-driven prioritization',
  'Growth analytics & A/B testing',
  'Cross-functional product ownership, stakeholder management',
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
