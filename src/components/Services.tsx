import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
  sort_order: number;
}

// ── Animations ────────────────────────────────────────────────────────────────

const BrowserAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <rect x="10" y="10" width="180" height="120" rx="8" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <rect x="10" y="10" width="180" height="24" rx="8" fill="hsl(var(--primary)/0.1)" />
    <circle cx="26" cy="22" r="4" fill="hsl(var(--primary)/0.5)" />
    <circle cx="40" cy="22" r="4" fill="hsl(var(--primary)/0.3)" />
    <circle cx="54" cy="22" r="4" fill="hsl(var(--primary)/0.15)" />
    <rect x="70" y="16" width="90" height="12" rx="6" fill="hsl(var(--primary)/0.1)" />
    {[44, 56, 68, 80, 92, 104].map((y, i) => (
      <motion.rect
        key={i}
        x="24"
        y={y}
        height="6"
        rx="3"
        fill="hsl(var(--primary)/0.25)"
        initial={{ width: 0 }}
        animate={{ width: [0, 60 + (i % 3) * 30, 60 + (i % 3) * 30, 0] }}
        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
      />
    ))}
    <motion.rect
      x="24" y="116" width="152" height="6" rx="3"
      fill="hsl(var(--primary)/0.15)"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0] }}
      style={{ originX: 0 }}
      transition={{ duration: 2.5, delay: 2, repeat: Infinity, repeatDelay: 1 }}
    />
  </svg>
);

const EcommerceAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <motion.rect
      x="60" y="45" width="80" height="70" rx="6"
      stroke="hsl(var(--primary))" strokeWidth="1.5"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.path
      d="M75 45 C75 35 85 28 100 28 C115 28 125 35 125 45"
      stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 2.4 }}
    />
    <motion.circle cx="84" cy="120" r="5" fill="hsl(var(--primary)/0.6)"
      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
    <motion.circle cx="116" cy="120" r="5" fill="hsl(var(--primary)/0.6)"
      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} />
    {[0, 1, 2].map(i => (
      <motion.rect key={i}
        x={78 + i * 18} y={62} width="14" height="18" rx="3"
        fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: [30, 62, 62, 30], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
      />
    ))}
    <motion.text x="100" y="98" textAnchor="middle" fontSize="9"
      fill="hsl(var(--primary)/0.7)"
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1.5 }}>
      AED 299
    </motion.text>
  </svg>
);

const AppAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <rect x="15" y="10" width="170" height="120" rx="8" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <rect x="15" y="10" width="42" height="120" rx="8" fill="hsl(var(--primary)/0.06)" />
    <line x1="57" y1="10" x2="57" y2="130" stroke="hsl(var(--primary)/0.2)" strokeWidth="1" />
    {[30, 50, 70, 90, 110].map((y, i) => (
      <rect key={i} x="22" y={y} width="28" height="8" rx="4" fill="hsl(var(--primary)/0.2)" />
    ))}
    <rect x="65" y="18" width="112" height="28" rx="4" fill="hsl(var(--primary)/0.08)" />
    {[0, 1, 2, 3].map(i => (
      <motion.rect key={i}
        x={70 + i * 27} y={0} width="20" rx="3"
        fill="hsl(var(--primary)/0.5)"
        initial={{ height: 0, y: 108 }}
        animate={{ height: [0, 20 + i * 12, 20 + i * 12, 0], y: [108, 88 - i * 12, 88 - i * 12, 108] }}
        transition={{ duration: 2, delay: 0.5 + i * 0.15, repeat: Infinity, repeatDelay: 1.5 }}
      />
    ))}
    <motion.polyline
      points="65,90 85,75 105,82 125,60 145,68 165,50"
      stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 0.5 }}
    />
    <motion.circle cx="145" cy="68" r="4" fill="hsl(var(--primary))"
      animate={{ scale: [0, 1.4, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: 3, delay: 2.5, repeat: Infinity, repeatDelay: 0.5 }} />
  </svg>
);

const UIUXAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <rect x="20" y="15" width="160" height="110" rx="6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <rect x="20" y="15" width="160" height="20" rx="6" fill="hsl(var(--primary)/0.08)" />
    <motion.rect x="35" y="45" width="55" height="35" rx="4"
      stroke="hsl(var(--primary)/0.6)" strokeWidth="1.2" fill="hsl(var(--primary)/0.05)"
      animate={{ stroke: ["hsl(var(--primary)/0.4)", "hsl(var(--primary))", "hsl(var(--primary)/0.4)"] }}
      transition={{ duration: 2, repeat: Infinity }} />
    <rect x="35" y="90" width="55" height="6" rx="3" fill="hsl(var(--primary)/0.2)" />
    <rect x="35" y="100" width="35" height="6" rx="3" fill="hsl(var(--primary)/0.1)" />
    <motion.rect x="105" y="45" width="60" height="60" rx="4"
      stroke="hsl(var(--primary)/0.4)" strokeWidth="1.2" fill="hsl(var(--primary)/0.05)"
      animate={{ stroke: ["hsl(var(--primary)/0.2)", "hsl(var(--primary)/0.7)", "hsl(var(--primary)/0.2)"] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
    <motion.g
      animate={{ x: [0, 18, 35, 18, 0], y: [0, -10, 5, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <motion.polygon
        points="120,60 114,75 120,73 116,85"
        fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
    </motion.g>
    <motion.circle cx="62" cy="62" r="10" stroke="hsl(var(--primary)/0.5)" strokeWidth="1" fill="none"
      animate={{ r: [10, 14, 10], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);

const MobileAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <rect x="72" y="8" width="56" height="124" rx="10" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <rect x="88" y="14" width="24" height="5" rx="2.5" fill="hsl(var(--primary)/0.3)" />
    <rect x="80" y="125" width="40" height="4" rx="2" fill="hsl(var(--primary)/0.2)" />
    {[0, 1, 2, 3, 4, 5].map(i => (
      <motion.rect key={i}
        x={80 + (i % 3) * 18} y={26 + Math.floor(i / 3) * 22}
        width="14" height="14" rx="4"
        fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
    <motion.rect x="80" y="95" width="40" height="22" rx="4"
      fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1"
      animate={{ fill: ["hsl(var(--primary)/0.1)", "hsl(var(--primary)/0.25)", "hsl(var(--primary)/0.1)"] }}
      transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);

const SEOAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    <motion.circle cx="88" cy="65" r="35" stroke="hsl(var(--primary))" strokeWidth="1.5"
      animate={{ r: [35, 37, 35] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.line x1="112" y1="89" x2="140" y2="117"
      stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"
      animate={{ x2: [140, 143, 140], y2: [117, 120, 117] }}
      transition={{ duration: 2, repeat: Infinity }} />
    {[0, 1, 2].map(i => (
      <motion.circle key={i} cx="88" cy="65" r={15 + i * 10}
        stroke="hsl(var(--primary)/0.2)" strokeWidth="1" fill="none"
        animate={{ r: [15 + i * 10, 17 + i * 10, 15 + i * 10] }}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
    ))}
    <motion.path d="M78 60 L82 68 L92 54" stroke="hsl(var(--primary))" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
    {[0, 1, 2].map(i => (
      <motion.rect key={i} x={145} y={105 - i * 18} width={30} height={12} rx={3}
        fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1"
        initial={{ width: 0 }}
        animate={{ width: [0, 30 - i * 5, 30 - i * 5, 0] }}
        transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 1 }} />
    ))}
  </svg>
);

const DefaultAnimation = () => (
  <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
    {[0, 1, 2].map(i => (
      <motion.circle key={i}
        cx={70 + i * 30} cy={70} r={20 - i * 4}
        stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none"
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }} />
    ))}
    {[30, 60, 90, 120, 150].map((x, i) => (
      <motion.circle key={i} cx={x} cy={70} r={3}
        fill="hsl(var(--primary)/0.4)"
        animate={{ y: [-8, 8, -8], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }} />
    ))}
  </svg>
);

const ServiceAnimation = ({ title }: { title: string }) => {
  const t = title.toLowerCase();
  const wrap = "w-full h-40 flex items-center justify-center";

  if (t.includes("e-commerce") || t.includes("ecommerce") || t.includes("shop") || t.includes("store") || t.includes("woocommerce"))
    return <div className={wrap}><EcommerceAnimation /></div>;
  if (t.includes("ui") || t.includes("ux") || t.includes("figma") || t.includes("design"))
    return <div className={wrap}><UIUXAnimation /></div>;
  if (t.includes("mobile") || t.includes("ios") || t.includes("android") || t.includes("app") && !t.includes("application"))
    return <div className={wrap}><MobileAnimation /></div>;
  if (t.includes("seo") || t.includes("marketing") || t.includes("analytics") || t.includes("growth"))
    return <div className={wrap}><SEOAnimation /></div>;
  if (t.includes("application") || t.includes("dashboard") || t.includes("saas") || t.includes("platform") || t.includes("system"))
    return <div className={wrap}><AppAnimation /></div>;
  if (t.includes("web") || t.includes("website") || t.includes("landing") || t.includes("frontend"))
    return <div className={wrap}><BrowserAnimation /></div>;
  return <div className={wrap}><DefaultAnimation /></div>;
};

// ── Main component ─────────────────────────────────────────────────────────────

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-muted-foreground text-sm uppercase tracking-widest">(SERVICES)</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
        >
          HOW I CAN HELP
        </motion.h2>

        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onClick={() => setActiveService(activeService === index ? -1 : index)}
              className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeService === index
                  ? "bg-card border-primary/50"
                  : "bg-transparent border-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-6">
                  <span className="text-2xl md:text-3xl font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted-foreground text-2xl">.</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{service.title}</h3>

                  {activeService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-muted-foreground mb-6">{service.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {service.features && service.features.map((feature) => (
                              <span
                                key={feature}
                                className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Animated illustration */}
                        <div className="hidden md:flex items-center justify-center rounded-xl border border-primary/10 bg-primary/5 p-4 overflow-hidden">
                          <motion.div
                            className="w-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <ServiceAnimation title={service.title} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {services.length === 0 && (
            <p className="text-muted-foreground">Loading services...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
