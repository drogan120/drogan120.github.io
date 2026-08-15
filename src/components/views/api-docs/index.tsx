import Sidebar from "./Sidebar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

export default function ApiDocsView() {
  return (
    <div className="min-h-screen md:pl-72">
      <Sidebar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
