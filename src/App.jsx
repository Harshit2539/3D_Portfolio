import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

function App() {

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
