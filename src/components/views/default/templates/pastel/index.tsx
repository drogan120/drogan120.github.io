import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Stats from "./Stats";
import Achievements from "./Achievements";
import Hobbies from "./Hobbies";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import Reveal from "@/components/shared/Reveal";

export default function PastelTemplate() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <Achievements />
        </Reveal>
        <Reveal>
          <Hobbies />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
