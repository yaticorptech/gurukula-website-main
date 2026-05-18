import { useState, useEffect } from "react";
import logo from "../images/logo.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const links = [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Courses", href: "/#courses" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      ></div>

      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "pt-2 sm:pt-4" : "pt-4 sm:pt-6"}`}>
        <header
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled
              ? "w-[95%] sm:w-[90%] max-w-6xl bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 rounded-full px-4 sm:px-6 py-2"
              : "w-[95%] sm:w-[92%] max-w-7xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 rounded-[2.5rem] px-5 sm:px-8 py-3"
            }`}
        >
          {/* Logo */}
          <a href="/#home" className="flex items-center flex-shrink-0 group relative z-50" onClick={closeMenu}>
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
              src={logo}
              alt="Gurukula Computer"
              className={`w-auto transition-all duration-500 relative z-10 ${scrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20'}`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-50/50 px-2 py-1.5 rounded-full border border-slate-200/50">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[15px] font-bold text-slate-600 hover:text-blue-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#aicard"
              className="relative flex items-center gap-2 text-[15px] font-bold text-slate-600 hover:text-blue-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm group"
            >
              AI Card
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] uppercase tracking-wider font-black px-2.5 py-0.5 rounded-full shadow-sm group-hover:shadow-md transition-all">
                New
              </span>
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://www.yaticorp.com/activate-ai-card"
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Activate AI Card
            </a>
            <a
              href="https://wa.me/916366564639"
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden relative z-50 flex flex-col justify-center items-center w-11 h-11 bg-slate-50 border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`bg-slate-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
            <span className={`bg-slate-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-slate-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-sm mt-4 lg:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${mobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[calc(100dvh-6rem)]">
            <div className="px-5 py-4 space-y-1 overflow-y-auto flex-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-4 py-2.5 text-[16px] sm:text-[17px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#aicard"
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-2.5 text-[16px] sm:text-[17px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors"
              >
                <span>AI Card</span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full shadow-sm">
                  New
                </span>
              </a>
            </div>
            <div className="p-4 sm:p-5 pb-8 sm:pb-8 bg-slate-50/80 border-t border-slate-100 space-y-2.5 flex-shrink-0">
              <a
                href="https://www.yaticorp.com/activate-ai-card"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center w-full bg-white border-2 border-blue-100 text-blue-700 font-bold py-2.5 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm text-[14px] sm:text-[15px]"
              >
                Activate AI Card
              </a>
              <a
                href="https://wa.me/916366564639"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2.5 rounded-xl shadow-md text-[14px] sm:text-[15px]"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
