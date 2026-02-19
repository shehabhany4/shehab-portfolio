import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext";
import MyNavbar from "./components/MyNavbar";
import "./App.css";

const Hero = lazy(() => import("./components/Hero"));
const Education = lazy(() => import("./components/Education"));
const WorkExperience = lazy(() => import("./components/WorkExperience"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Certificates = lazy(() => import("./components/Certificates"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const Loader = () => (
  <div className="professional-loader">
    <div className="loader-content">
      <div className="loader-icon">
        <div className="icon-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 18L22 12L16 6M8 6L2 12L8 18" />
          </svg>
        </div>
      </div>

      <div className="loader-text">
        <h3 className="loading-title">Loading</h3>
        <div className="loading-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
      </div>

      <div className="loader-progress">
        <div className="progress-bar"></div>
      </div>
    </div>

    <div className="loader-bg-effect effect-1"></div>
    <div className="loader-bg-effect effect-2"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MyNavbar />
        
        <Suspense fallback={<Loader />}>
          <Hero />
          <About />
          <Skills />
          <Education />
          <WorkExperience />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
        </Suspense>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;