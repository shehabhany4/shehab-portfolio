import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import MyNavbar from "./components/MyNavbar";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px",
      fontWeight: "600",
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <MyNavbar />
       
       <div className="whatsappicon">
        <a href="https://wa.me/201097820873" target="_blank"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
       </div>

      <Suspense fallback={<Loader />}>
        <Hero />
        <Education/>
        <WorkExperience />
        <Projects />
        <Certificates />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;