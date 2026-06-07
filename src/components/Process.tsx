import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery Phase",
    description: "Understanding your goals, pain points, audience, and what sets you apart.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <motion.circle cx="22" cy="22" r="12" stroke="hsl(var(--primary))" strokeWidth="2.5"
          animate={{ r: [12, 13.5, 12] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.line x1="30" y1="30" x2="40" y2="40" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"
          animate={{ x2: [40, 42, 40], y2: [40, 42, 40] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="22" cy="22" r="5" fill="hsl(var(--primary)/0.3)"
          animate={{ r: [5, 7, 5], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="22" cy="22" r="2" fill="hsl(var(--primary))"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Project Kickoff",
    description: "Setting up projects, aligning on scope and milestones, and diving into the work.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <motion.path
          d="M24 38 C24 38 14 28 14 20 C14 14.5 18.5 10 24 10 C29.5 10 34 14.5 34 20 C34 28 24 38 24 38Z"
          stroke="hsl(var(--primary))" strokeWidth="2.5" fill="hsl(var(--primary)/0.1)"
          animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.path d="M20 24 L16 30 L12 26" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          animate={{ opacity: [0, 1, 0], y: [0, 4, 8] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <circle cx="24" cy="20" r="4" fill="hsl(var(--primary))" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Receive & Refine",
    description: "Sharing initial designs, gathering feedback, and fine-tuning together.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <motion.path d="M14 24 C14 18 18.5 13 24 13"
          stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"
          animate={{ rotate: 360 }} style={{ originX: "50%", originY: "50%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M34 24 C34 30 29.5 35 24 35"
          stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"
          animate={{ rotate: 360 }} style={{ originX: "50%", originY: "50%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.polygon points="12,11 12,17 18,14"
          fill="hsl(var(--primary))"
          animate={{ rotate: 360 }} style={{ originX: "50%", originY: "50%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.polygon points="36,31 36,37 30,34"
          fill="hsl(var(--primary))"
          animate={{ rotate: 360 }} style={{ originX: "50%", originY: "50%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.circle cx="24" cy="24" r="3" fill="hsl(var(--primary)/0.4)"
          animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Continue & Grow",
    description: "Launching with confidence and supporting your next moves.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <motion.polyline points="8,36 18,24 26,30 38,12"
          stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }} />
        <motion.polygon points="38,12 32,14 36,18"
          fill="hsl(var(--primary))"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }} />
        {[8, 18, 28, 38].map((x, i) => (
          <motion.circle key={i} cx={x} cy={36 - i * 8} r="2.5"
            fill="hsl(var(--primary)/0.4)"
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.4] }}
            transition={{ duration: 2.5, delay: (i * 0.5), repeat: Infinity, repeatDelay: 0.5 }} />
        ))}
      </svg>
    ),
  },
];

// Connector line between cards (desktop only)
const Connector = ({ delay }: { delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center flex-1 mt-[-60px]">
      <svg viewBox="0 0 80 12" className="w-full" fill="none">
        <motion.line x1="0" y1="6" x2="80" y2="6"
          stroke="hsl(var(--primary)/0.3)" strokeWidth="1" strokeDasharray="4 4" />
        <motion.line x1="0" y1="6" x2="80" y2="6"
          stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay }} />
        <motion.polygon points="76,3 80,6 76,9"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.7 }} />
      </svg>
    </div>
  );
};

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-card/30 backdrop-blur-md" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-muted-foreground text-sm uppercase tracking-widest">(PROCESS)</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16"
        >
          HOW I WORK
        </motion.h2>

        {/* Workflow row */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex lg:flex-col lg:flex-1 items-start lg:items-center gap-4 lg:gap-0">

              {/* Mobile: vertical connector above (except first) */}
              {index > 0 && (
                <div className="lg:hidden flex flex-col items-center self-stretch mt-1 mr-6">
                  <motion.div
                    className="w-px bg-primary/50 flex-1 min-h-[32px]"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  />
                </div>
              )}

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.18, ease: "easeOut" }}
                className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-4 lg:text-center w-full lg:px-4"
              >
                {/* Icon circle */}
                <motion.div
                  className="shrink-0 w-16 h-16 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center"
                  whileHover={{ scale: 1.08, borderColor: "hsl(var(--primary)/0.6)" }}
                  animate={{ boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 18px hsl(var(--primary)/0.2)", "0 0 0px hsl(var(--primary)/0)"] }}
                  transition={{ duration: 3, delay: index * 0.5, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>

                {/* Text */}
                <div className="flex-1 lg:flex-none">
                  <div className="flex items-center gap-2 mb-2 lg:justify-center">
                    <span className="text-xs font-bold text-primary tracking-widest">STEP {step.id}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>

              {/* Desktop: animated arrow connector after card (except last) */}
              {index < steps.length - 1 && (
                <Connector delay={0.5 + index * 0.25} />
              )}
            </div>
          ))}
        </div>

        {/* Bottom progress bar */}
        <div className="mt-16 h-px bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.6, delay: 1, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {steps.map((s) => (
            <motion.span key={s.id}
              className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}>
              {s.title}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
