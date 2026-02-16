export const metadata = {
  title: "Privacy Policy | Market Lead Engine",
  description: "Privacy Policy for Market Lead Engine - Your data is secure and never sold.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-16 px-4">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Market Lead Engine: Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We collect lead data provided by you or your CRM to perform analysis. This data is 
            processed via secure API calls.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            In line with our stealth-to-live transition, all data is encrypted. We utilize 
            industry-standard protocols (SSL/TLS) to ensure your revenue data never leaks.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. No Sale of Data</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We are an engine, not a broker. We do not sell, rent, or trade your lead data 
            to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookie Policy</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use minimal cookies to remember your system theme preferences (Auto-Night Mode) 
            and session state.
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
