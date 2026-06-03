export default function FAQ() {
  const faqs = [
    {
      q: "What is this?",
      a: "A research prototype to learn what bot developers actually need for analytics. Right now it shows what's possible - your feedback shapes what gets built."
    },
    {
      q: "What platforms does it support?",
      a: "Currently designed for Discord and Telegram bots. If you need analytics for other platforms (Slack, WhatsApp, etc.), let me know what you need."
    },
    {
      q: "What metrics does it track?",
      a: "That's what I'm researching! Current prototype shows basic metrics - but I need to know what ONE metric would be most valuable to you. Your feedback will define the feature set."
    },
    {
      q: "Is this a production tool?",
      a: "Not yet. This is a prototype to validate what bot developers actually need. Once I understand the requirements, I'll build the real production version."
    },
    {
      q: "Why build this?",
      a: "Existing bot analytics tools are either too complex (enterprise dashboards) or too simple (just command counts). I want to build something focused on the metrics that actually matter for bot growth and health."
    },
    {
      q: "How can I give feedback?",
      a: "Perfect! That's exactly why this exists. Tell me: what ONE metric would help you grow your bot? What's your biggest pain point with existing analytics? Find me on GitHub or leave a comment on the research posts."
    },
    {
      q: "Will this be free?",
      a: "Planning to keep it accessible for indie developers. Might have tiered pricing (free for small bots, paid for larger operations), but the priority is making it useful first."
    },
    {
      q: "What's the timeline?",
      a: "Research phase is now (getting feedback like yours). Once I understand the requirements, building the real version takes 4-6 weeks. Follow the GitHub repo for updates."
    },
    {
      q: "Can I beta test?",
      a: "Yes! If you're actively developing a bot and have opinions on what analytics you need, you're exactly who I want to talk to. Reach out on GitHub or the research posts."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Bot Analytics Research - Your Questions Answered
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to shape this product? Share what metrics matter to you.
          </p>
          <a
            href="https://github.com/eylulsenakumral/bot-analytics-dashboard/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Give Feedback on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
