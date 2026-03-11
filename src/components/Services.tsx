import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
        
      if (!error && data) {
        setServices(data);
      }
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
                        {service.image_url && (
                          <div className="hidden md:block">
                            <img
                              src={service.image_url}
                              alt={service.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
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
