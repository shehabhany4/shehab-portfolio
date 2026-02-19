import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";
import "./Navbar.css";
import logo from "../assets/MyLogo.webp";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

// ✅ FIX 1: نقلنا الـ hrefs برة الـ component عشان نتجنب مشكلة الـ useEffect
const NAV_HREFS = [
  "#home",
  "#about",
  "#skills",
  "#education",
  "#work",
  "#projects",
  "#certificates",
  "#contact",
];

const MyNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const navLinks = NAV_HREFS.map((href, i) => ({
    href,
    label: [
      t.nav.home,
      t.nav.about,
      t.nav.skills,
      t.nav.education,
      t.nav.experience,
      t.nav.projects,
      t.nav.certificates,
      t.nav.contact,
    ][i],
  }));

  // ✅ FIX 1: useEffect للـ scroll بيستخدم NAV_HREFS الثابتة برة الـ component
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_HREFS.map((href) => document.querySelector(href));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_HREFS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // ✅ مش محتاجين language هنا تاني

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className={`my-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <a href="#home" className="navbar-logo" onClick={closeSidebar}>
            <div className="logo-wrapper">
              <img src={logo} alt="Shehab Hany" loading="lazy" />
              <div className="logo-glow"></div>
            </div>
          </a>

          <ul className="desktop-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href ? "active" : ""}`}
                >
                  {link.label}
                  <span className="link-dot"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            {/* Language Toggle Button */}
            <button
              className="lang-toggle"
              onClick={toggleLanguage}
              title={language === "en" ? "Switch to Arabic" : "التبديل للإنجليزية"}
              aria-label="Toggle language"
            >
              <span className="lang-icon">🌐</span>
              <span className="lang-text">{language === "en" ? "عربي" : "EN"}</span>
            </button>

            {/* ✅ FIX 4: بدلنا div بـ button عشان يكون accessible */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
            >
              <div className="toggle-track">
                <span className="toggle-icon toggle-icon-sun">☀️</span>
                <span className="toggle-icon toggle-icon-moon">🌙</span>
                <div className={`toggle-knob ${theme === "dark" ? "dark" : ""}`}></div>
              </div>
            </button>

            <button
              className={`hamburger ${sidebarOpen ? "open" : ""}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={sidebarOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="sidebar-header">
          <div className="sidebar-logo-wrapper">
            <img src={logo} alt="Shehab Hany" loading="lazy" />
            <div className="sidebar-logo-glow"></div>
          </div>
          <button
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <ul className="sidebar-nav-links">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              style={{ "--item-index": index }}
              className={sidebarOpen ? "animate-in" : ""}
            >
              <a
                href={link.href}
                className={`sidebar-link ${activeSection === link.href ? "active" : ""}`}
                onClick={closeSidebar}
              >
                <span className="link-icon">→</span>
                <span className="link-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Language Toggle in Sidebar */}
        <div className="sidebar-lang-toggle">
          <button className="lang-toggle lang-toggle--sidebar" onClick={toggleLanguage}>
            <span className="lang-icon">🌐</span>
            <span>{language === "en" ? "التبديل للعربية" : "Switch to English"}</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <p>Shehab Hany</p>
          <p className="footer-subtitle">Frontend Developer</p>
        </div>
      </aside>
    </>
  );
};

export default MyNavbar;