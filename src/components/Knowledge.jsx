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

/* ─── AI IN PRACTICE POSTS ─── */

const posts = [
  {
    title: 'From a Spreadsheet to a Self-Serve Dashboard the Team Actually Uses',
    desc: 'Stakeholders ignored my static analytics tables, so I built a live, shareable dashboard with AI in ~30 minutes. The team now self-serves the numbers – fewer ad-hoc pulls for me, faster decisions for them.',
    tag: 'Data & Analytics',
    content: [
      'I was tired of copying analytics numbers into Confluence tables nobody reads, and the team kept pinging me for figures. The fix: a live, interactive dashboard I built with Claude in about 30 minutes – and stakeholders now self-serve the data instead of asking me.',
      <Flow steps={['Connect data source', 'Query in plain language', 'Build interactive report', 'Export HTML', 'Deploy & share']} />,
      <Step num={1} title="Connect your analytics tool">
        Hook up your data source (Mixpanel, Amplitude, or similar) to Claude via an integration. No SQL knowledge needed – you'll query in plain English.
      </Step>,
      <Step num={2} title="Ask questions, get numbers">
        Talk to your data like you'd talk to an analyst: "show me conversion by device type," "break down activation rates by cohort," "compare this month vs. last." Claude runs the queries and returns real numbers.
      </Step>,
      <Step num={3} title="Generate the interactive report">
        Ask Claude to build a dashboard from your findings. It creates a live artifact with tabs, charts, cross-filters, and insight callouts. Iterate in real time – "switch this to a bar chart," "add a date filter," "highlight the key takeaway."
      </Step>,
      <Step num={4} title="Export as standalone HTML">
        Ask to convert everything into a single HTML file. Zero dependencies – anyone can open it in a browser. No npm, no build tools, no hosting complexity.
      </Step>,
      <Step num={5} title="Deploy in 30 seconds">
        Drag the file onto a free static hosting service. You get a public URL instantly. Share it with stakeholders in Slack and watch them actually engage with the data for once.
      </Step>,
      <Tip>Start with the data queries, not the layout. Get the numbers right first, then worry about making it look good.</Tip>,
    ],
  },
  {
    title: 'De-risking Roadmap Bets: Idea → Stakeholder-Aligned Prototype in a Day',
    desc: 'Instead of debating features in the abstract, I turn design mockups into a clickable prototype with AI in an afternoon – so stakeholders align (or kill the idea) before engineering spends a sprint.',
    tag: 'Prototyping',
    content: [
      'What used to need a developer and a sprint now takes an afternoon of prompting. Claude can read exported design frames and generate a working prototype with real navigation, hover states, and realistic content – enough to align stakeholders, or kill an idea, before engineering commits.',
      <Flow steps={['Export design frames', 'Feed to Claude + brief', 'Iterate by prompting', 'Deploy & share']} />,
      <Step num={1} title="Export your screens">
        Open your design tool and export the relevant frames as PNGs. You don't need the full file – just the screens that matter for the flow you want to prototype.
      </Step>,
      <Step num={2} title="Hand them to Claude with a brief">
        Give Claude the exported images plus a short description: which screens to include, what the user flow should be, what data to populate. Claude builds a working prototype with clickable navigation and realistic content.
      </Step>,
      <Step num={3} title="Iterate at the speed of conversation">
        This is where it gets fun. Keep prompting: "make the cards bigger," "add a search bar," "try a dark theme," "swap the hero image." Each change takes seconds. The feedback loop is absurdly fast compared to traditional prototyping.
      </Step>,
      <Step num={4} title="Deploy and share">
        Rename the output to index.html, drag it onto a free hosting service, and share the link. I've used this to align stakeholders before a single line of production code was written.
      </Step>,
      <Tip>Use the actual design file URL, not a share link – the access keys are different. Also, building the initial base takes a few rounds of back-and-forth, so don't expect perfection on the first prompt.</Tip>,
    ],
  },
]

const Knowledge = () => {
  const [openArticle, setOpenArticle] = useState(null)

  return (
    <section>
      <p className="section-label">AI in my Practice</p>
      <div className="cases-grid">
        {posts.map((p) => (
          <button
            className="case-card"
            key={p.title}
            onClick={() => setOpenArticle(p)}
            aria-label={`Read article: ${p.title}`}
          >
            <p className="case-card-title">{p.title}</p>
            <p className="case-card-desc">{p.desc}</p>
            <span className="case-card-tag">{p.tag}</span>
          </button>
        ))}
      </div>

      {openArticle && (
        <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
      )}
    </section>
  )
}

export default Knowledge
