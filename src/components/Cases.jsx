const cases = [
  {
    title: 'How I Increased User Retention by 40% with One Feature Change',
    desc: 'A deep dive into discovery, experimentation, and the product thinking behind a high-impact retention improvement.',
    tag: 'Product Strategy',
    href: '#',
  },
  {
    title: 'Building an EdTech Platform from Scratch: Lessons Learned',
    desc: 'What I learned launching a learning platform — from user research to product-market fit.',
    tag: 'EdTech',
    href: '#',
  },
  {
    title: 'Product-Led Growth in SaaS: A Practical Playbook',
    desc: 'The frameworks and experiments I used to drive organic growth without a sales team.',
    tag: 'Growth',
    href: '#',
  },
]

const Cases = () => (
  <section>
    <p className="section-label">Cases</p>
    <div className="cases-grid">
      {cases.map((c) => (
        <a href={c.href} className="case-card" key={c.title}>
          <p className="case-card-title">{c.title}</p>
          <p className="case-card-desc">{c.desc}</p>
          <span className="case-card-tag">{c.tag}</span>
        </a>
      ))}
    </div>
  </section>
)

export default Cases
