import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Step icons — only CSS-safe transforms (scale, opacity, rotate, x, y) ──────

const DiscoveryIcon = () => (
  <svg viewBox="0 0 56 56" className="w-8 h-8" fill="none">
    <circle cx="26" cy="26" r="13" stroke="hsl(var(--primary))" strokeWidth="2.5" />
    <line x1="35" y1="35" x2="46" y2="46" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
    {/* Pulsing inner dot */}
    <motion.circle cx="26" cy="26" r="5" fill="hsl(var(--primary))"
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
      style={{ originX: "26px", originY: "26px" }}
      transition={{ duration: 2, repeat: Infinity }} />
    {/* Ripple ring */}
    <motion.circle cx="26" cy="26" r="10" stroke="hsl(var(--primary)/0.35)" strokeWidth="1.5" fill="none"
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      style={{ originX: "26px", originY: "26px" }}
      transition={{ duration: 2, repeat: Infinity }} />
    {/* Outer ring pulse */}
    <motion.circle cx="26" cy="26" r="13" stroke="hsl(var(--primary)/0.2)" strokeWidth="1" fill="none"
      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
      style={{ originX: "26px", originY: "26px" }}
      transition={{ duration: 2.5, repeat: Infinity }} />
  </svg>
);

const KickoffIcon = () => (
  <svg viewBox="0 0 56 56" className="w-8 h-8" fill="none">
    {/* Rocket body — bobs up/down */}
    <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
      <path
        d="M28 44 C28 44 17 33 17 23 C17 16.4 21.9 11 28 11 C34.1 11 39 16.4 39 23 C39 33 28 44 28 44Z"
        stroke="hsl(var(--primary))" strokeWidth="2.5" fill="hsl(var(--primary)/0.1)" />
      <circle cx="28" cy="23" r="5" fill="hsl(var(--primary))" />
    </motion.g>
    {/* Left exhaust particle */}
    <motion.circle cx="21" cy="33" r="2.5" fill="hsl(var(--primary)/0.5)"
      animate={{ opacity: [0, 1, 0], y: [0, 8, 16], scale: [1, 0.6, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }} />
    {/* Right exhaust particle */}
    <motion.circle cx="35" cy="33" r="2" fill="hsl(var(--primary)/0.35)"
      animate={{ opacity: [0, 1, 0], y: [0, 8, 16], scale: [1, 0.5, 0] }}
      transition={{ duration: 1.4, delay: 0.3, repeat: Infinity, ease: "easeIn" }} />
  </svg>
);

const RefineIcon = () => (
  <svg viewBox="0 0 56 56" className="w-8 h-8" fill="none">
    {/* Full ring that spins */}
    <motion.g animate={{ rotate: 360 }} style={{ originX: "28px", originY: "28px" }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}>
      <path d="M15 28 C15 20.3 20.8 14 28 14" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M41 28 C41 35.7 35.2 42 28 42" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="13,11 13,19 21,15" fill="hsl(var(--primary))" />
      <polygon points="43,37 43,45 35,41" fill="hsl(var(--primary))" />
    </motion.g>
    {/* Centre pulse */}
    <motion.circle cx="28" cy="28" r="5" fill="hsl(var(--primary)/0.5)"
      animate={{ scale: [1, 1.4, 1] }}
      style={{ originX: "28px", originY: "28px" }}
      transition={{ duration: 1.2, repeat: Infinity }} />
  </svg>
);

const GrowIcon = () => (
  <svg viewBox="0 0 56 56" className="w-8 h-8" fill="none">
    {/* Chart line draws itself */}
    <motion.polyline points="8,44 20,30 30,36 46,14"
      stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }} />
    {/* Arrow head */}
    <motion.polygon points="46,14 39,17 43,22" fill="hsl(var(--primary))"
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }} />
    {/* Data point dots */}
    {([[8,44],[20,30],[30,36],[46,14]] as [number,number][]).map(([cx,cy], i) => (
      <motion.circle key={i} cx={cx} cy={cy} r="3.5" fill="hsl(var(--primary))"
        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.6] }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
        transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 0.5 }} />
    ))}
  </svg>
);

