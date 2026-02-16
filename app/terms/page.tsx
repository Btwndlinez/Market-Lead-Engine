export const metadata = {
  title: "Terms of Service | Market Lead Engine",
  description: "Terms of Service for Market Lead Engine - AI-driven lead analysis and revenue leakage detection.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-16 px-4">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Market Lead Engine: Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            By accessing the Market Lead Engine ("The Engine"), you agree to be bound by these terms. 
            This platform provides AI-driven lead analysis and revenue leakage detection.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The Engine is intended for commercial use. You agree not to use the tool for scraping 
            personal data or violating the CAN-SPAM Act.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Accuracy of AI Analysis</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            While our "Symmetrical Bolt" logic provides high-torque analysis, AI results are 
            probabilistic. Market Lead Engine is not liable for sales decisions made based on 
            its projections.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The design, logo (Symmetrical Bolts & Gear), and proprietary qualification algorithms 
            are the property of Market Lead Engine.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <a 
            href="/Market-Lead-Engine" 
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← Back to Market Lead Engine
          </a>
        </div>
      </article>
    </div>
  );
}
