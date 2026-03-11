import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
  sort_order: number;
}

// Animated counter
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 200 });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}%`;
    });
  }, [spring]);

  return <span ref={ref}>0%</span>;
};

// Circular ring progress indicator
const CircleSkill = ({ skill, delay }: { skill: Skill; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !animated) setAnimated(true);
  }, [isInView]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animated ? (skill.level / 100) * circumference : circumference);
  const gradientId = `grad-${skill.id}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative">
        <svg width="110" height="110" viewBox="0 0 110 110" className="rotate-[-90deg]">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Background ring */}
          <circle cx="55" cy="55" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          {/* Animated progress ring */}
          <motion.circle
            cx="55" cy="55" r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animated ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.4, delay: delay + 0.1, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)/0.4))" }}
          />
        </svg>

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center rotate-[90deg]">
          <span className="text-base font-bold text-foreground">
            {animated ? <Counter value={skill.level} /> : "0%"}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors">{skill.name}</span>
    </motion.div>
  );
};

// Horizontal bar skill
const BarSkill = ({ skill, delay }: { skill: Skill; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{skill.name}</span>
        <motion.span
          className="text-xs font-mono text-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.5))" }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState<Skill[]>([]);

  // Fallback static skills
  const fallbackSkills: Skill[] = [
    { id: "1", name: "React.js", level: 90, category: "Frontend", sort_order: 1 },
    { id: "2", name: "TypeScript", level: 82, category: "Frontend", sort_order: 2 },
    { id: "3", name: "Tailwind CSS", level: 92, category: "Frontend", sort_order: 3 },
    { id: "4", name: "Framer Motion", level: 75, category: "Frontend", sort_order: 4 },
    { id: "5", name: "PHP / CodeIgniter", level: 85, category: "Backend", sort_order: 5 },
    { id: "6", name: "Node.js", level: 70, category: "Backend", sort_order: 6 },
    { id: "7", name: "MySQL / PostgreSQL", level: 80, category: "Backend", sort_order: 7 },
    { id: "8", name: "REST APIs", level: 88, category: "Backend", sort_order: 8 },
    { id: "9", name: "Next.js", level: 78, category: "Tools", sort_order: 9 },
    { id: "10", name: "Git / GitHub", level: 85, category: "Tools", sort_order: 10 },
    { id: "11", name: "UI/UX Design", level: 72, category: "Tools", sort_order: 11 },
    { id: "12", name: "Figma", level: 68, category: "Tools", sort_order: 12 },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setSkills(data);
      } else {
        setSkills(fallbackSkills);
      }
    };
    fetchSkills();
  }, []);

  const displaySkills = skills.length > 0 ? skills : fallbackSkills;

  const frontendSkills = displaySkills.filter(s => s.category === "Frontend");
  const backendSkills = displaySkills.filter(s => s.category === "Backend");
  const toolSkills = displaySkills.filter(s => s.category === "Tools");

  // Floating particle
  const Particle = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/30"
      style={{ left: x, top: y }}
      animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay }}
    />
  );

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <Particle x="10%" y="20%" delay={0} />
        <Particle x="25%" y="70%" delay={0.5} />
        <Particle x="60%" y="15%" delay={1} />
        <Particle x="80%" y="60%" delay={1.5} />
        <Particle x="45%" y="85%" delay={0.8} />
        <Particle x="90%" y="30%" delay={2} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-muted-foreground text-sm uppercase tracking-widest">(SKILLS)</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          WHAT I WORK WITH
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
        >
          From frontend to backend — a snapshot of my technical proficiency across the full development stack.
        </motion.p>

        {/* ── Frontend – Circle rings ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Frontend</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
            {frontendSkills.map((skill, i) => (
              <CircleSkill key={skill.id} skill={skill} delay={0.1 * i} />
            ))}
          </div>
        </motion.div>

        {/* ── Backend – Progress bars ── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Backend</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-6">
              {backendSkills.map((skill, i) => (
                <BarSkill key={skill.id} skill={skill} delay={0.1 * i + 0.2} />
              ))}
            </div>
          </motion.div>

          {/* ── Tools / Other ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Tools & Design</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-6">
              {toolSkills.map((skill, i) => (
                <BarSkill key={skill.id} skill={skill} delay={0.1 * i + 0.2} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Ticker strip – all technologies ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative overflow-hidden border-y border-border py-4"
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...displaySkills, ...displaySkills].map((skill, i) => (
              <span key={i} className="flex items-center gap-2 text-muted-foreground/50 text-sm font-mono uppercase tracking-wide shrink-0">
                <span className="text-primary">◆</span> {skill.name}
              </span>
            ))}
          </motion.div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
