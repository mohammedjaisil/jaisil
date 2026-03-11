import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small projects and landing pages.",
      price: "499",
      features: [
        "Single page website",
        "Responsive design",
        "Basic SEO setup",
        "1 revision round",
        "2 week delivery",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for businesses ready to grow online.",
      price: "1,499",
      features: [
        "Multi-page website (up to 5)",
        "Custom design",
        "Advanced SEO",
        "CMS integration",
        "3 revision rounds",
        "3-4 week delivery",
      ],
      popular: true,
    },
    {
      name: "Custom",
      description: "For specialized needs or larger projects.",
      price: "Custom",
      features: [
        "Unlimited pages",
        "Full-stack development",
        "E-commerce integration",
        "API development",
        "Priority support",
        "Timeline based on scope",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden bg-card" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">PRICING</h2>
          <p className="text-lg text-muted-foreground">
            From landing pages to full-stack apps, I've got you covered.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`p-8 rounded-2xl border relative ${
                plan.popular
                  ? "bg-background border-primary"
                  : "bg-background border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  POPULAR
                </span>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-8">
                {plan.price === "Custom" ? (
                  <p className="text-4xl font-bold">Let's Talk</p>
                ) : (
                  <p className="text-4xl font-bold">
                    <span className="text-xl">$</span>
                    {plan.price}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "btn-outline-orange"
                }`}
              >
                {plan.price === "Custom" ? "CONTACT ME" : "GET STARTED"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
