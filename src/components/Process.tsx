import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      id: "01",
      title: "Discovery Phase",
      description: "Understanding your goals, pain points, audience, and what sets you apart.",
    },
    {
      id: "02",
      title: "Project Kickoff",
      description: "Setting up projects, aligning on scope and milestones, and diving into the work.",
    },
    {
      id: "03",
      title: "Receive & Refine",
      description: "Sharing initial designs, gathering feedback, and fine-tuning together.",
    },
    {
      id: "04",
      title: "Continue & Grow",
      description: "Launching with confidence and supporting your next moves.",
    },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-card/30 backdrop-blur-md" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-muted-foreground text-sm uppercase tracking-widest">(PROCESS)</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
        >
          HOW I WORK
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-muted-foreground">STEP {step.id}</span>
                <span className="text-muted-foreground">.</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
