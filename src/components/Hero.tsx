import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const dubaiTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentTime(dubaiTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background Image (The Eye) with cinematic treatment */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroPortrait} 
          alt="Vision" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Name and Description */}
          <div className="flex flex-col gap-10 flex-1 items-start lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="text-[14vw] lg:text-[11vw] font-black leading-[0.8] tracking-tighter text-white">
                JAISIL<span className="text-primary italic">.</span>
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="h-1.5 bg-primary mt-3"
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-md text-base md:text-lg text-white/50 font-medium leading-relaxed"
            >
              I build websites, web apps, and digital experiences <span className="text-white border-b border-primary pb-1">with intention, clarity and care.</span>
            </motion.p>
          </div>

          {/* Right Side: Heading, Status and CTA */}
          <div className="flex flex-col items-end gap-8 flex-1 text-right lg:pt-16">
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.3 }}
               className="flex flex-col items-end gap-2"
             >
                <div className="flex items-center gap-3 text-xs font-black tracking-[0.3em] uppercase mb-1 text-white">
                   <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_#ff5c00]" />
                   Available for project
                </div>
                <div className="text-[10px] text-primary font-mono tracking-widest uppercase bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20">
                   {currentTime} (GST+4)
                </div>
             </motion.div>

             <motion.h2 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.6 }}
               className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase text-white"
             >
               Beyond <br />
               <span className="text-primary">Visuals.</span> <br />
               Built with <br />
               <span className="italic text-primary">Vision.</span>
             </motion.h2>

             <motion.button
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 1 }}
               whileHover={{ scale: 1.05, backgroundColor: "#ff5c00", color: "white" }}
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               className="mt-2 px-10 py-5 bg-white text-black rounded-2xl flex items-center gap-5 text-xs font-black uppercase tracking-[0.3em] transition-all group hover:shadow-[0_0_40px_rgba(255,92,0,0.4)]"
             >
               START A PROJECT <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
             </motion.button>
          </div>
        </div>
      </div>

      {/* Trusted By Logos Marquee */}
      <div className="absolute bottom-0 w-full overflow-hidden py-10 border-t border-white/5 bg-black/10 backdrop-blur-sm">
         <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 mx-10">
                {['TechCorp', 'InnovateLab', 'DigitalFirst', 'WebStudio', 'CreativeHub'].map((logo, j) => (
                  <span key={j} className="text-sm font-black uppercase tracking-[0.5em] text-white/10 hover:text-primary/60 transition-all duration-300 cursor-default">
                    {logo}
                  </span>
                ))}
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Hero;
