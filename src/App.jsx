import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext";
import MyNavbar from "./components/MyNavbar";
import GlobalBackground3D from "./components/GlobalBackground3D"; // ← جديد
import "./App.css";

const Hero        = lazy(() => import("./components/Hero"));
const Education   = lazy(() => import("./components/Education"));
const WorkExperience = lazy(() => import("./components/WorkExperience"));
const Skills      = lazy(() => import("./components/Skills"));
const Projects    = lazy(() => import("./components/Projects"));
const Certificates = lazy(() => import("./components/Certificates"));
const About       = lazy(() => import("./components/About"));
const Contact     = lazy(() => import("./components/Contact"));
const Footer      = lazy(() => import("./components/Footer"));

const Loader = () => (
  <div className="professional-loader">
    <div className="loader-content">
      <div className="loader-image">
        <div className="image-circle">
          <img src="src/assets/moi.jpg" alt="Loading" />
        </div>
      </div>

      <div className="loader-progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>

        {/* ── الخلفية 3D للموقع كله ── */}
        <GlobalBackground3D />

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