const steps = [
  { id: "01", title: "Discovery Phase",  description: "Understanding your goals, pain points, audience, and what sets you apart.",                   Icon: DiscoveryIcon },
  { id: "02", title: "Project Kickoff",  description: "Setting up projects, aligning on scope and milestones, and diving into the work.",            Icon: KickoffIcon  },
  { id: "03", title: "Receive & Refine", description: "Sharing initial designs, gathering feedback, and fine-tuning every detail together.",          Icon: RefineIcon   },
  { id: "04", title: "Continue & Grow",  description: "Launching with confidence and providing ongoing support for your next moves.",                 Icon: GrowIcon     },
];

// ── Traveling dot connector (desktop only) ────────────────────────────────────
const Connector = ({ delay }: { delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="hidden lg:flex items-center flex-shrink-0 w-12 xl:w-20 mt-[88px]">
      <div className="relative w-full h-[2px]">
        <div className="absolute inset-0 bg-border rounded-full" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/60 to-primary rounded-full"
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
          style={{ boxShadow: "0 0 10px 3px hsl(var(--primary)/0.7)" }}
          initial={{ left: "0%", opacity: 0 }}
          animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 1.1, delay: delay + 0.3, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 -translate-y-1/2 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="block text-muted-foreground text-xs uppercase tracking-[0.3em] mb-4"
        >(PROCESS)</motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 lg:mb-20"
        >HOW I WORK</motion.h2>

        {/* ── Desktop: horizontal flow ── */}
        <div className="hidden lg:flex items-start">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="flex-1 min-w-0 relative group"
              >
                {/* Ghost number */}
                <span className="absolute -top-4 -left-1 text-[5.5rem] font-black text-foreground/[0.04] leading-none select-none pointer-events-none">
                  {step.id}
                </span>

                <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 overflow-hidden group-hover:border-primary/40 transition-colors duration-300">
                  {/* Gradient top accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Icon */}
                  <div className="relative mb-5">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                      animate={{ boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 20px hsl(var(--primary)/0.25)", "0 0 0px hsl(var(--primary)/0)"] }}
                      transition={{ duration: 3, delay: index * 0.6, repeat: Infinity }}
                    >
                      <step.Icon />
                    </motion.div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[9px] font-black text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2 leading-snug">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && <Connector delay={0.55 + index * 0.18} />}
            </div>
          ))}
        </div>

        {/* ── Mobile & tablet: vertical timeline ── */}
        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-4 sm:gap-6">
              {/* Spine */}
              <div className="flex flex-col items-center flex-shrink-0 w-10">
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center flex-shrink-0 z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.15, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    animate={{ boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 14px hsl(var(--primary)/0.5)", "0 0 0px hsl(var(--primary)/0)"] }}
                    transition={{ duration: 2.5, delay: index * 0.5, repeat: Infinity }}
                  >
                    <span className="text-xs font-black text-primary">{index + 1}</span>
                  </motion.div>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="relative w-[2px] flex-1 bg-border my-1 overflow-hidden min-h-[40px]">
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-primary/20"
                      initial={{ height: "0%" }}
                      animate={isInView ? { height: "100%" } : {}}
                      transition={{ duration: 0.6, delay: 0.35 + index * 0.2 }}
                    />
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px 2px hsl(var(--primary)/0.7)" }}
                      animate={{ top: ["-8px", "108%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.5, delay: 0.6 + index * 0.2, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </div>
                )}
              </div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-0 pb-8 last:pb-0"
              >
                <div className="relative rounded-2xl border border-border bg-card/60 p-5 overflow-hidden">
                  <span className="absolute top-2 right-4 text-6xl font-black text-foreground/[0.05] leading-none select-none">
                    {step.id}
                  </span>
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 + index * 0.15 }}
                  />
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <step.Icon />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">A clear process keeps every project on time and on budget.</p>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <motion.div key={i} className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
