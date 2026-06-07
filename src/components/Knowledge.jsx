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

/* ─── AI KNOWLEDGE POSTS ─── */

const posts = [
  {
    title: 'Raw Data → Live Dashboard in 30 Minutes',
    desc: 'Ditch the static spreadsheet. Build a shareable, interactive dashboard with AI – no code, no dev time, no excuses.',
    tag: 'Data & Analytics',
    content: [
      'I got tired of copying analytics numbers into Confluence tables that nobody reads. So I tried a different approach: building a fully interactive dashboard with an AI assistant. It took 30 minutes and the result was dramatically better than any static report.',
      <Flow steps={['Connect data source', 'Query in plain language', 'Build interactive report', 'Export HTML', 'Deploy & share']} />,
      <Step num={1} title="Connect your analytics tool">
        Hook up your data source (Mixpanel, Amplitude, or similar) to the AI assistant via an integration. No SQL knowledge needed – you'll query in plain English.
      </Step>,
      <Step num={2} title="Ask questions, get numbers">
        Talk to your data like you'd talk to an analyst: "show me conversion by device type," "break down activation rates by cohort," "compare this month vs. last." The AI runs the queries and returns real numbers.
      </Step>,
      <Step num={3} title="Generate the interactive report">
        Ask the AI to build a dashboard from your findings. It creates a live artifact with tabs, charts, cross-filters, and insight callouts. Iterate in real time – "switch this to a bar chart," "add a date filter," "highlight the key takeaway."
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
    title: 'Ship a Clickable Prototype Before Lunch',
    desc: 'Turn static design mockups into a working, shareable prototype using AI – no front-end skills required.',
    tag: 'Prototyping',
    content: [
      'What used to require a developer and a sprint of work now takes an afternoon of prompting. AI assistants can read exported design frames and generate working prototypes with real navigation, hover states, and realistic content.',
      <Flow steps={['Export design frames', 'Feed to AI + brief', 'Iterate by prompting', 'Deploy & share']} />,
      <Step num={1} title="Export your screens">
        Open your design tool and export the relevant frames as PNGs. You don't need the full file – just the screens that matter for the flow you want to prototype.
      </Step>,
      <Step num={2} title="Hand them to the AI with a brief">
        Give the AI the exported images plus a short description: which screens to include, what the user flow should be, what data to populate. The AI builds a working prototype with clickable navigation and realistic content.
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
  {
    title: 'The Slide Tool That Cut My Deck Time in Half',
    desc: 'I stopped fighting with alignment and font sizes. Here\'s the presentation workflow that actually lets me focus on the story.',
    tag: 'Productivity',
    content: [
      'I spent years nudging text boxes in legacy slide tools. Then I switched to a modern AI-powered presentation tool, and the time I spend on decks dropped by roughly 50%. The quality went up. Here\'s the workflow.',
      <Flow steps={['Pick a template', 'Build with slash commands', 'Focus on the story', 'Ship it']} />,
      <Step num={1} title="Start from a template, not a blank slide">
        Create a new document and pick a template that matches your content type. For business presentations, stick with traditional layouts – experimental formats look great but behave unpredictably across screen sizes.
      </Step>,
      <Step num={2} title="Use slash commands instead of menus">
        Type "/" to open a command menu with structured elements: boxes, timelines, tables, calendars. It's dramatically faster than hunting through ribbon menus or right-click options. This single feature changed how I build slides.
      </Step>,
      <Step num={3} title="Focus on narrative, not visual polish">
        The tool handles alignment, spacing, and typography automatically. You focus on what actually matters: the story you're telling. Every minute you used to spend adjusting font sizes is now spent on making your argument stronger.
      </Step>,
      <Tip>The "/box" command is a game-changer for highlighting key takeaways. And "Add from template" when creating new slides gives you clean, professional starting points every time.</Tip>,
      'The result: consistently polished decks, produced faster, with more of my energy going into the content rather than the container.',
    ],
  },
]

const Knowledge = () => {
  const [openArticle, setOpenArticle] = useState(null)

  return (
    <section>
      <p className="section-label">AI Knowledge</p>
      <div className="cases-grid">
        {posts.map((p) => (
          <button
            className="case-card"
            key={p.title}
            onClick={() => setOpenArticle(p)}
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
