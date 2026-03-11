import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, ArrowUpRight } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 md:py-64 relative overflow-hidden bg-transparent" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Stunning Experience Counter */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square flex items-center justify-center"
            >
              {/* Spinning Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
              />
              
              <div className="text-center z-10">
                <motion.span 
                  className="text-[12rem] md:text-[15rem] font-black leading-none text-white block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                  05
                </motion.span>
                <span className="text-primary text-2xl font-black uppercase tracking-[0.5em] -mt-10 block">
                  Years+
                </span>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            </motion.div>
          </div>

          {/* Right: Minimal Content */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 text-primary"
            >
              <Zap className="w-6 h-6 fill-primary" />
              <span className="text-sm font-black uppercase tracking-[0.6em]">The Manifesto</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-white uppercase tracking-tighter"
            >
              Architecting <span className="text-primary">Digital</span> <br />
              Precision with <br />
              Artistic <span className="italic underline decoration-primary/50">Flair.</span>
            </motion.h2>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="space-y-8"
            >
               <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
                 I bridge the gap between imagination and reality. Based in Dubai, I build high-performance applications where <span className="text-white">aesthetic design meets military-grade logic.</span>
               </p>

               <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Core Stack</h4>
                    <p className="text-white/60 font-mono text-sm leading-loose">
                      React.js / Next.js / Node.js <br />
                      PHP (CodeIgniter) / SQL / JS
                    </p>
                  </div>
                  <div>
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Location</h4>
                    <p className="text-white/60 font-mono text-sm leading-loose">
                      Dubai, United Arab Emirates <br />
                      Available Globally
                    </p>
                  </div>
               </div>
            </motion.div>

            <motion.button 
               whileHover={{ x: 10 }}
               className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-xs pt-4 group"
            >
               View full history <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 select-none pointer-events-none overflow-hidden">
        <span className="text-[15vw] font-black text-white/[0.02] leading-none whitespace-nowrap">
          MOHAMMED JAISIL
        </span>
      </div>
    </section>
  );
};

export default About;
