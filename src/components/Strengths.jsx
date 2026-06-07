const strengths = [
  'Product strategy & roadmapping for SaaS platforms',
  'Discovery, user research & data-driven prioritization',
  'Onboarding, monetization & activation across Web, iOS and Android',
  'Cross-functional product ownership, stakeholder management',
  'Growth analytics & A/B testing',
]

const Strengths = () => (
  <section>
    <p className="section-label">What I Do</p>
    <ul className="skills-list">
      {strengths.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
)

export default Strengths
