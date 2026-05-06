import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import certificateImg from "../images/certificate.jpg";
import logoImg from "../images/logo.png";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: "/images/gallery1.jpg", caption: "Executive Reception Area", tall: false, tag: "Campus" },
  { src: "/images/gallery11.jpg", caption: "Live Training Workshop", tall: true, tag: "Education" },
  { src: "/images/gallery3.jpg", caption: "Annual Excellence Awards", tall: true, tag: "Events" },
  { src: "/images/gallery4.jpg", caption: "High-Performance Lab", tall: false, tag: "Infrastructure" },
  { src: "/images/gallery5.jpg", caption: "Collaborative Learning", tall: false, tag: "Students" },
  { src: "/images/gallery2.jpg", caption: "Advanced Computing Suite", tall: true, tag: "Tech" },
  { src: "/images/gallery7.jpg", caption: "Main Campus Wing", tall: true, tag: "Campus" },
  { src: "/images/gallery6.jpg", caption: "AI Innovation Seminar", tall: false, tag: "Workshop" },
];
const COURSES = [
  { id: 1, title: "Diploma in Computer Application (DCA) + AI", category: "Diploma Courses", duration: "6 Months", image: "/images/course/dca.png", popular: false, description: "DCA is a foundational computer course designed for beginners who want to build strong computer skills. Students learn computer fundamentals, MS Office applications, internet usage, and typing skills along with basic AI tools to improve productivity.", learn: ["Computer Fundamentals & Windows", "MS Word, Excel, PowerPoint", "MS Access", "Internet & Email usage", "English Typing", "Introduction to AI tools"], careers: ["Data Entry Operator", "Computer Operator", "Office Assistant", "Back Office Executive", "Documentation Assistant"] },
  { id: 2, title: "Advance Diploma in Computer Application (ADCA) + AI", category: "Diploma Courses", duration: "6 Months", image: "/images/course/adca.png", popular: false, description: "ADCA is an advanced computer course that covers office applications, basic programming, accounting software, and web fundamentals.", learn: ["Computer Fundamentals", "MS Office (Word, Excel, PowerPoint, Access)", "HTML (Basic Web Development)", "C Programming (Basics)", "Tally with GST", "Internet Applications", "AI Tools for productivity"], careers: ["Computer Operator", "Office Administrator", "Junior Web Assistant", "Accounts Assistant", "MIS Executive"] },
  { id: 3, title: "Diploma in Office Management & Accounting (DOMA) + AI", category: "Diploma Courses", duration: "6 Months", image: "/images/course/doma.png", popular: false, description: "This course focuses on office management and financial accounting.", learn: ["Computer Fundamentals", "MS Office Applications", "Business Documentation", "Financial Accounting Basics", "Tally Accounting Software", "AI tools for business productivity"], careers: ["Accounts Assistant", "Office Administrator", "Billing Executive", "Back Office Executive", "Junior Accountant"] },
  { id: 4, title: "Desktop Publishing (DTP) + AI", category: "Diploma Courses", duration: "6 Months", image: "/images/course/dtp.png", popular: false, description: "DTP is designed for students interested in graphic design and publishing.", learn: ["Adobe InDesign", "CorelDraw", "Photoshop", "English Typing", "Kannada Typing", "AI tools for design"], careers: ["Graphic Designer", "DTP Operator", "Printing Press Designer", "Publishing Assistant", "Social Media Designer"] },
  { id: 5, title: "Advanced Excel + Tally ERP9", category: "Diploma Courses", duration: "2 Months", image: "/images/course/aet.png", popular: false, description: "This course focuses on advanced spreadsheet skills and accounting software.", learn: ["Advanced Excel Functions", "Data Analysis", "Financial Reports", "Tally ERP9 Accounting", "GST Entries"], careers: ["Accounts Assistant", "MIS Executive", "Billing Executive", "Data Analyst (Entry Level)", "Office Accountant"] },
  { id: 6, title: "Certificate in Office Automation (COA) + AI", category: "Certificate Courses", duration: "3 Months", image: "/images/course/coa.png", popular: false, description: "COA is a beginner-friendly course designed to teach essential computer and office skills.", learn: ["Computer Basics", "Windows Operating System", "MS Word", "MS Excel", "MS PowerPoint", "AI productivity tools"], careers: ["Office Assistant", "Computer Operator", "Data Entry Operator", "Receptionist"] },
  { id: 7, title: "Certificate in Financial Accounting (CFA) + AI", category: "Certificate Courses", duration: "3 Months", image: "/images/course/cfa.png", popular: false, description: "This course introduces students to financial accounting concepts and Tally software.", learn: ["Accounting Basics", "Business Transactions", "Tally Software", "GST Basics", "AI tools for accounting"], careers: ["Accounts Assistant", "Billing Executive", "Tally Operator", "Junior Accountant"] },
  { id: 8, title: "Certificate in Information Technology (CIT) + AI", category: "Certificate Courses", duration: "3 Months", image: "/images/course/cit.png", popular: false, description: "CIT provides basic IT knowledge including computer operations and office software.", learn: ["Computer Fundamentals", "MS Office Applications", "Internet & Email", "AI tools for productivity"], careers: ["Computer Operator", "Data Entry Operator", "Office Staff"] },
  { id: 9, title: "Certificate in Photo & Video Editing + AI", category: "Graphic Design Courses", duration: "6 Months", image: "/images/course/cpve.png", popular: false, description: "This course trains students in professional photo and video editing tools.", learn: ["Photoshop", "Premiere Pro", "After Effects", "Video Editing Techniques", "AI tools for editing"], careers: ["Video Editor", "Photo Editor", "YouTube Editor", "Social Media Content Editor"] },
  { id: 10, title: "Diploma in VFX & Post Production + AI", category: "Graphic Design Courses", duration: "12 Months", image: "/images/course/vfxp.png", popular: false, description: "A professional course focused on visual effects and post-production for films and digital media.", learn: ["Photoshop", "Illustrator", "Audition", "Premiere Pro", "After Effects", "DaVinci Resolve", "AI video tools"], careers: ["VFX Artist", "Video Editor", "Post Production Editor", "Motion Graphics Artist"] },
  { id: 11, title: "Certificate in Motion Graphics + AI", category: "Graphic Design Courses", duration: "4 Months", image: "/images/course/cmg.png", popular: false, description: "This course teaches animation and motion design for advertisements and digital marketing.", learn: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro Basics", "AI animation tools"], careers: ["Motion Graphics Designer", "Video Editor", "Animation Assistant"] },
  { id: 12, title: "Certificate in Film Making + AI", category: "Graphic Design Courses", duration: "2 Months", image: "/images/course/cfm.png", popular: false, description: "Students learn the fundamentals of filmmaking including editing and storytelling.", learn: ["Photoshop Basics", "Video Editing", "Premiere Pro", "Film Editing Techniques"], careers: ["Video Editor", "Content Creator", "Assistant Editor"] },
  { id: 13, title: "Certificate in Graphic Design + AI", category: "Graphic Design Courses", duration: "6 Months", image: "/images/course/cgd.png", popular: false, description: "Professional graphic design skills for advertising, branding, and print media.", learn: ["Photoshop", "Illustrator", "InDesign", "CorelDraw", "AI design tools"], careers: ["Graphic Designer", "Branding Designer", "Social Media Designer", "Advertising Designer"] },
  { id: 14, title: "Foundations of Artificial Intelligence", category: "Artificial Intelligence Courses", duration: "30 Days", image: "/images/course/fai.jpeg", popular: false, description: "An introductory course to understand AI concepts, tools, and applications.", learn: ["Introduction to AI", "AI Applications", "AI Tools Overview"], careers: ["AI Assistant", "AI Content Creator", "AI Tool Specialist"] },
  { id: 15, title: "Applied Artificial Intelligence with 50+ AI Tools", category: "Artificial Intelligence Courses", duration: "80 Days", image: "/images/course/aai.png", popular: false, description: "Students learn practical applications of AI tools for content creation and automation.", learn: ["AI Content Creation", "Automation Tools", "AI Marketing Tools", "Productivity AI Tools"], careers: ["AI Specialist", "Digital Marketer", "AI Content Creator", "Automation Specialist"] },
  { id: 16, title: "Power BI", category: "Artificial Intelligence Courses", duration: "90 Days", image: "/images/course/powerbi.png", popular: false, description: "Data visualization and business intelligence using Power BI dashboards and reports.", learn: ["Data Visualization", "Power BI Dashboards", "Business Reports"], careers: ["Data Analyst", "Business Analyst", "MIS Executive"] },
  { id: 17, title: "Tableau", category: "Artificial Intelligence Courses", duration: "60 Days", image: "/images/course/tableau.png", popular: false, description: "Interactive data visualizations and dashboards for business decision-making.", learn: ["Tableau Dashboards", "Interactive Reports", "Business Data Visualization"], careers: ["Data Analyst", "Business Intelligence Analyst"] },
  { id: 18, title: "Certificate in SAP (FICO + MM)", category: "Certificate Courses", duration: "3 Months", image: "/images/sap.jpg", popular: false, description: "SAP course provides knowledge of Enterprise Resource Planning (ERP) software used by companies to manage business operations such as finance, materials, and procurement. This course helps students understand real-time business processes and prepares them for corporate job roles.", learn: ["SAP FICO (Financial Accounting & Controlling)", "Financial Accounting Basics", "General Ledger", "Accounts Payable", "Accounts Receivable", "Financial Reports", "SAP MM (Material Management)", "Procurement Process", "Inventory Management", "Material Requirement Planning", "Invoice Verification", "Vendor Management"], careers: ["SAP End User", "Accounts Executive", "ERP Operator", "Business Process Associate", "Corporate Office Staff"] },
  { id: 19, title: "Certificate in Digital Marketing", category: "Certificate Courses", duration: "3 Months", image: "/images/digital-marketing.jpg", popular: false, description: "Digital Marketing course helps students learn how to promote businesses, products, and services online using modern marketing strategies. Students gain practical skills in social media marketing, search engine optimization, advertising, and content creation.", learn: ["Digital Marketing Fundamentals", "Social Media Marketing (Facebook, Instagram)", "Search Engine Optimization (SEO)", "Google Ads Basics", "Content Creation Basics", "Email Marketing Basics", "Website Introduction", "Marketing Strategy Basics"], careers: ["Digital Marketing Executive", "Social Media Manager", "SEO Executive", "Content Creator", "Marketing Assistant", "Freelancer"] },
];

const INDIVIDUAL_COURSES = [
  "MS Excel", "MS Word", "Kannada Typing", "English Typing",
  "Tally / Tally Prime / Tally with GST", "Photoshop",
  "Illustrator", "CorelDraw", "After Effects", "Premiere Pro",
];

const INDIVIDUAL_CAREERS = [
  "Data Entry Operator", "Graphic Designer", "Video Editor", "Accounts Assistant",
];

const FAQS = [
  { q: "Do you provide practical training?", a: "Yes. All major courses include practical hands-on sessions with real software tools." },
  { q: "Will I receive a certificate?", a: "Yes. Students receive a recognized course completion certificate after successfully completing the program." },
  { q: "Do you provide career guidance?", a: "Yes. We support students with career guidance and job-oriented training support." },
  { q: "Can beginners join your courses?", a: "Yes. Many programs are designed for beginners and start from fundamentals." },
];

const TESTIMONIALS = [
  { name: "Sowjanya", course: "Photoshop", rating: 5, location: "Belthangady", text: "I have successfully completed my photoshop course in this institution. I'm so happy with the training and the trainers. the teaching way is so polite. I highly recommend this institution to anyone who looking forward to improve their computer skills." },
  { name: "Rinwaz", course: "Adv Excel + Tally ERP", rating: 5, location: "Belthangady", text: "I am truly grateful to sir and staff for excellent teaching and experience is very good. The faculty is knowledgeable and explains concept in simple and understanding. faculty are very friendly. This course was very helpful for my future. The classroom is comfortable with faculty. Honestly Gurukula education is usefull to everyone's.So I suggest everyone who's reading this to join Gurukula computer education class." },
  { name: "Nidhiksha", course: "ADCA", rating: 5, location: "Belthangady", text: "It is the best training centre in belthangady. Faculties are knowledgeable and explain concepts in simple and understanding to us and also faculties are very friendly. Experience is very good. Classroom is super and comfortable. I am so grateful to faculties and Gurukula Computer training centre. So I suggest everyone to join Gurukula Computer training centre and build your career." },
  { name: "Ashwini", course: "ADCA", rating: 5, location: "Belthangady", text: "I didn't know much about computers but Gurukula computer belthangady taught me very well there. Do you want to take a computer course? You can do it here at Gurukula computer belthangady. They taught me very well from the basics. I didn't know much about Excel. But they taught me very easily here. They taught me Tally, GST very easily. It will be very useful in the future."},
  { name: "Sathvik", course: "AI for Studies", rating: 5, location: "Belthangady", text: "I had a great experience at Gurukula Computer. The course I learned there was about AI for studies. I had a very good experience in the classes, and all the staff were very kind and helpful. Whenever I faced any problem, they helped me solve it quickly. Overall, I had a very good experience at Gurukula Computer."},
  { name: "Niranjan", course: "VFX and Post Production", rating: 5, location: "Belthangady", text: "My experience has been really good. They teach graphic design and video editing very clearly and in a step-by-step manner, so even beginners can understand easily.The trainers are friendly and very supportive. They focus on practical learning and real-world skills, which helps improve creativity and confidence. Overall, highly recommended for anyone who wants to build a career in this field!"}
];

const WHY_ITEMS = [
  { icon: "bolt", title: "100% Practical Training", desc: "Learn by doing. Work on live projects and real tools instead of just reading theory." },
  { icon: "users", title: "Expert Mentorship", desc: "Get trained by industry professionals in small batches for personalized guidance." },
  { icon: "briefcase", title: "Job-Ready Skills", desc: "Our curriculum is designed to teach exactly what modern tech companies are hiring for." },
  { icon: "badge", title: "Recognized Certificate", desc: "Earn a Govt. recognized certificate that adds real value to your professional resume." },
];

// ── GLOBAL STYLES (injected once via a static <style> tag in index.html ideally,
//    but kept here as a module-level constant so React never recreates it) ──────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  h1, h2, h3, h4, h5, h6 { text-transform: uppercase; }
  .font-display { font-family: 'DM Serif Display', Georgia, serif; }

  @keyframes fadeInUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInRight{ from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes floatY     { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
  @keyframes pingLoop   { 75%,100%{transform:scale(2);opacity:0;} }
  @keyframes pulse      { 0%,100%{opacity:1;} 50%{opacity:.5;} }
  @keyframes countUp    { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
  @keyframes drawLine {
  0% {
    stroke-dashoffset: 600;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Add this for a more realistic brush-stroke appearance */
.hero-underline-svg {
  filter: drop-shadow(0px 2px 2px rgba(249, 115, 22, 0.3));
  stroke-linecap: round;
  stroke-linejoin: round;
}

  .anim-fadeInUp    { animation: fadeInUp    0.7s ease both; }
  .anim-fadeInUp-1  { animation: fadeInUp    0.7s ease 0.1s both; }
  .anim-fadeInUp-2  { animation: fadeInUp    0.7s ease 0.2s both; }
  .anim-fadeInUp-3  { animation: fadeInUp    0.7s ease 0.3s both; }
  .anim-fadeInUp-4  { animation: fadeInUp    0.7s ease 0.4s both; }
  .anim-fadeInUp-5  { animation: fadeInUp    0.7s ease 0.5s both; }
  .anim-fadeInUp-6  { animation: fadeInUp    0.7s ease 0.6s both; }
  .anim-fadeInUp-75 { animation: fadeInUp    0.7s ease 0.75s both; }
  .anim-fadeInRight { animation: fadeInRight 0.9s ease 0.3s both; }
  .anim-float       { animation: floatY      4s ease-in-out infinite; }
  .anim-float-2     { animation: floatY      5s ease-in-out 1s infinite; }
  .anim-ping        { animation: pingLoop    1.5s cubic-bezier(0,0,0.2,1) infinite; }
  .anim-pulse       { animation: pulse       2s ease-in-out infinite; }

  /* Reveal animation (applied via data-reveal attribute) */
  [data-reveal] { opacity:0; transform:translateY(32px); transition:opacity 0.65s ease,transform 0.65s ease; }
  [data-reveal].is-visible { opacity:1; transform:translateY(0); }

  .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

  .faq-body { display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows 0.4s ease,opacity 0.35s ease; }
  .faq-body.open { grid-template-rows:1fr; opacity:1; }
  .faq-inner { overflow:hidden; }

  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:#f1f5f9; }
  ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }
  ::-webkit-scrollbar-thumb:hover { background:#94a3b8; }

  .perspective { perspective:1000px; }

  /* GPU-composited tilt — only transform & opacity, no layout */
  .tilt-card { transition:transform 0.18s ease, box-shadow 0.18s ease; will-change:transform; }
  .tilt-card:hover { transform:translateY(-8px); }
  @media(max-width:768px){ .tilt-card:hover{transform:none;} }

  .course-img { transition:transform 0.5s ease; will-change:transform; }
  .course-card:hover .course-img { transform:scale(1.08); }

  /* Scroll progress bar — thin, GPU only */
  #scroll-progress { position:fixed; top:0; left:0; height:3px; z-index:100; pointer-events:none;
    background:linear-gradient(90deg,#1D4ED8,#f97316,#1D4ED8);
    transform-origin:left; will-change:transform; }
`;

// ── ICON COMPONENT ─────────────────────────────────────────────────────────
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

// ── HOOKS ──────────────────────────────────────────────────────────────────

// FIX: scroll progress via CSS transform on a DOM ref — no setState, no re-renders
function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    bar.style.width = "100%"; // set width once
    
    let docH = document.documentElement.scrollHeight - window.innerHeight;
    const onResize = () => { docH = document.documentElement.scrollHeight - window.innerHeight; };
    window.addEventListener("resize", onResize, { passive: true });

    let raf;
    const update = () => {
      const pct = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
      bar.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    
    return () => { 
      window.removeEventListener("scroll", onScroll); 
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf); 
    };
  }, []);
}

// FIX: scroll-to-top visibility via DOM classList — no setState
function useScrollTopBtn() {
  useEffect(() => {
    const btn = document.getElementById("scroll-top-btn");
    if (!btn) return;
    let raf;
    let currentIsVisible = window.scrollY > 400;
    
    // Set initial state
    btn.style.opacity = currentIsVisible ? "1" : "0";
    btn.style.pointerEvents = currentIsVisible ? "auto" : "none";

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const isVisible = window.scrollY > 400;
        if (isVisible !== currentIsVisible) {
          currentIsVisible = isVisible;
          btn.style.opacity = isVisible ? "1" : "0";
          btn.style.pointerEvents = isVisible ? "auto" : "none";
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
}

// FIX: IntersectionObserver for reveal — uses CSS classes, never calls setState
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    // Check prefers-reduced-motion once
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(n => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply delay from data attribute if present
          const delay = entry.target.dataset.revealDelay || "0ms";
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []); // runs once only
}

// FIX: count-up with setState, isolated in its own component to prevent full page re-renders
function useCountUp(targetRef) {
  const [counts, setCounts] = useState({ courses: 0, students: 0, years: 0 });
  const fired = useRef(false);
  useEffect(() => {
    if (!targetRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return;
      fired.current = true;
      const targets = { courses: 30, students: 1000, years: 1 };
      const steps = 60;
      let step = 0;
      
      // Delay longer on initial load to wait for preloader to finish
      const preloader = document.querySelector('.preloader-wrapper');
      const delay = preloader ? 2000 : 600;
      
      setTimeout(() => {
        const id = setInterval(() => {
          step++;
          const ease = 1 - Math.pow(1 - step / steps, 3);
          setCounts({
            courses: Math.round(targets.courses * ease),
            students: Math.round(targets.students * ease),
            years: Math.round(targets.years * ease),
          });
          if (step >= steps) clearInterval(id);
        }, 2000 / steps);
      }, delay);
    }, { threshold: 0.3 });
    io.observe(targetRef.current);
    return () => io.disconnect();
  }, [targetRef]);
  return counts;
}

// ── STARS ─────────────────────────────────────────────────────────────────
function Stars({ n = 5, size = 14, color = "#F97316" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={color}>
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  );
}

// FIX: card tilt now uses CSS variables on the element directly — no React state, no re-renders
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

// ── SECTION HEADER ─────────────────────────────────────────────────────────
function SectionHeader({ badge, title, highlight, subtitle, center = true, accent = "orange", titleSize = "text-3xl md:text-5xl" }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
        {badge}
      </div>
      <h2 className={`${titleSize} font-extrabold text-slate-900 leading-tight uppercase tracking-[0.1em]`}>
        {title}{" "}
        {highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">{highlight}</span>}
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

// ── COURSE MODAL (memoized) ─────────────────────────────────────────────────
const CourseModal = ({ course, onClose }) => {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-slate-900/80 backdrop-blur-sm p-0 md:p-6" onClick={onClose}>
      <div
        className="bg-white w-full md:rounded-[2.5rem] md:max-w-5xl overflow-hidden shadow-2xl max-h-[95dvh] md:max-h-[85dvh] flex flex-col md:flex-row relative rounded-t-[2.5rem]"
        style={{ animation: "fadeInUp 0.3s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MOBILE CLOSE BUTTON (FLOATING) */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 md:hidden rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* LEFT/TOP: IMAGE SECTION */}
        <div className="relative h-48 sm:h-56 md:h-auto md:w-[40%] flex-shrink-0 bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Blurred Background to prevent letterboxing */}
          <img src={course.image || "/images/hero.jpg"} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110 pointer-events-none" aria-hidden="true" />
          
          {/* Main Image - Always fully visible */}
          <img src={course.image || "/images/hero.jpg"} alt={course.title} className="relative z-10 w-full h-full object-contain p-4 md:p-8 drop-shadow-2xl" loading="eager" />
          
          {/* Gradient Overlay to blend with right content */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/50 pointer-events-none" />

          {/* BADGES ON IMAGE */}
          <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 flex flex-wrap gap-2 z-30">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5">
              ⏱ {course.duration}
            </span>
            {course.price && (
              <span className="bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {course.price}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT/BOTTOM: CONTENT SECTION */}
        <div className="flex-1 min-h-0 flex flex-col bg-slate-50 overflow-hidden relative">
          {/* DESKTOP CLOSE BUTTON */}
          <button onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 hidden md:flex rounded-full bg-white shadow-sm border border-slate-200 hover:bg-slate-100 items-center justify-center text-slate-500 hover:text-slate-900 transition-all hover:scale-105">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="overflow-y-auto p-6 md:p-10 space-y-8 flex-1">
            {/* HEADER */}
            <div className="md:pr-12">
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {course.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">{course.title}</h3>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">{course.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* LEARN SECTION */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center shadow-sm">
                    <UiIcon name="monitor" className="w-4 h-4 text-blue-700" />
                  </span>
                  What You Will Learn
                </h4>
                <div className="space-y-2.5">
                  {course.learn.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm hover:border-blue-200 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span className="text-sm text-slate-700 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAREERS SECTION */}
              {course.careers && (
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
                      <UiIcon name="briefcase" className="w-4 h-4 text-orange-700" />
                    </span>
                    Career Outcomes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careers.map((item) => (
                      <span key={item} className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STICKY FOOTER */}
          <div className="flex-shrink-0 border-t border-slate-200 p-4 md:p-6 bg-white flex items-center justify-end gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <button onClick={onClose} className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all hidden md:block">
              Close
            </button>
            <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Apply via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── LIGHTBOX (memoized) ────────────────────────────────────────────────────
const Lightbox = ({ photo, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={onClose} aria-label="Close">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.caption} className="w-full max-h-[80dvh] object-contain rounded-2xl shadow-2xl" style={{ animation: "fadeInUp 0.2s ease both" }} loading="eager" />
        <div className="mt-3 text-center">
          <p className="text-white font-semibold text-sm sm:text-base">{photo.caption}</p>
          <p className="text-white/40 text-xs sm:text-sm mt-1">{photo.index + 1} / {PHOTOS.length}</p>
        </div>
      </div>
      <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

// ── TESTIMONIAL SLIDER ─────────────────────────────────────────────────────
function TestimonialSlider({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateView();
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  }, []);

  const totalSlides = Math.max(0, testimonials.length - itemsPerView + 1);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1 >= totalSlides ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative mt-8 sm:mt-12 w-full">
      {/* Slider Container */}
      <div className="overflow-hidden px-1 py-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2 sm:px-4 transition-all duration-500"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2 hover:border-blue-100 transition-all duration-300 h-full flex flex-col overflow-hidden">
                <div className="absolute -top-4 -right-2 text-[150px] text-blue-50 font-serif leading-none select-none pointer-events-none group-hover:text-blue-100/70 transition-colors">"</div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <Stars n={t.rating} size={16} />
                  <div className="flex-1 flex flex-col justify-center mt-6">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-medium text-justify">
                      "{t.text}"
                    </p>
                  </div>
                </div>
                <div className="relative z-10 mt-8 flex items-center gap-3 sm:gap-4 pt-6 border-t border-slate-100 group-hover:border-blue-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-200 flex-shrink-0">
                    {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-bold text-slate-900 truncate">{t.name}</p>
                    <p className="text-[11px] sm:text-xs font-semibold text-orange-600 truncate">{t.course} <span className="text-slate-400">· {t.location}</span></p>
                  </div>
                </div>
                {/* Decorative Bottom Line */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg hover:scale-110"
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="flex gap-2 sm:gap-2.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${currentIndex === i ? "w-6 h-2 sm:w-8 sm:h-2.5 bg-blue-600" : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-300 hover:bg-blue-400"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg hover:scale-110"
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

// ── STATS COUNTER COMPONENT ────────────────────────────────────────────────
function StatsCounter() {
  const statsRef = useRef(null);
  const counts = useCountUp(statsRef);
  
  return (
    <div ref={statsRef} className="flex flex-row items-start sm:items-center justify-between sm:justify-start gap-2 sm:gap-8 lg:gap-10 w-full lg:w-auto relative mt-4 sm:mt-0">
      <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
      {[
        { num: counts.courses, suffix: "+", label: "Professional Courses", icon: "book" },
        { num: counts.students, suffix: "+", label: "Happy Students", icon: "users" },
        { num: counts.years, suffix: "+", label: "Years Experience", icon: "badge" },
      ].map((s, i) => (
        <div key={s.label} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 relative flex-1 sm:flex-none">
          {i !== 0 && (
            <div className="hidden sm:block absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
          )}
          {i !== 0 && (
            <div className="block sm:hidden absolute -left-1 top-1/2 -translate-y-1/2 w-px h-8 bg-white/20" />
          )}
          <div className="w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center text-white/90">
            {s.icon === 'book' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253V19.253" />
              </svg>
            ) : s.icon === 'users' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            )}
          </div>
          <div className="text-center sm:text-left mt-1 sm:mt-0">
            <p className="text-lg sm:text-3xl font-black text-white tabular-nums leading-none">{s.num}{s.suffix}</p>
            <p className="text-[7px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 sm:mt-1 leading-tight max-w-[80px] sm:max-w-none mx-auto sm:mx-0">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const HERO_BACKGROUNDS = [
  { src: "/images/background.png", fitClass: "object-fill" },
  { src: "/images/background3.png", fitClass: "object-cover" },
  { src: "/images/background1.png", fitClass: "object-fill" },
  { src: "/images/background2.png", fitClass: "object-cover" }
];

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

// ══════════════════════════════════════════════════════════════════════════
// HOME COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const location = useLocation();

  const [currentHeroBg, setCurrentHeroBg] = useState(0);

  const reviewVideo1Ref = useRef(null);
  const reviewVideo2Ref = useRef(null);

  const handleReviewPlay = (videoId) => {
    if (videoId === 1 && reviewVideo2Ref.current) {
      reviewVideo2Ref.current.pause();
    } else if (videoId === 2 && reviewVideo1Ref.current) {
      reviewVideo1Ref.current.pause();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [currentTimeObj, setCurrentTimeObj] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTimeObj(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentDay = currentTimeObj.getDay();
  const currentHrs = currentTimeObj.getHours() + currentTimeObj.getMinutes() / 60;
  const isInstituteOpen = currentDay >= 1 && currentDay <= 6 && currentHrs >= 9.0 && currentHrs < 17.5;

  const [aiFlip, setAiFlip] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setAiFlip(p => p === 0 ? 1 : 0), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);


  // All hooks that used to cause re-renders now use DOM refs directly
  useScrollProgress();
  useScrollTopBtn();
  useReveal(); // runs once after mount; safe because it uses CSS classes

  const courseCategories = useMemo(
    () => ["All", ...new Set(COURSES.map(c => c.category)), "Individual Courses"],
    []
  );

  const INDIVIDUAL_KEY = "Individual Courses";
  const ALL_KEY = "All";

  const displayedCourses = useMemo(() => {
    if (activeCategory === ALL_KEY) return COURSES;
    if (activeCategory === INDIVIDUAL_KEY) return [];
    return COURSES.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const lbNext = useCallback(() => setLightbox(p => { if (!p) return p; const n = (p.index + 1) % PHOTOS.length; return { ...PHOTOS[n], index: n }; }), []);
  const lbPrev = useCallback(() => setLightbox(p => { if (!p) return p; const n = (p.index - 1 + PHOTOS.length) % PHOTOS.length; return { ...PHOTOS[n], index: n }; }), []);
  const lbClose = useCallback(() => setLightbox(null), []);

  // FIX: Hero tilt via DOM ref — no state, no re-renders
  const heroImgRef = useRef(null);
  const onHeroMove = useCallback((e) => {
    if (!heroImgRef.current || window.innerWidth < 1024) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    heroImgRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  }, []);
  const onHeroLeave = useCallback(() => {
    if (heroImgRef.current) heroImgRef.current.style.transform = "";
  }, []);

  // ── UPDATED GALLERY GRID COMPONENT (Optimized for Scroll Performance) ──────────────────
  const GalleryGrid = ({ onOpen }) => {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="break-inside-avoid group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-200 p-2.5 transition-[transform,box-shadow] duration-700 hover:shadow-[0_30px_60px_rgba(15,23,42,0.15)] hover:-translate-y-3 cursor-zoom-in transform-gpu"
            onClick={() => onOpen({ ...photo, index: i })}
          >
            <div className={`relative overflow-hidden rounded-[1.8rem] bg-slate-300 ${photo.tall ? "h-[480px]" : "h-[300px]"}`}>
              <img
                src={photo.src}
                alt={photo.caption}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover block"
                onError={(e) => {
                  e.target.style.display = 'none'; // Hides broken image icon
                  e.target.parentElement.classList.add('bg-slate-400'); // Shows a grey block instead
                }}
              />

              {/* Professional Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out transform-gpu">
                  <span className="inline-block px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3 shadow-lg">
                    {photo.tag || "Gallery"}
                  </span>
                  <h4 className="text-white font-black text-xl leading-tight tracking-tight">{photo.caption}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Styles injected once — component mounts once so this is fine */}
      <style>{GLOBAL_CSS}</style>

      <Navbar />

      {/* GPU-composited progress bar — no React state, moved by useScrollProgress */}
      <div id="scroll-progress" style={{ width: "100%", transform: "scaleX(0)" }} />

      {/* ════════════ HERO ════════════ */}
      <section id="home" className="scroll-mt-24 relative overflow-hidden bg-black px-4 pt-32 pb-12 md:px-8 md:pt-40 md:pb-12 min-h-[90vh] sm:min-h-screen flex items-end">

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Mobile: Static First Image */}
          <img 
            src="images/mbl-background.png"
            alt="Gurukula Background"
            className={`absolute inset-0 w-full h-full object-center md:hidden block`}
            loading="eager"
          />
          {/* Desktop: Image Slider */}
          {HERO_BACKGROUNDS.map((bg, index) => (
            <img 
              key={bg.src}
              src={bg.src}
              alt={`Gurukula Background ${index + 1}`}
              className={`absolute inset-0 w-full h-full ${bg.fitClass} object-center transition-opacity duration-1000 ease-in-out hidden md:block ${
                index === currentHeroBg ? "opacity-100" : "opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Radial Black Shadow Overlay - Darkens all edges (vignette) */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_transparent_60%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Optional: Extra Top & Bottom Linear Overlay for maximum text pop */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[800px] rounded-full bg-blue-500/20 opacity-30 blur-[80px] transform-gpu" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 flex flex-col justify-end h-full">
          {/* Main Content Area */}
          <div className="max-w-lg text-left mb-6 md:mb-10">
            <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-md font-medium leading-relaxed anim-fadeInUp-3">
              Join Gurukula Computer and gain real-world skills with expert guidance and hands-on learning.
            </p>
          </div>

          {/* Bottom Row: Buttons + Stats */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12 anim-fadeInUp-4">
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
              <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
                className="group rounded-xl border border-transparent bg-[#0D3B9E] px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg">
                Join Gurukula Today
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="#courses"
                className="group rounded-xl border border-white/40 hover:border-white text-white bg-transparent px-8 py-3.5 text-sm font-bold transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                Explore Courses
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>

            {/* Stat Counter */}
            <StatsCounter />
          </div>
        </div>
      </section>

      {/* ════════════ ABOUT (MINIMAL) ════════════ */}
      <section
        id="about"
        className="bg-gradient-to-b from-blue-50 to-white py-24 sm:py-28 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* MOBILE HEADING */}
          <div className="lg:hidden text-center mb-10 anim-fadeInUp">
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-5 py-2 rounded-full mb-6 uppercase tracking-widest shadow-sm">
              <UiIcon name="monitor" className="w-5 h-5 text-blue-700" />
              <span>Est. Belthangady</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              About <span className="text-blue-700">Gurukula</span>
            </h2>
            <div className="mt-5 w-16 h-[3px] bg-gradient-to-r from-blue-600 to-orange-400 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT IMAGE */}
            <div className="relative anim-fadeInRight flex items-center justify-center">
              <div className="relative w-full max-w-lg mx-auto">
                <FlippingAboutLogo />
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 blur-3xl opacity-50 rounded-full"></div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="anim-fadeInUp">
              {/* DESKTOP HEADING */}
              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-5 py-2 rounded-full mb-6 uppercase tracking-widest shadow-sm">
                  <UiIcon name="monitor" className="w-5 h-5 text-blue-700" />
                  <span>Est. Belthangady</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  About <span className="text-blue-700">Gurukula</span>
                </h2>
                <div className="mt-5 w-16 h-[3px] bg-gradient-to-r from-blue-600 to-orange-400 rounded-full" />
              </div>
              <p className="mt-6 lg:mt-7 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Gurukula Computer Training Centre has been empowering students in Belthangady with world-class digital education. From foundational computer skills to advanced AI tools, our hands-on approach ensures you are fully prepared for the modern tech industry.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link to="/about" className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-sm transition-all duration-300 hover:shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  More Info
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════ WHY CHOOSE US ════════════ */}
      <section id="why-choose-us" className="scroll-mt-24 pt-10 pb-0 sm:pt-15 sm:pb-0 px-4 sm:px-8 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 top-0 left-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[80px] opacity-40 transform-gpu" />
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 sm:mb-20" data-reveal>
            <div className="inline-flex items-center gap-3 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-5 py-2 rounded-full mb-6 uppercase tracking-widest shadow-sm">
              <span className="text-lg">⭐</span>
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              Why Students Choose <span className="text-blue-700">Gurukula</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium">
              We focus on real skills, not just theory — helping you become job-ready from day one with hands-on training and expert mentorship.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ITEMS.map((item, i) => (
              <div key={item.title} data-reveal data-reveal-delay={`${i * 50}ms`}
                className="group relative bg-white rounded-3xl p-8 transition-all duration-500 border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-3xl transition-colors duration-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute right-6 top-6 text-6xl font-black text-slate-100 opacity-50 group-hover:text-blue-50 transition-colors duration-500 select-none pointer-events-none transform group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 group-hover:border-blue-300 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-800 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-3">
                    <UiIcon className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors duration-500" name={item.icon} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:text-blue-800 transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium group-hover:text-slate-700">{item.desc}</p>
                </div>
                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
          {/*
          <div data-reveal data-reveal-delay="200ms" className="mt-16 relative overflow-hidden rounded-[2.5rem] px-8 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl"
            style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#2563eb 100%)" }}>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center sm:text-left max-w-xl">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">Ready to build your digital career? 🚀</h3>
              <p className="text-blue-100 text-base sm:text-lg font-medium">Join <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">1000+ students</span> who transformed their futures at Gurukula.</p>
            </div>
            <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
              className="relative z-10 flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] text-lg border border-orange-300/50">
              Start Today →
            </a>
          </div>
        </div> */}

        </div>
      </section>

      {/* ════════════ COURSES ════════════ */}
      <section id="courses" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-2xl opacity-60 transform-gpu" />
        <div className="pointer-events-none absolute -z-10 bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-2xl opacity-50 transform-gpu" />
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12" data-reveal>
            <SectionHeader badge={<><svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> Our Programs</>} 
              title="Explore Our" highlight="Professional Courses"
              titleSize="text-2xl md:text-4xl"
              subtitle="Diploma, certificate, design, AI and software training programs built for real career growth." />
          </div>
            {/*
          <div className="mb-8 flex items-center justify-center">
            <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs sm:text-sm font-bold text-blue-800 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              <span>Special Offer: <span className="text-blue-900">10% OFF on all courses</span> • Limited <span className="text-blue-900">Time Offer</span></span>
            </div>
          </div>
           AI CARD BANNER 
          <div className="mb-10 relative overflow-hidden rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: "linear-gradient(135deg,#042C53 0%,#185FA5 60%,#378ADD 100%)" }}>
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 mb-3 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-orange-950">✨ New</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">Get Your AI Card</h3>
              <p className="mt-2 text-xs sm:text-sm text-blue-200 max-w-sm leading-relaxed">Unlock exclusive AI learning benefits, tools and resources. Activate today and power up your digital journey.</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3 flex-shrink-0">
              <a href="https://www.yaticorp.com/activate-ai-card" target="_blank" rel="noreferrer"
                className="rounded-xl bg-orange-400 px-5 py-2.5 font-bold text-orange-950 text-sm whitespace-nowrap transition-all hover:bg-orange-300 hover:-translate-y-0.5">Activate AI Card</a>
              <a href="https://www.yaticorp.com/AI-Card" target="_blank" rel="noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 font-bold text-white text-sm whitespace-nowrap transition-all hover:bg-white/20 hover:-translate-y-0.5">Know More →</a>
            </div>
          </div> */}

          {/* CATEGORY FILTER */}
          <div className="mb-10 flex flex-wrap justify-center gap-2.5 px-2 sm:px-0">
            {courseCategories.map((cat) => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setShowAllCourses(false); }}
                className={`whitespace-nowrap rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${activeCategory === cat
                  ? "bg-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                  }`}>
                {cat}
              </button>
            ))}
          </div>


          {/* FIXED CATEGORY SWITCH */}
          <div key={activeCategory} className="anim-fadeInUp">

            {/* ================= NORMAL COURSES ================= */}
            {activeCategory !== "Individual Courses" && displayedCourses.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {(activeCategory === "All" && !showAllCourses ? displayedCourses.slice(0, 4) : displayedCourses).map((course, i) => (
                    <article
                      key={course.id}
                      className="group flex flex-col rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-blue-100 transition-all duration-300 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                      style={{ animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={course.image || "/images/hero.jpg"}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 scale-110 pointer-events-none transform-gpu"
                          aria-hidden="true"
                        />
                        <img
                          src={course.image || "/images/hero.jpg"}
                          alt={course.title}
                          loading="lazy"
                          className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute bottom-4 left-4 z-30 flex gap-2">
                          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                            ⏱ {course.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 p-6">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2 line-clamp-1">{course.category}</p>
                        <h4 className="text-base font-black text-slate-900 leading-snug mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {course.title}
                        </h4>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">View Details</span>
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {activeCategory === "All" && displayedCourses.length > 4 && (
                  <div className="mt-10 flex justify-center mb-14">
                    {!showAllCourses ? (
                      <button
                        onClick={() => setShowAllCourses(true)}
                        className="group flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-700 px-8 py-3.5 text-sm font-bold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all shadow-sm hover:shadow-md"
                      >
                        View All Courses
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowAllCourses(false);
                          document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-700 px-8 py-3.5 text-sm font-bold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all shadow-sm hover:shadow-md"
                      >
                        Show Less
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-y-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                      </button>
                    )}
                  </div>
                )}
                {!(activeCategory === "All" && displayedCourses.length > 4) && <div className="mb-14" />}
              </>
            )}

            {/* ================= INDIVIDUAL COURSES ================= */}
            {activeCategory === "Individual Courses" && (
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 sm:p-10 mb-14" style={{ animation: `fadeInUp 0.6s ease both` }}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/50 to-orange-50/50 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Focused Training
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Individual <span className="text-blue-700">Courses</span></h3>
                      <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-lg">
                        Learn specific software skills quickly. Flexible, fast-paced, and highly focused practical training.
                      </p>
                    </div>
                    <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700 hover:shadow-lg transition-all hover:-translate-y-0.5">
                      💬 Enquire Now
                    </a>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 rounded-3xl p-6 sm:p-8 border border-slate-100/50">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600 text-lg">💻</span> Software Taught
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {INDIVIDUAL_COURSES.map((c) => (
                          <span key={c} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-6 sm:p-8 border border-slate-100/50">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-orange-500 text-lg">🎯</span> Career Outcomes
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {INDIVIDUAL_CAREERS.map((c) => (
                          <span key={c} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════ GALLERY ════════════ */}
      <section id="gallery" className="scroll-mt-24 bg-white py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden ...">
        {/* Modern Decorative Accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-[80px] transform-gpu" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-50 rounded-full blur-[80px] transform-gpu" />
        </div>

        <div className="mx-auto max-w-7xl relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20" data-reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" /> Corporate Showcase
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.1]">
                The Heart of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Gurukula Excellence</span>
              </h2>
              <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
                Witness the professional environment where future technology leaders are forged.
              </p>
            </div>

            <div className="flex items-center gap-10 border-l-4 border-blue-600 pl-8 py-2">
              <div>
                <p className="text-4xl font-black text-slate-900">1000+</p>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">Students Trained</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">100%</p>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">Practical Focus</p>
              </div>
            </div>
          </div>

          <GalleryGrid onOpen={setLightbox} />
        </div>
      </section>

      {/* ════════════ AI CARD SECTION (UPGRADED) ════════════ */}
      <section id="aicard" className="relative isolate overflow-hidden py-24 sm:py-32">
        {/* Modern Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-[#020617]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,#1e3a8a_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#1e40af_0%,transparent_50%),radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Content Left */}
            <div data-reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                Yaticorp Authorized Partner
              </div>

              <h2 className="mt-8 text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Next-Gen AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Learning Card</span>
              </h2>

              <div className="mt-8 max-w-lg h-[180px] sm:h-[140px]" style={{ perspective: "1000px" }}>
                <div 
                  className="relative w-full h-full transition-transform duration-700 ease-out" 
                  style={{ transformStyle: "preserve-3d", transform: aiFlip === 0 ? "rotateY(0deg)" : "rotateY(180deg)" }}
                >
                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 flex items-center shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      Unlock the future with the World&apos;s first AI Learning Card. One-time access to 50+ tools, professional certificates, and a global tech community.
                    </p>
                  </div>
                  
                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 sm:p-6 flex items-center shadow-2xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                      <strong className="text-white">Hybrid Learning:</strong> Structured theory combined with intensive hands-on practical sessions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="https://www.yaticorp.com/ai-card" target="_blank" className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-2xl shadow-blue-500/20 hover:bg-blue-500 hover:-translate-y-1 transition-all">
                  Get Started Now
                </a>
                <a href="https://wa.me/916366564639" target="_blank" className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 font-bold text-white hover:bg-white/10 transition-all">
                  Ask for Details
                </a>
              </div>
            </div>

            {/* Interactive Card Right */}
            <div className="relative group mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-md perspective" style={{ perspective: "1000px" }} data-reveal data-reveal-delay="200ms">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500 to-emerald-500 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40 group-hover:duration-200" />

              {/* 3D Spinning Container */}
              <div className="relative w-full aspect-[1.586/1] animate-spin-3d" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-slate-900" style={{ backfaceVisibility: 'hidden' }}>
                  <img src="/images/card/ai-card-front.jpg" alt="AI Card Front" className="w-full h-full object-cover" loading="lazy" />
                  {/* Glare Effect */}
                  <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glare pointer-events-none" />
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-slate-900" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <img src="/images/card/ai-card-back.png" alt="AI Card Back" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Feature Section */}
          <div className="mt-24 sm:mt-32 max-w-5xl mx-auto px-4 sm:px-6" data-reveal>
            {/* Authorization Block */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#162142] to-[#0b1228] p-8 sm:p-12 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:40px_40px]" />
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none blur-3xl" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Text Content */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Official Partner
                  </div>
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Authorized by <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Yaticorp</span>
                  </h4>
                  <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
                    Gurukula is the official training partner for the Belthangady region, providing verified AI Card distribution and dedicated career support.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <a href={certificateImg} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      View Certificate
                    </a>
                    <span className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 backdrop-blur-md whitespace-nowrap">
                      Issued: 23 Feb 2026
                    </span>
                  </div>
                </div>

                {/* Certificate Image */}
                <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[340px] lg:w-[380px] lg:max-w-none relative group/cert">
                  
                  <div className="relative bg-white rounded-[2rem] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover/cert:-translate-y-2 border border-slate-100 lg:rotate-2 group-hover/cert:rotate-0">
                    <div className="relative overflow-hidden rounded-xl border border-slate-100/50">
                      <img src={certificateImg} alt="Certificate of Authorization" className="w-full h-auto object-contain" loading="lazy" />
                    </div>
                    
                    {/* Floating Badge on Certificate */}
                    <div className="absolute -bottom-5 -left-5 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl flex items-center gap-3 anim-float hidden sm:flex">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
                        <p className="text-sm font-black text-white">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════ TESTIMONIALS ════════════ */}
      <section id="testimonials" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-72 h-72 bg-blue-50 rounded-full blur-2xl opacity-60 transform-gpu" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-orange-50 rounded-full blur-2xl opacity-50 transform-gpu" />
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-14" data-reveal>
            <SectionHeader badge="⭐ Student Reviews" title="What Our" highlight="Students Say"
              subtitle="Hear from students who trained at Gurukula and built successful careers in the digital world." />
          </div>

          {/* VIDEO REVIEWS */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-10 mb-10 sm:mb-14 px-4" data-reveal data-reveal-delay="50ms">
            <div className="w-full max-w-[280px] sm:max-w-sm rounded-3xl overflow-hidden shadow-xl border-4 border-white hover:-translate-y-2 transition-all duration-300 bg-black">
              <video 
                ref={reviewVideo1Ref}
                onPlay={() => handleReviewPlay(1)}
                src="/review/review1.mp4" 
                controls 
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                preload="metadata"
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitTouchCallout: 'none' }}
                className="w-full h-auto block"
              ></video>
            </div>
            <div className="w-full max-w-[280px] sm:max-w-sm rounded-3xl overflow-hidden shadow-xl border-4 border-white hover:-translate-y-2 transition-all duration-300 bg-black">
              <video 
                ref={reviewVideo2Ref}
                onPlay={() => handleReviewPlay(2)}
                src="/review/review2.mp4" 
                controls 
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                preload="metadata"
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitTouchCallout: 'none' }}
                className="w-full h-auto block"
              ></video>
            </div>
          </div>

          <div data-reveal data-reveal-delay="100ms">
            <TestimonialSlider testimonials={TESTIMONIALS} />
          </div>
          <div data-reveal data-reveal-delay="200ms"
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white border border-slate-200 rounded-2xl px-4 sm:px-8 py-6">
            {[
              { val: "4.9", label: "Overall Rating", extra: <Stars size={12} /> },
              { val: "1000+", label: "Students Trained" },
              { val: "98%", label: "Satisfaction Rate" },
              { val: "1+", label: "Years of Excellence" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-4xl font-black text-slate-900">{s.val}</p>
                {s.extra && <div className="flex justify-center mt-1">{s.extra}</div>}
                <p className="text-xs text-slate-500 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ SECTION (REDESIGNED) ════════════ */}
      <section id="faq" className="scroll-mt-24 px-4 py-24 sm:px-8 bg-white relative overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="mx-auto max-w-4xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div data-reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Knowledge Base
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Common <span className="text-blue-700">Questions</span>
              </h2>
              <p className="mt-6 text-lg text-slate-500 font-medium leading-relaxed">
                Everything you need to know about our certifications, training methodology, and career support.
              </p>
            </div>

            {/* Support Card */}
            <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
              style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
              <div className="relative z-10">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">Need more help?</p>
                <h3 className="text-xl font-black mb-4">Contact Admissions</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed mb-8">
                  Our counselors are available Mon-Sat to help you choose the right course.
                </p>
                <a href="https://wa.me/916366564639" target="_blank"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} data-reveal data-reveal-delay={`${i * 100}ms`}
                  className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${isOpen ? "border-blue-200 bg-blue-50/30 shadow-xl shadow-blue-900/5" : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg"
                    }`}>
                  <button className="flex w-full items-center justify-between px-8 py-6 text-left"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                    <span className={`text-lg font-black tracking-tight transition-colors duration-300 ${isOpen ? "text-blue-700" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-8 pb-8">
                        <div className="w-full h-px bg-slate-200/50 mb-6" />
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-3xl">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" className="scroll-mt-24 bg-slate-50 px-4 py-24 sm:px-8 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-2xl opacity-60 transform-gpu" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-orange-100/40 rounded-full blur-2xl opacity-60 transform-gpu" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-16" data-reveal>
            <SectionHeader
              badge="Connect With Us"
              title="Professional"
              highlight="Support"
              subtitle="Our team is here to help you choose the right path for your digital career."
              center={true}
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">

            {/* LEFT COLUMN: INFO CARDS */}
            <div className="space-y-8">

              {/* Primary Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    label: "Phone Support",
                    val: "+91 6366564639",
                    link: "tel:916366564639",
                    bg: "bg-indigo-600"
                  },
                  {
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                    label: "WhatsApp Business",
                    val: "Chat with us",
                    link: "https://wa.me/916366564639",
                    bg: "bg-emerald-500"
                  },
                  {
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    label: "Visit Campus",
                    val: "Belthangady, KA",
                    link: "https://maps.google.com",
                    bg: "bg-amber-500"
                  },
                  {
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    label: "Email Enquiries",
                    val: "Contact via Web",
                    link: "https://wa.me/916366564639",
                    bg: "bg-slate-800"
                  },
                ].map((item) => (
                  <a key={item.label} href={item.link} target={item.link.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                    className="group bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Detailed Location */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors duration-500 transform-gpu" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800">Institute Location</h3>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                    Shri Gurusanidhya Building, Near Bharat Petrol Pump, <br className="hidden sm:block" />
                    Belthangady – 574214, Karnataka
                  </p>

                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-slate-700">+91 63665 64639</p>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 border border-blue-100/50 rounded-[2rem] p-6 sm:p-8 shadow-[0_10px_40px_rgba(37,99,235,0.05)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/20 transition-colors duration-500 transform-gpu" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-indigo-400/20 transition-colors duration-500 transform-gpu" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800">
                      Send a Message
                    </h3>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    const name = fd.get('name');
                    const msg = fd.get('message');
                    const text = encodeURIComponent(`Hello Gurukula, my name is ${name}.\n\n${msg}`);
                    window.open(`https://wa.me/916366564639?text=${text}`, '_blank');
                  }} className="space-y-4">
                    <input required name="name" type="text" placeholder="Your Name" className="w-full bg-white border-0 rounded-xl px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)]" />
                    <textarea required name="message" rows="3" placeholder="How can we help you?" className="w-full bg-white border-0 rounded-xl px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-[0_4px_20px_rgba(0,0,0,0.03)]"></textarea>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 mt-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MAP & HOURS */}
            <div className="space-y-6">

              {/* Working Hours Card */}
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-slate-900 relative overflow-hidden shadow-sm group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors duration-500 transform-gpu" />
                <div className="relative z-10">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 mb-6 flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      Operation Hours
                    </span>
                    {isInstituteOpen ? (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-200">
                        ● Opened
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-600 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-red-200">
                        ● Closed
                      </span>
                    )}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { day: "Mon – Sat", time: "9:00 AM – 5:30 PM", active: currentDay >= 1 && currentDay <= 6 },
                      { day: "Sunday", time: "Closed", active: currentDay === 0 },
                    ].map((h) => (
                      <div key={h.day} className={`flex items-center justify-between p-4 rounded-2xl border ${h.active ? "bg-slate-50 border-slate-100" : "border-slate-100 opacity-60"}`}>
                        <span className="text-sm font-bold text-slate-700">{h.day}</span>
                        <span className={`text-sm font-bold ${h.active && h.time !== "Closed" ? "text-blue-600" : "text-slate-400"}`}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative group h-[400px] lg:h-[450px]">
                <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity transform-gpu" />
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                  <iframe className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3756852431713!2d75.29749597587844!3d12.883584816812836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bb2d244458f3%3A0x67825d19760737a3!2sGurukula%20Computer%20Training%20Centre!5e0!3m2!1sen!2sin!4v1714467000000!5m2!1sen!2sin" loading="lazy" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ════════════ FLOATING UI ════════════ */}
      {/* WhatsApp FAB */}
      {/*
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 group">
        <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none select-none">
          Chat with us 👋
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] anim-ping opacity-25" />
          <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer" aria-label="WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center shadow-lg shadow-green-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </div>
      </div>*/}

      {/* FIX: Back-to-top — always in DOM, shown/hidden via opacity by useScrollTopBtn.
          No conditional render = no React reconciliation on scroll */}
      <button id="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-5 z-50 w-11 h-11 rounded-full bg-slate-900 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ opacity: 0, pointerEvents: "none", transition: "opacity 0.3s ease" }}
        aria-label="Back to top">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* ── MODALS ── */}
      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      {lightbox && <Lightbox photo={lightbox} onClose={lbClose} onPrev={lbPrev} onNext={lbNext} />}

      <Footer />
    </div>
  );
}