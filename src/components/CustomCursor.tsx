import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // ── Main dot — snappy, precise ──────────────────────────────────────────────
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 32, mass: 0.4 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 32, mass: 0.4 });

  // ── Trail 1 — follows main dot, softer ─────────────────────────────────────
  const t1X = useSpring(dotX, { stiffness: 140, damping: 18, mass: 0.6 });
  const t1Y = useSpring(dotY, { stiffness: 140, damping: 18, mass: 0.6 });

  // ── Trail 2 — follows trail 1, more lag ────────────────────────────────────
  const t2X = useSpring(t1X, { stiffness: 80, damping: 16, mass: 0.8 });
  const t2Y = useSpring(t1Y, { stiffness: 80, damping: 16, mass: 0.8 });

  // ── Trail 3 — slowest, most fluid ──────────────────────────────────────────
  const t3X = useSpring(t2X, { stiffness: 45, damping: 14, mass: 1 });
  const t3Y = useSpring(t2Y, { stiffness: 45, damping: 14, mass: 1 });

  useEffect(() => {
    if (isTouchDevice()) { document.body.style.cursor = "auto"; return; }
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = e.target as HTMLElement;
      const hovering =
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        !!el.closest("button") ||
        !!el.closest("a") ||
        el.classList.contains("cursor-pointer");
      setIsHovering(hovering);
    };

    const onClick = (e: MouseEvent) => {
      const r = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((p) => [...p, r]);
      setTimeout(() => setRipples((p) => p.filter((x) => x.id !== r.id)), 700);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (isTouchDevice()) return null;

  const base = "fixed top-0 left-0 rounded-full pointer-events-none will-change-transform";
  const center = { translateX: "-50%", translateY: "-50%" };

  return (
    <>
      {/* ── Click ripple ── */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className={`${base} border border-primary/40 z-[9998]`}
          initial={{ opacity: 0.7, scale: 0, width: 40, height: 40, x: r.x - 20, y: r.y - 20 }}
          animate={{ opacity: 0, scale: 2.8 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ ...center, translateX: "0", translateY: "0" }}
        />
      ))}

      {/* ── Trail 3 — faintest, slowest ── */}
      <motion.div
        className={`${base} bg-primary z-[9999]`}
        style={{ x: t3X, y: t3Y, ...center, width: 4, height: 4, opacity: 0.18 }}
      />

      {/* ── Trail 2 ── */}
      <motion.div
        className={`${base} bg-primary z-[9999]`}
        style={{ x: t2X, y: t2Y, ...center, width: 5.5, height: 5.5, opacity: 0.32 }}
      />

      {/* ── Trail 1 ── */}
      <motion.div
        className={`${base} bg-primary z-[9999]`}
        style={{ x: t1X, y: t1Y, ...center, width: 7, height: 7, opacity: 0.52 }}
      />

      {/* ── Main dot ── */}
      <motion.div
        className={`${base} z-[10000]`}
        style={{
          x: dotX,
          y: dotY,
          ...center,
          backgroundColor: "hsl(var(--primary))",
          boxShadow: "0 0 10px 3px hsl(var(--primary)/0.55)",
        }}
        animate={{
          width:  isHovering ? 18 : 10,
          height: isHovering ? 18 : 10,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      />

      {/* ── Hover ring (only on interactive elements) ── */}
      <motion.div
        className={`${base} border border-primary/35 z-[9999]`}
        style={{ x: dotX, y: dotY, ...center }}
        animate={{
          width:   isHovering ? 42 : 0,
          height:  isHovering ? 42 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      />
    </>
  );
};

export default CustomCursor;
