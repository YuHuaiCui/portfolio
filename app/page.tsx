import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />

      {/* Drop the extra #home wrapper here */}
      <Hero />

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}
