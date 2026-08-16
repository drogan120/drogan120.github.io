import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
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
import Reveal from "@/components/shared/Reveal";
import { AuroraBackdrop } from "./Chrome";

export default function AuroraTemplate() {
  return (
    <>
      <AuroraBackdrop />
      <Navbar />

      <main className="flex-1">
        {/* Hero and Marquee opt out of Reveal: the hero animates itself with
            per-word rises, and the rail is already in motion, so fading them
            in would just delay the first paint of content. */}
        <Hero />
        <Marquee />

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
          <Github />
        </Reveal>
        <Reveal>
          <Blog />
        </Reveal>
        <Reveal>
          <Gallery />
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
