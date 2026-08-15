import Sidebar from "./Sidebar";
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

export default function ApiDocsView() {
  return (
    <div className="min-h-screen md:pl-72">
      <Sidebar />
      <main className="min-h-screen">
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
    </div>
  );
}
