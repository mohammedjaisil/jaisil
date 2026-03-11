import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image_url: string;
  sort_order: number;
}

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
        
      if (!error && data) {
        setTestimonials(data);
      }
    };
    
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-start justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-muted-foreground text-sm uppercase tracking-widest">(TESTIMONIALS)</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-right"
          >
            <p className="text-3xl md:text-4xl font-bold">5.0</p>
            <p className="text-sm text-muted-foreground">/5</p>
            <p className="text-xs text-muted-foreground mt-1">Client Satisfaction</p>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-16 max-w-3xl"
        >
          I deliver result-focused solutions. Hear what they say about working with me.
        </motion.h3>

        {testimonials.length === 0 && <p className="text-muted-foreground">Loading testimonials...</p>}

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="p-6 md:p-8 bg-card rounded-2xl border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
              <p className="text-4xl text-primary mt-4">"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
