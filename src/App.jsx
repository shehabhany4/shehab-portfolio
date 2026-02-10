import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/ThemeContext";
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
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <div className="spinner-border text-dark" role="status" />
  </div>
);


function App() {
  return (
    <ThemeProvider>
      <MyNavbar />
       

      <Suspense fallback={<Loader />}>
        <Hero />
        <About />
        <Skills />
        <Education/>
        <WorkExperience />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;