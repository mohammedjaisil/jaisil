import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "10+", label: "Successful projects completed" },
    { value: "3+", label: "Years of experience in web development" },
    { value: "100%", label: "Customer satisfaction rate" },
    { value: "5+", label: "Happy clients served" },
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
          <span className="text-muted-foreground text-sm uppercase tracking-widest">(WHY ME)</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          NUMBERS DON'T LIE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mb-16"
        >
          With expertise in full-stack development, I craft modern websites and high-impact digital experiences that get results.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-8 md:p-12 bg-white/5 rounded-2xl border border-border"
        >
          <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
            "Working with Jaisil felt personal.{" "}
            <span className="text-primary">The process was smooth, the design was stunning, and everything had meaning.</span>"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div>
              <p className="font-semibold">Happy Client</p>
              <p className="text-sm text-muted-foreground">Business Owner</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
