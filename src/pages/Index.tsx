import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Mohammed Jaisil | Full-Stack Web Developer in Dubai</title>
        <meta
          name="description"
          content="Mohammed Jaisil is a Full-Stack Web Developer based in Dubai, UAE. Building modern, responsive websites and digital experiences with intention, clarity and care."
        />
        <meta name="keywords" content="web developer, full-stack developer, React developer, PHP developer, Dubai, UAE, Mohammed Jaisil" />
        <link rel="canonical" href="https://mohammedjaisil.dev" />
      </Helmet>

      <div className="min-h-screen relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Works />
          <Stats />
          <Services />
          <Process />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
