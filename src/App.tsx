import { useState, useRef, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES_SHOWCASE = [
  {
    title: 'Physiological Analysis',
    description: 'Analyse heart rate, HRV, recovery, and other physiological markers across your training history to understand your body and train smarter.',
    images: [
      { src: '/cd_new.jpg', alt: 'Scatter plot of heart rate decay after work intervals with a polynomial trend line and R² of 0.932' },
    ],
  },
  {
    title: 'Scientific Testing',
    description: 'Purpose-built tools for sports scientists to import, visualise, and analyse data from laboratory and field tests. No spreadsheets required.',
    images: [
      { src: '/pr_running.jpg', alt: 'Personal records table for running distances from 1500m to marathon' },
    ],
  },
];

const FEATURES_GRID = [
  {
    title: 'Workout Logging',
    description: 'Log every session with full detail — sets, reps, distance, pace, heart rate, RPE, and more. Interval-level data included.',
  },
  {
    title: 'Training Planning',
    description: 'Build structured training plans across macrocycles and mesocycles tailored to your goals and periodisation model.',
  },
  {
    title: 'Coaching',
    description: 'Coaches manage athletes, plan workouts and training programmes on their behalf, and track progress within a shared coach-athlete workspace.',
  },
  {
    title: 'Device Sync',
    description: 'Designed to sync with all major platforms including Garmin, Polar, Coros, Suunto, and Apple Health. Activity data can currently be imported via .fit file. Your device will never limit your training.',
  },
];

type ShowcaseImage = { src: string; alt: string };

function ImagePanel({ images, idx }: { images: ShowcaseImage[]; idx: number }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative aspect-square w-full max-w-[400px] overflow-hidden">
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`${images.length > 1 ? 'absolute inset-0' : ''} w-full h-full object-contain transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ feature, imageLeft }: { feature: { title: string; description: string; images: ShowcaseImage[] }; imageLeft: boolean }) {
  const panel = <ImagePanel images={feature.images} idx={0} />;
  const text = (
    <div className="md:w-1/2 p-8 flex flex-col justify-center">
      <h3 className="text-gray-900 font-semibold text-lg mb-3">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
      {imageLeft ? <><div className="md:w-1/2">{panel}</div>{text}</> : <>{text}<div className="md:w-1/2 order-first md:order-last">{panel}</div></>}
    </div>
  );
}

function ScrollFeatureCard({ feature, imageLeft }: { feature: { title: string; description: string; images: ShowcaseImage[] }; imageLeft: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollable);
      setIdx(Math.min(feature.images.length - 1, Math.floor(progress * feature.images.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [feature.images.length]);

  const panel = <ImagePanel images={feature.images} idx={idx} />;
  const text = (
    <div className="md:w-1/2 p-8 flex flex-col justify-center">
      <h3 className="text-gray-900 font-semibold text-lg mb-3">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
      <div className="flex gap-2 mt-5">
        {feature.images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === idx ? 'bg-gray-900' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} style={{ height: `${feature.images.length * 100}vh` }}>
      <div className="sticky top-16 flex items-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="w-full bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {imageLeft ? <><div className="md:w-1/2">{panel}</div>{text}</> : <>{text}<div className="md:w-1/2 order-first md:order-last">{panel}</div></>}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm('xvzvwvqv');
  if (state.succeeded) {
    return (
      <p className="text-gray-500 text-sm">Thanks for reaching out — we'll get back to you soon.</p>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
        />
        <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your message"
          className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400 resize-none"
        />
        <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="self-center bg-gray-900 text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        Send message
      </button>
    </form>
  );
}

function EarlyAccessForm() {
  const [state, handleSubmit] = useForm('xvzvwvqv');
  if (state.succeeded) {
    return (
      <p className="text-white/90 text-sm bg-white/20 px-5 py-2.5 rounded-full inline-block">
        You're on the list — we'll be in touch.
      </p>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-900 bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <ValidationError field="email" errors={state.errors} className="text-red-300 text-xs" />
      <button
        type="submit"
        disabled={state.submitting}
        className="bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        Request early access
      </button>
    </form>
  );
}

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
            Because every session should count.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            A scientific training platform for beginner to advanced athletes, coaches, and sports scientists. Log workouts, plan training, analyse physiology, and collaborate — all in one place.
          </p>
          <p className="text-white/60 text-xs mb-4 uppercase tracking-widest">Coming 2026</p>
          <EarlyAccessForm />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">

          {/* What is kämpa */}
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is kämpa?</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              <em>Kämpa</em> (say it like: shem-pa) is a Swedish verb. It means to fight, to strive, to push through — to keep going when it gets hard. It is the word Swedish coaches shout from the sideline. It is what athletes say to each other in the final metres of a race. It carries effort, resilience, and purpose in a single syllable.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              That is exactly what this platform is built around. kämpa is a scientific training platform for athletes, coaches, and sports scientists who want to take their training seriously. It brings together workout logging, physiological analysis, training planning, and coach-athlete collaboration — grounded in data, built for you.
            </p>
          </div>

          {/* Showcase features */}
          <div className="flex flex-col gap-6 mb-6">
            {FEATURES_SHOWCASE.map((f, i) =>
              f.images.length > 1
                ? <ScrollFeatureCard key={f.title} feature={f} imageLeft={i % 2 === 0} />
                : <FeatureCard key={f.title} feature={f} imageLeft={i % 2 === 0} />
            )}
          </div>

          {/* Supporting features */}
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES_GRID.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">About kämpa</h2>
          <p className="text-gray-500 text-sm leading-relaxed text-center max-w-2xl mx-auto mb-16">
            kämpa is built by athletes, for athletes. We are a small team based in Lund, Sweden, with backgrounds spanning competitive sport, bioengineering, ecosystem science, and geography.
          </p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Steven */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <img src="/steven1.png" alt="Steven Black" className="w-12 h-12 rounded-full object-cover mb-4" />
              <h3 className="text-gray-900 font-semibold text-base mb-1">Steven Black</h3>
              <p className="text-xs text-gray-400 mb-4">Co-founder</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Competed as a footballer at sub-elite level and finished in the top 15 at the Skåne Frozen trail 60 km race. Holds a Bachelor's degree in Human Geography from the University of Gothenburg, Sweden, and a Master's degree in Physical Geography and Ecosystem Science from Lund University, Sweden, with university-level education in training and match analysis in team sports.
              </p>
            </div>

            {/* Hugues */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <img src="/hugues1.png" alt="Hugues de Roissart" className="w-12 h-12 rounded-full object-cover mb-4" />
              <h3 className="text-gray-900 font-semibold text-base mb-1">Hugues de Roissart</h3>
              <p className="text-xs text-gray-400 mb-4">Co-founder</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Competes in powerlifting in the IPF and is a national level referee in Belgium. Holds a Bachelor's degree in Bioengineering Sciences and a Master's degree in Bioengineering (Agronomic Sciences, Sustainability Engineering) from UCLouvain, Belgium, and a Master's degree in Physical Geography and Ecosystem Science from Lund University, Sweden.
              </p>
            </div>

            {/* Inès */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <img src="/ines1.png" alt="Inès Gonthier" className="w-12 h-12 rounded-full object-cover mb-4" />
              <h3 className="text-gray-900 font-semibold text-base mb-1">Inès Gonthier</h3>
              <p className="text-xs text-gray-400 mb-4">Creative Project Manager</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Background in competitive swimming and fitness. Holds a Bachelor's degree in Anthropology with a specialisation in visual arts and photography from the University of Lyon, France.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
          <p className="text-xs text-gray-400 mb-8">Effective: April 2026 &nbsp;·&nbsp; Last updated: April 2026</p>

          {/* TL;DR */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10">
            <h3 className="text-gray-900 font-semibold text-sm mb-3">Summary</h3>
            <ul className="space-y-1.5 text-sm text-gray-500">
              <li>· Your data is used only to run kämpa. We do not sell it or use it for advertising.</li>
              <li>· You control what you share with coaches. You can revoke access at any time.</li>
              <li>· Device integrations are opt-in. You can disconnect them at any time.</li>
              <li>· You can export or delete your account and all your data at any time.</li>
              <li>· We do not use tracking pixels, third-party analytics, or advertising cookies.</li>
              <li>· Video analysis runs entirely on your device. No video data ever leaves it.</li>
            </ul>
          </div>

          <div className="space-y-8 text-gray-500 text-sm leading-relaxed">
            <p>
              kämpa is currently in development and not yet available to the public. This policy describes how we intend to handle user data upon launch. We are committed to being transparent about our approach from the start.
            </p>

            {/* 1 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">1. Data we collect</h3>
              <p className="mb-3">We only collect data that is necessary to provide the service.</p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Account data</p>
                  <p>Your email address and a hashed copy of your password. We never store your password in plain text — it is processed using bcrypt before being saved.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Training and workout data</p>
                  <p>Sessions you log manually or import, including sport type, date, duration, distance, pace, power output, sets, reps, weight, RPE (perceived effort), and any notes you add. Interval-level data such as per-interval heart rate, ascent/descent, and rest periods are also stored when available.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Physiological data</p>
                  <p>Heart rate (average, maximum, and resting), HRV (heart rate variability), heart rate zone configurations, sleep duration and quality ratings, body weight logs, and daily step counts — when you choose to record or import these.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Fitness assessments and performance benchmarks</p>
                  <p>Results from assessments you complete or log, such as FTP tests, lactate threshold tests, time trials, maximum heart rate tests, and strength rep maxes.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Training plans and goals</p>
                  <p>Plans you create, including macrocycle and mesocycle structure, scheduled workouts, training blocks, and goal targets.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">GPS and route data</p>
                  <p>GPS coordinates embedded in activity files you explicitly import (for example, .fit files from a GPS device). These are stored and used to display your route map within kämpa.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Profile photograph</p>
                  <p>If you choose to upload one.</p>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">2. What we do not collect</h3>
              <ul className="space-y-1.5 pl-4">
                <li>· We do not use advertising cookies, tracking pixels, or third-party analytics scripts.</li>
                <li>· We do not collect location data beyond what is embedded in activity files you explicitly import.</li>
                <li>· We do not build behavioural profiles or sell data to data brokers.</li>
                <li>· We do not use your data to train external AI models.</li>
                <li>· We do not collect or transmit video. The video analysis feature (pose detection) runs entirely on your device using its local processing capabilities. No video frames, pose data, or keypoints are sent to our servers or any third party.</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">3. Third-party infrastructure</h3>
              <p className="mb-4">To operate kämpa, we use the following third-party services. Each receives only the data necessary for its specific function.</p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Neon (database hosting)</p>
                  <p>All account, health, and training data is stored in a PostgreSQL database hosted by Neon on Microsoft Azure infrastructure (West Europe). All connections are encrypted in transit using TLS. Neon's privacy policy applies to their handling of infrastructure-level data.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Cloudinary (profile photos)</p>
                  <p>If you upload a profile photograph, it is stored on Cloudinary's content delivery network. Only your image is transmitted — no other personal data is sent to Cloudinary.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Mapbox (route maps)</p>
                  <p>When you view a workout route map, your GPS coordinates are sent from the app to Mapbox's servers to render the map. Mapbox may also observe your IP address as part of this request. Mapbox's privacy policy governs their handling of this data. If you do not use the route map view, no data is sent to Mapbox.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">TensorFlow / Google (pose detection model)</p>
                  <p>When you first use the video analysis feature, the app downloads the MoveNet pose detection model from Google's TensorFlow Hub. The model is cached locally on your device and is re-downloaded only if you reinstall the app or use a new device. No video or personal data is transmitted at any point. All pose detection processing runs entirely on your device.</p>
                </div>
              </div>
              <p className="mt-4">No analytics, advertising, crash reporting, or user-tracking services are used anywhere in kämpa.</p>
            </div>

            {/* 4 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">4. Third-party device integrations</h3>
              <p className="mb-3">
                kämpa is designed to be device-agnostic. We plan to integrate with Garmin Connect, Polar, Coros, Suunto, and Apple Health so that your choice of hardware never limits your training. Currently, activity data can be imported by uploading .fit files directly — these are parsed locally on your device and no data is sent to the device manufacturer.
              </p>
              <p className="mb-3">For all supported platforms — including Garmin Connect, Polar, Coros, Suunto, and Apple Health — kämpa will request access to the same categories of data: activities (including GPS tracks, heart rate, pace, power, and interval data), daily summaries (steps, calories, active minutes), sleep data, and health snapshots (resting heart rate, HRV, stress scores). Only the data types necessary to provide the features you use will be requested.</p>
              <p className="mb-3">When platform integrations are introduced:</p>
              <ul className="space-y-1.5 pl-4">
                <li>· <strong className="text-gray-700">Opt-in only.</strong> No integration is connected without your explicit authorisation. You will be shown exactly what data kämpa is requesting access to before you grant it.</li>
                <li>· <strong className="text-gray-700">Stored on our servers.</strong> Synced activity data is stored by kämpa so that it remains available within the platform independently of the source device or service.</li>
                <li>· <strong className="text-gray-700">Revocable at any time.</strong> You can disconnect any integration from your account settings. Upon disconnection, we will immediately stop syncing new data from that service. Data already synced from that service will be retained as part of your kämpa account unless you separately request its deletion. You can request deletion of all data originating from a specific integration by contacting us at <a href="mailto:contact@kämpa.com" className="text-gray-700 underline underline-offset-2">contact@kämpa.com</a> — we will process such requests within 30 days.</li>
                <li>· <strong className="text-gray-700">Third-party policies apply.</strong> When you connect a service, you are also subject to that platform's own privacy policy. We are not responsible for how third-party services handle data on their end.</li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">5. Coach-athlete data sharing</h3>
              <p className="mb-3">
                Athletes can choose to share their data with a coach inside kämpa. This sharing is always initiated and controlled by the athlete.
              </p>
              <ul className="space-y-1.5 pl-4">
                <li>· Coaches only see the data an athlete has explicitly granted them access to — nothing more.</li>
                <li>· Athletes can revoke coach access at any time from their account settings. Upon revocation, the coach immediately loses visibility of that data.</li>
                <li>· Coaches cannot export or download raw athlete data outside of kämpa.</li>
                <li>· When a coach-athlete relationship ends, no residual access to the athlete's data is retained by the coach.</li>
                <li>· No user has access to another user's data without their explicit consent.</li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">6. How we use your data</h3>
              <p className="mb-3">Your data is used only to:</p>
              <ul className="space-y-1.5 pl-4">
                <li>· Provide and operate the kämpa service.</li>
                <li>· Improve the platform (for example, to fix bugs or optimise features) using aggregated, anonymised insights.</li>
                <li>· Send you transactional communications such as account confirmations and security alerts.</li>
              </ul>
              <p className="mt-3">We will never use your data for advertising, sell it to third parties, or share it with any party outside kämpa except as described in this policy.</p>
            </div>

            {/* 7 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">7. Data security</h3>
              <ul className="space-y-1.5 pl-4">
                <li>· Passwords are hashed using bcrypt before storage. Plain-text passwords are never written to disk.</li>
                <li>· Data in transit is encrypted using TLS for all connections between your device, our servers, and our database provider.</li>
                <li>· Data at rest is encrypted by our database host (Neon/Azure) at the infrastructure level.</li>
                <li>· Sessions are managed using short-lived tokens (1-hour expiry). You are signed out automatically when your session expires.</li>
                <li>· Access controls are enforced server-side. Every data request is verified against your account — you can only read or modify your own data.</li>
                <li>· Access to production data is restricted to authorised personnel only.</li>
                <li>· In the event of a data breach affecting your personal data, we will notify you and any applicable regulatory authority as required by law.</li>
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">8. Your rights</h3>
              <p className="mb-3">Regardless of where you are located, you have the right to:</p>
              <ul className="space-y-1.5 pl-4">
                <li>· <strong className="text-gray-700">Access</strong> — request a copy of the personal data we hold about you.</li>
                <li>· <strong className="text-gray-700">Export</strong> — download your workout and training data in a portable format.</li>
                <li>· <strong className="text-gray-700">Correction</strong> — request that inaccurate data be corrected.</li>
                <li>· <strong className="text-gray-700">Deletion</strong> — delete your account and all associated data at any time. Personal data is retained for as long as your account is active. We will remove your personal data within 30 days of a verified deletion request. Anonymised aggregate statistics that cannot be linked back to you may be retained after deletion.</li>
                <li>· <strong className="text-gray-700">Objection</strong> — object to any processing of your data that you did not explicitly consent to.</li>
              </ul>
              <p className="mt-3">
                If you are located in the European Economic Area, United Kingdom, or Switzerland, you have additional rights under the GDPR and equivalent legislation, including the right to lodge a complaint with your local data protection authority. Where GDPR applies, we process your data on the basis of contractual necessity — you provided your data to use kämpa, and we need it to provide the service.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">9. Changes to this policy</h3>
              <p>
                We may update this policy as kämpa develops. If we make material changes, we will notify registered users by email and display a notice in the app at least 14 days before the changes take effect. Continued use of kämpa after that date constitutes acceptance of the revised policy. The effective date at the top of this page will always reflect the current version.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">10. Contact</h3>
              <p>
                For privacy-related questions, data requests, or to exercise any of your rights, contact us at <a href="mailto:contact@kämpa.com" className="text-gray-700 underline underline-offset-2">contact@kämpa.com</a>. We aim to respond within 5 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Service */}
      <section id="terms" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h2>
          <p className="text-xs text-gray-400 mb-8">Effective: April 2026 &nbsp;·&nbsp; Last updated: April 2026</p>

          <div className="space-y-8 text-gray-500 text-sm leading-relaxed">
            <p>
              These Terms of Service ("Terms") govern your access to and use of kämpa ("the Service"), operated by the kämpa founding team, an independent venture based in Lund, Sweden, currently in its founding phase ahead of formal incorporation ("kämpa", "we", "us", or "our"). By creating an account or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
            </p>

            {/* 1 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">1. The Service</h3>
              <p className="mb-3">
                kämpa is a scientific training platform that allows athletes, coaches, and sports scientists to log workouts, plan training, analyse physiological data, and collaborate. The Service is currently in development and not yet publicly available. These Terms will apply upon launch and to any beta or early access period that precedes it.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with reasonable notice where practicable.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">2. Eligibility</h3>
              <p>
                You must be at least 16 years of age to use kämpa. By creating an account, you confirm that you meet this requirement. If you are under 18, you confirm that you have the consent of a parent or legal guardian.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">3. Your account</h3>
              <ul className="space-y-1.5 pl-4">
                <li>· You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.</li>
                <li>· You must provide accurate information when registering and keep it up to date.</li>
                <li>· You may not share your account with others or create accounts on behalf of third parties without their consent.</li>
                <li>· You must notify us promptly if you believe your account has been compromised.</li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">4. Acceptable use</h3>
              <p className="mb-3">You agree not to use the Service to:</p>
              <ul className="space-y-1.5 pl-4">
                <li>· Violate any applicable law or regulation.</li>
                <li>· Upload, transmit, or distribute content that is unlawful, harmful, or infringes the rights of others.</li>
                <li>· Attempt to gain unauthorised access to any part of the Service or another user's account or data.</li>
                <li>· Reverse engineer, decompile, or otherwise attempt to extract the source code of the Service.</li>
                <li>· Use the Service in any way that could damage, overburden, or impair its infrastructure.</li>
                <li>· Scrape, harvest, or systematically extract data from the Service without our written permission.</li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">5. Your data and content</h3>
              <p className="mb-3">
                You retain ownership of all data and content you upload or create within kämpa, including workout logs, training plans, and imported activity files. By using the Service, you grant kämpa a limited, non-exclusive licence to store, process, and display your content solely for the purpose of providing the Service to you.
              </p>
              <p>
                We do not claim ownership of your data. How we handle your data is described in our <a href="#privacy" className="text-gray-700 underline underline-offset-2">Privacy Policy</a>, which forms part of these Terms.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">6. Third-party integrations</h3>
              <p className="mb-3">
                kämpa is designed to integrate with third-party platforms such as Garmin Connect, Polar, Coros, Suunto, and Apple Health. These integrations are planned and will be introduced progressively after launch. Currently, activity data can be imported by uploading .fit files directly.
              </p>
              <p>
                When third-party integrations become available, your use of them will be subject to the respective platform's own terms and privacy policies. kämpa is not responsible for the availability, accuracy, or practices of third-party services. Connecting a third-party account will always be opt-in and can be revoked at any time from your account settings.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">7. Intellectual property</h3>
              <p>
                The kämpa name, logo, design, and all software, features, and content created by kämpa are the intellectual property of kämpa and its founders. Nothing in these Terms transfers any intellectual property rights to you. You may not reproduce, distribute, or create derivative works from kämpa's intellectual property without written permission.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">8. Disclaimers</h3>
              <p className="mb-3">
                kämpa is provided for informational and training-support purposes only. Nothing within the Service constitutes medical advice, diagnosis, or treatment. Always consult a qualified medical or sports medicine professional before making significant changes to your training, especially if you have a health condition or injury.
              </p>
              <p>
                The Service is provided "as is" and "as available". While we work to maintain a reliable and accurate service, we make no warranties — express or implied — regarding the completeness, accuracy, or uninterrupted availability of the Service.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">9. Limitation of liability</h3>
              <p>
                To the fullest extent permitted by applicable law, kämpa and its founders shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service. Our total liability for any claim arising under these Terms shall not exceed the amount you paid us, if any, in the 12 months preceding the claim.
              </p>
              <p className="mt-3">
                Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under Swedish or applicable EU law.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">10. Termination</h3>
              <p className="mb-3">
                You may close your account at any time from your account settings. Upon closure, we will delete your personal data in accordance with our Privacy Policy.
              </p>
              <p>
                We reserve the right to suspend or terminate your access to the Service if you materially breach these Terms, with notice where reasonably practicable. In the event of termination, you retain the right to export your data for 30 days following the termination notice unless the breach involved unlawful conduct.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">11. Governing law and disputes</h3>
              <p className="mb-3">
                These Terms are governed by the laws of Sweden. Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the Swedish courts, without prejudice to any mandatory consumer protection rights you may hold under the law of your country of residence.
              </p>
              <p>
                If you are a consumer located in the European Union, you may also refer a dispute to the EU Online Dispute Resolution platform or to the Swedish National Board for Consumer Disputes (Allmänna reklamationsnämnden, ARN).
              </p>
            </div>

            {/* 12 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">12. Changes to these Terms</h3>
              <p>
                We may update these Terms as kämpa develops. If we make material changes, we will notify registered users by email and display a notice in the app at least 14 days before the changes take effect. Continued use of the Service after that date constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-3">13. Contact</h3>
              <p>
                For questions about these Terms, contact us at <a href="mailto:contact@kämpa.com" className="text-gray-700 underline underline-offset-2">contact@kämpa.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in touch</h2>
          <p className="text-gray-500 mb-10">Interested in early access or have a question? Reach out.</p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} kämpa. All rights reserved.
      </footer>

    </div>
  );
}
