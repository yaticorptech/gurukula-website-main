import { useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import logoImg from "../images/logo.png";

function UiIcon({ name, className = "w-6 h-6 text-blue-600" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
    bolt: <path d="M13.5 3.5 7 12h5l-1.5 8.5L17 12h-5z" />,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" /></>,
    monitor: <><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M9 19h6M12 16v3" /></>,
    briefcase: <><rect x="4" y="7" width="16" height="11" rx="2" /><path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1M4 11h16" /></>,
    badge: <><circle cx="12" cy="10" r="5.5" /><path d="m9.2 14.8-1.3 5 4.1-2.1 4.1 2.1-1.3-5" /></>,
    users: <><circle cx="9" cy="9" r="2.7" /><circle cx="15.5" cy="8.3" r="2.2" /><path d="M4.8 18a4.6 4.6 0 0 1 8.4 0M13 17.6a3.8 3.8 0 0 1 6.2 0" /></>,
    coin: <><circle cx="12" cy="12" r="7.5" /><path d="M14.6 9.6a2.5 2.5 0 0 0-2.5-1.5c-1.6 0-2.8.8-2.8 2s1 1.7 2.7 2l.8.1c1.4.2 2.2.7 2.2 1.8 0 1.3-1.2 2.1-2.9 2.1a3.5 3.5 0 0 1-3-1.4M12 7.2v9.6" /></>,
    growth: <><path d="M5 14l5-5 4 4 5-5" /><path d="M14 4h5v5" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} {...p}>{icons[name] ?? null}</svg>;
}

function SectionHeader({ badge, title, highlight, subtitle, center = true, accent = "orange" }) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          {badge}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
        {title}{" "}
        {highlight && <span className="text-blue-700">{highlight}</span>}
      </h2>
      <div className={`w-12 h-1 ${accent === "orange" ? "bg-orange-500" : "bg-blue-700"} rounded-full ${center ? "mx-auto" : ""} mt-4 mb-5`} />
      {subtitle && (
        <p className={`text-lg text-slate-500 leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const cardTiltProps = {
  className: "tilt-card",
  onMouseMove(e) {
    if (window.innerWidth < 768) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    e.currentTarget.style.transform = `translateY(-8px) rotateY(${x}deg) rotateX(${y}deg)`;
  },
  onMouseLeave(e) {
    e.currentTarget.style.transform = "";
  },
};

// ── FLIPPING ABOUT LOGO COMPONENT ──────────────────────────────────────────
function FlippingAboutLogo() {
  const [isFlipped, setIsFlipped] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let timer;
    if (!isFlipped) {
      timer = setTimeout(() => setIsFlipped(true), 4000);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
    return () => clearTimeout(timer);
  }, [isFlipped]);

  const handleVideoEnded = () => {
    setIsFlipped(false);
  };

  return (
    <div 
      className="relative w-full aspect-video transition-transform duration-1000 ease-in-out perspective group" 
      style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
    >
      {/* Front Face (Logo) */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center rounded-[1.5rem] bg-white border-[6px] border-slate-50 shadow-2xl" 
        style={{ backfaceVisibility: 'hidden' }}
      >
        <img
          src={logoImg}
          alt="Gurukula Logo"
          className="w-2/3 max-w-[200px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
          loading="lazy"
        />
      </div>
      {/* Back Face (Video) */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center rounded-[1.5rem] overflow-hidden shadow-2xl bg-black border-[6px] border-slate-50" 
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <video 
          ref={videoRef}
          src="/review/about.mp4" 
          muted 
          playsInline 
          onEnded={handleVideoEnded}
          onContextMenu={(e) => e.preventDefault()}
          style={{ WebkitTouchCallout: 'none' }}
          className="w-full h-full object-cover pointer-events-none" 
        />
      </div>
    </div>
  );
}

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Sticky Back Button */}
      <div className="fixed sm:absolute top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Link to="/#about" className="inline-flex items-center gap-2 text-white transition-all duration-300 font-semibold bg-blue-600/90 sm:bg-white/10 hover:bg-blue-700 sm:hover:bg-white/20 hover:-translate-x-1 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-md border border-blue-500/30 sm:border-white/10 shadow-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="pt-36 pb-32 bg-blue-900 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/gallery7.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/90"></div>

        <div className="relative z-10 px-4 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">About <span className="text-white-500">Us</span></h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Discover the story, vision, and the people behind Gurukula Computer Training Centre.</p>
        </div>
      </div>

      {/* ABOUT SECTION DETAILED (NEW DESIGN) */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 anim-fadeInUp">
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest shadow-sm">
            <UiIcon name="monitor" className="w-4 h-4 text-blue-700" />
            <span>Est. Belthangady</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            Empowering Students for the <span className="text-blue-700">Digital Age</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-blue-600 to-orange-400 rounded-full mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

            {/* Image Block */}
            <div className="w-full lg:w-1/2 relative anim-fadeInUp-1">
              <FlippingAboutLogo />

              {/* Decorative background blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-100 blur-3xl opacity-50 rounded-full"></div>
            </div>

            {/* Content Block */}
            <div className="w-full lg:w-1/2 anim-fadeInRight">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 leading-snug">
                Welcome to <span className="text-blue-700">Gurukula</span> Computer Training Centre, your gateway to professional tech education.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                We are dedicated to delivering high-quality training in computer technology, digital skills, and modern software tools. Our primary goal is to equip every student with practical, hands-on experience that translates directly into real-world career success.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                From Computer Applications and Office Automation to Tally, Graphic Design, Video Editing, AI, and Data Analytics — our comprehensive curriculum provides a complete foundation for the modern workplace.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: "users", val: "1000+", lab: "Students" },
                  { icon: "monitor", val: "30+", lab: "Courses" },
                  { icon: "badge", val: "4.8", lab: "Rating" },
                ].map((s) => (
                  <div key={s.lab} className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <UiIcon name={s.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mb-2" />
                    <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">{s.val}</p>
                    <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{s.lab}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════ FOUNDER ════════════ */}
      <section id="founder" className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-72 h-72 bg-slate-200 rounded-full blur-3xl opacity-35" />
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <SectionHeader badge={null} title="The Person" highlight="Behind Gurukula" subtitle="Passionate about making quality digital education accessible to every student in Karnataka." />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-400 hover:ring-4 hover:ring-blue-500/20 hover:shadow-blue-900/30">
            <div className="h-1.5 w-full bg-blue-600 transition-colors duration-300" />
            <div className="grid lg:grid-cols-[320px_1fr] gap-0">
              <div className="relative flex flex-col items-center justify-start gap-5 px-6 py-8 lg:py-10 bg-gradient-to-b from-[#1b2545] to-[#2552d4]">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

                <div className="relative z-10 mt-2">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-orange-500 p-1.5 shadow-xl mx-auto">
                    <img src="/images/founder.jpg" alt="Santhosh — Founder, Gurukula Computer" className="w-full h-full rounded-full object-cover object-top bg-slate-800" loading="lazy" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                    <div className="w-full h-full hidden items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-900"><span className="text-5xl font-black text-white">S</span></div>
                    <div className="absolute bottom-1 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1bc252] flex items-center justify-center shadow-lg ring-4 ring-[#234ac2]"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                  </div>
                </div>

                <div className="relative z-10 text-center mt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Santhosh</h3>
                  <p className="text-orange-500 font-black text-[11px] sm:text-xs mt-1 uppercase tracking-widest">Founder &amp; Director</p>
                  <p className="text-blue-200 text-xs sm:text-sm mt-1">Gurukula Computer, Belthangady</p>
                </div>

                <div className="relative z-10 w-full grid grid-cols-3 gap-2 mt-4">
                  {[{ val: "1000+", lab: "Students" }, { val: "2", lab: "Locations" }, { val: "30+", lab: "Courses" }].map((s) => (
                    <div key={s.lab} className="rounded-xl bg-white/10 border border-white/5 py-2.5 text-center shadow-sm">
                      <p className="text-base sm:text-lg font-black text-white">{s.val}</p>
                      <p className="text-[9px] text-blue-200 font-semibold mt-0.5">{s.lab}</p>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-2 w-full flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-colors cursor-default">
                    <span className="text-red-400 text-sm">📍</span> Dharmasthala, Karnataka
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start px-5 sm:px-8 py-8 lg:py-10 gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#f2f7ff] border border-[#bfdbfe] text-blue-700 text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4"><span className="text-sm">🎓</span> ABOUT ME</div>
                  <p className="text-black text-sm leading-relaxed">I'm <span className="font-black">Santhosh</span>, founder of <span className="font-bold text-blue-700">ICON – National Board of Computer Education in Ujire and Gurukula Computer</span> in Belthangady. Hailing from Dharmasthala, Karnataka, I began as a Computer Trainer with 2 years of hands-on experience before launching ICON at age <span className="font-black">23</span>.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🏆", color: "bg-[#fffdf2] border-[#fde68a]", titleColor: "text-orange-700", title: "TOP 3 IN KARNATAKA", desc: "Ranked among Karnataka's Top 3 Computer Training Institutes by NBCE" },
                    { icon: "🎓", color: "bg-[#f2f7ff] border-[#bfdbfe]", titleColor: "text-blue-700", title: "1,000+ STUDENTS TRAINED", desc: "Across two locations — Ujire and Belthangady" },
                    { icon: "💡", color: "bg-[#f2fdf4] border-[#bbf7d0]", titleColor: "text-green-700", title: "30+ JOB-READY COURSES", desc: "AI Tools, Graphic Design, Tally, GST and beyond" },
                    { icon: null, color: "bg-[#fff7ed] border-[#fed7aa]", titleColor: "text-orange-700", title: "WORLD'S FIRST AI CARD", desc: "Exclusive AI Foundation, 50+ Tools, Power BI, Tableau, internships & scholarships" },
                  ].map((item) => (
                    <div key={item.title} className={`flex items-start gap-3 rounded-xl border ${item.color} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default`}>
                      {item.icon && <span className="text-2xl flex-shrink-0">{item.icon}</span>}
                      <div className="min-w-0">
                        <p className={`text-[11px] font-black uppercase tracking-wide ${item.titleColor} mb-1`}>{item.title}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-xl px-5 py-4 bg-[#f2f7ff] border border-[#bfdbfe] mt-2">
                  <p className="text-[11px] font-black text-blue-700 uppercase tracking-widest mb-2">MY MISSION</p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"Equip every student with essential digital skills for success, making top-tier education accessible to all."</p>
                  <p className="text-xs font-bold text-slate-700 mt-2">— Santhosh, Founder</p>
                </div>

                <div className="mt-1 flex justify-start">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-[#1db954] hover:bg-[#1ed760] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5">
                    Connect on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ VISION & MISSION ════════════ */}
      <section id="vision-mission" className="py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <SectionHeader badge="🌟 Our Purpose" title="Vision & Mission" highlight="" subtitle="Empowering students with digital skills, practical knowledge and career-oriented training for the modern world." />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div {...cardTiltProps} className={`tilt-card group relative overflow-hidden rounded-3xl p-8 sm:p-11 text-white cursor-default hover:shadow-2xl`} style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}>
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04] pointer-events-none" />
              <div className="relative z-10">

                <h3 className="text-2xl sm:text-3xl font-black mb-2">Our Vision</h3>
                <div className="w-10 h-1 bg-orange-400 rounded-full mb-5" />
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base">To become a trusted and leading computer training institute that empowers students with digital knowledge, technical skills, and innovative thinking — creating skilled professionals ready for the modern technology-driven world.</p>
                <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-semibold text-blue-100"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Leading Digital Education</div>
              </div>
            </div>
            <div {...cardTiltProps} className={`tilt-card group relative overflow-hidden rounded-3xl p-8 sm:p-11 text-white cursor-default hover:shadow-2xl`} style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}>
              <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04] pointer-events-none" />
              <div className="relative z-10">

                <h3 className="text-2xl sm:text-3xl font-black mb-2">Our Mission</h3>
                <div className="w-10 h-1 bg-orange-400 rounded-full mb-5" />
                <ul className="space-y-3">
                  {["Provide high-quality computer education with practical training.", "Help students develop industry-relevant digital skills.", "Introduce modern technologies such as Artificial Intelligence and Data Analytics.", "Support students with career guidance and job-oriented training.", "Create opportunities for students to build successful careers."].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-md bg-white/20 border border-white/30 flex items-center justify-center mt-0.5"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                      <span className="text-blue-100 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
