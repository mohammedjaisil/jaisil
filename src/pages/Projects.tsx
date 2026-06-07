import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block"
              >
                (PORTFOLIO)
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase"
              >
                All Work
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-start md:items-end gap-1"
            >
              <span className="text-5xl md:text-6xl font-black text-primary">{String(projects.length).padStart(2,"0")}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-widest">Total Projects</span>
            </motion.div>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200
                  ${activeFilter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ originX: 0 }}
            className="h-px bg-border mt-10"
          />
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
              >
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/projects/${project.id}`} className="group block h-full">
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-2xl bg-card aspect-[4/3] mb-5">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors duration-300" />

                        {/* Hover CTA */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            View Project <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Index number */}
                        <span className="absolute bottom-4 right-4 text-4xl font-black text-white/10 leading-none select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl md:text-2xl font-black tracking-tight group-hover:text-primary transition-colors duration-200 leading-tight">
                            {project.name}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2.5 py-1 bg-secondary rounded-md text-[10px] font-medium text-secondary-foreground">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2.5 py-1 bg-secondary rounded-md text-[10px] font-medium text-muted-foreground">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-32 text-muted-foreground">
              <p className="text-lg">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] mb-6">Have a project in mind?</p>
          <Link
            to="/#contact"
            className="btn-outline-orange inline-flex items-center gap-4 group text-base md:text-xl px-10 py-4"
          >
            LET'S WORK TOGETHER
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
