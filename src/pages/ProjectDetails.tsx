import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you are looking for does not exist.</p>
        <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  const projectIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <div className="min-h-screen bg-transparent text-foreground" ref={containerRef}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </motion.div>

        <div className="container relative z-10 h-full mx-auto px-6 md:px-12 flex flex-col justify-between py-28">
          {/* Top: Back link */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm font-medium bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
          </motion.div>

          {/* Bottom: Category + Project Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-primary text-white text-xs font-black uppercase tracking-[0.2em] mb-6">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase">
              {project.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(project.features || ["Responsive Design", "Custom Animations", "Performance Optimized"]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="md:col-span-4 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-3xl p-8 space-y-8"
              >
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Year</h4>
                  <p className="font-medium">2024</p>
                </div>

                <div className="pt-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full btn-outline-orange !rounded-xl text-center flex items-center justify-center gap-2 group"
                  >
                    VISIT WEBSITE
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Project Showcase</h2>
          <div className="grid gap-12">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={project.id === 'prastara-decor' ? 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop' : project.image} 
                alt="Showcase 1" 
                className="w-full h-auto"
              />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="rounded-3xl overflow-hidden shadow-xl"
              >
                <img 
                  src={project.id === 'prastara-decor' ? 'https://images.unsplash.com/photo-1616137466211-f939a650ba04?q=80&w=2000&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&fit=crop'} 
                  alt="Showcase 2" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="rounded-3xl overflow-hidden shadow-xl"
              >
                <img 
                  src={project.id === 'prastara-decor' ? 'https://images.unsplash.com/photo-1616486029423-aaa47a958fe4?q=80&w=2000&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&fit=crop'} 
                  alt="Showcase 3" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
             <Link 
              to={`/projects/${prevProject.id}`}
              className="group flex items-center gap-6 text-left"
            >
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ChevronLeft className="w-6 h-6 group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Previous</span>
                <p className="text-2xl font-bold group-hover:text-primary transition-colors">{prevProject.name}</p>
              </div>
            </Link>

            <Link 
              to={`/projects/${nextProject.id}`}
              className="group flex items-center gap-6 text-right flex-row-reverse"
            >
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ChevronRight className="w-6 h-6 group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Next Project</span>
                <p className="text-2xl font-bold group-hover:text-primary transition-colors">{nextProject.name}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
