import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

const BackgroundAnimation = () => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Stable hook calls at the top level
  // Note: framer-motion hooks use internal state, so they MUST be top-level.
  const nebula1X = useTransform(springX, [0, 1920], [-50, 50]);
  const nebula1Y = useTransform(springY, [0, 1080], [-50, 50]);
  
  const nebula2X = useTransform(springX, [0, 1920], [30, -30]);
  const nebula2Y = useTransform(springY, [0, 1080], [30, -30]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const stars = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    brilliance: Math.random() * 0.6 + 0.2,
    duration: 3 + Math.random() * 4,
  })), []);

  // CRITICAL: NO EARLY RETURN. Hooks must remain in stable order.
  // We use CSS visibility or conditional rendering within the JSX instead.

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-black select-none">
      {/* Absolute Dark Base Layer */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Animated content layer fades in after mounting */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        {/* Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Interactive Nebula Clouds (using motion values from hooks) */}
        <motion.div
          style={{ x: nebula1X, y: nebula1Y }}
          className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[150px] will-change-transform"
        />
        <motion.div
          style={{ x: nebula2X, y: nebula2Y }}
          className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px] will-change-transform"
        />

        {/* Shimmering Star Field */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <StarItem key={star.id} star={star} />
          ))}
        </div>

        {/* Dynamic Shooting Stars */}
        <ShootingStar delay={2} />
        <ShootingStar delay={15} />

        {/* Technical Scanning Line */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[1px] bg-primary/20 blur-[1px] opacity-10"
        />
      </div>
    </div>
  );
};

// Sub-components to keep hook counts isolated and stable
const StarItem = ({ star }: { star: any }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, star.brilliance, 0] }}
    transition={{ duration: star.duration, repeat: Infinity, delay: Math.random() * 5 }}
    className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.2)]"
    style={{
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
    }}
  />
);

const ShootingStar = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ x: "-10%", y: "15%", opacity: 0 }}
    animate={{ 
      x: ["-10%", "110%"],
      y: ["15%", "60%"],
      opacity: [0, 1, 0]
    }}
    transition={{ 
      duration: 1.2, 
      repeat: Infinity, 
      delay, 
      repeatDelay: 10 + Math.random() * 10,
      ease: "easeOut" 
    }}
    className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent to-primary/60 origin-left -rotate-12"
  />
);

export default BackgroundAnimation;
