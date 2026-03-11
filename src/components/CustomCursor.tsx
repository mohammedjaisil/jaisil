import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  
  // Use MotionValues for high-performance positioning without Re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the motion
  const springX = useSpring(mouseX, { stiffness: 350, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 35 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Debounce hovering check slightly or use a more efficient way
      const target = e.target as HTMLElement;
      const shouldHover = (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.classList.contains("cursor-pointer")
      );
      
      // Only trigger state update if the value changed
      if (shouldHover !== isHovering) {
        setIsHovering(shouldHover);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [isHovering]); // Re-bind when isHovering changes to keep it in sync

  return (
    <>
      {/* Ripple Effect - Optimized with lower duration */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.5, scale: 0, x: ripple.x - 25, y: ripple.y - 25 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 w-[50px] h-[50px] border border-primary/40 rounded-full pointer-events-none z-[9999] will-change-transform"
        />
      ))}

      {/* Main Cursor Dot - Optimized with Spring MotionValues */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[10000] mix-blend-difference will-change-transform"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Outer Ring - Optimized with Spring MotionValues */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[10000] will-change-transform"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.4 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;
