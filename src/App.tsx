import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES = [
  {
    title: 'Workout Logging',
    description: 'Log every session with full detail including sets, reps, distance, pace, heart rate, and more.',
  },
  {
    title: 'Training Planning',
    description: 'Build structured training plans across macrocycles and mesocycles tailored to your goals.',
  },
  {
    title: 'Physiological Analysis',
    description: 'Analyse heart rate, recovery, HRV, and other physiological markers to understand your body and train smarter.',
  },
  {
    title: 'Scientific Testing',
    description: 'Purpose-built tools for sports scientists to import, visualise, and analyse data from laboratory and field tests. No spreadsheets required.',
  },
  {
    title: 'Coaching',
    description: 'Coaches will be able to manage athletes, plan workouts and training programmes on their behalf, and track progress within a shared coach-athlete workspace.',
  },
  {
    title: 'Device Sync',
    description: 'Automatic activity sync from all major platforms including Garmin, Polar, Coros, Suunto, and Apple Health. Your device will never limit your training.',
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg tracking-tight">kämpa</span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-900"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-gray-500 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen px-6 text-center bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.jpeg')" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Train with purpose.<br />Recover with data.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            A scientific training platform for athletes, coaches, and sports scientists. Log workouts, plan training, analyse physiology, and collaborate, all in one place.
          </p>
          <span className="inline-block bg-white/20 text-white text-sm px-5 py-2.5 rounded-full">
            Coming 2026
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What kämpa will do</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h2>
          <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
            <p>
              <strong className="text-gray-700">Last updated: March 2026</strong>
            </p>
            <p>
              kämpa is currently in development and not yet available to the public. This policy describes how we intend to handle user data upon launch. We are committed to being transparent about our approach from the start.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">Data we will collect</h3>
            <p>
              When kämpa launches, we will collect data you provide directly, such as account credentials and workout data, as well as data synced from connected services such as Garmin Connect, with your explicit authorisation.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">How we will use your data</h3>
            <p>
              Your data will be used solely to provide and improve the kämpa service. We will not sell your data to third parties, and we will not use it for advertising purposes.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">Third-party services</h3>
            <p>
              kämpa is designed to be device-agnostic. We plan to integrate with all major wearable and fitness platforms including Garmin Connect, Polar, Coros, Suunto, and Apple Health, so that users are never limited by the device they own. When you connect a third-party account, you will be authorising kämpa to access your activity data in accordance with that platform's own privacy policy.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">Data sharing within kämpa</h3>
            <p>
              kämpa will support coach-athlete relationships where athletes can choose to share their data with a coach. This sharing will always be initiated and controlled by the athlete. Coaches will only see the data the athlete has explicitly granted them access to. No user will have access to another user's data without their consent.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">Data retention</h3>
            <p>
              You will be able to delete your account and all associated data at any time. We will remove your data within 30 days of a deletion request.
            </p>
            <h3 className="text-gray-700 font-semibold text-base pt-2">Contact</h3>
            <p>
              For privacy-related questions, contact us at the address below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in touch</h2>
          <p className="text-gray-500 mb-6">Interested in early access or have a question? Reach out.</p>
          <a
            href="mailto:contact@xn--kmpa-eoa.com"
            className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            contact@kämpa.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} kämpa. All rights reserved.
      </footer>

    </div>
  );
}
