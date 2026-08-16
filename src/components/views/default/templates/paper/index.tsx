import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Stats from "./Stats";
import Achievements from "./Achievements";
import Hobbies from "./Hobbies";
import Github from "./Github";
import Blog from "./Blog";
import Gallery from "./Gallery";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import { PaperBackdrop } from "./Chrome";

export default function PaperTemplate() {
  return (
    <>
      <PaperBackdrop />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Stats />
        <Achievements />
        <Hobbies />
        <Github />
        <Blog />
        <Gallery />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}