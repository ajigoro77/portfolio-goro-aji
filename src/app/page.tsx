import About from '@/components/modern/About';
import Contact from '@/components/modern/Contact';
import FloatingAI from '@/components/modern/FloatingAI';
import Hero from '@/components/modern/Hero';
import Journey from '@/components/modern/Journey';
import Navbar from '@/components/modern/Navbar';
import Projects from '@/components/modern/Projects';
import Skills from '@/components/modern/Skills';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070b] text-white selection:bg-indigo-500/40">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <FloatingAI />
    </div>
  );
}
