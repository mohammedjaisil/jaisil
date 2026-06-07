import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useProject, useProjects } from "@/hooks/useProjects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: project, isLoading } = useProject(id || "");
  const { data: allProjects = [] } = useProjects();

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [id]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroY       = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);

  const projectIndex = project ? allProjects.findIndex((p) => p.id === project.id) : -1;
  const prevProject  = project && allProjects.length > 1 ? allProjects[(projectIndex - 1 + allProjects.length) % allProjects.length] : null;
  const nextProject  = project && allProjects.length > 1 ? allProjects[(projectIndex + 1) % allProjects.length] : null;

  // Always keep ref attached so useScroll never crashes
  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-foreground">

      {/* Loading */}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Not found */}
      {!isLoading && !project && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <span className="text-8xl font-black text-foreground/5 mb-4">404</span>
          <h1 className="text-3xl font-black mb-3">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">This project doesn't exist or may have been removed.</p>
          <Button onClick={() => navigate("/projects")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Button>
        </div>
      )}

      {/* Content */}
      {!isLoading && project && (<>
        <Navigation />

        {/* ── Cinematic Hero ── */}
        <section className="relative h-screen max-h-[700px] min-h-[500px] overflow-hidden">
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0"
          >
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          </motion.div>
          {/* Gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pt-24 md:pt-28"
          >
            {/* Back link */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 hover:border-white/30 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                All Projects
              </Link>
            </motion.div>

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.2em] rounded-full">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-black uppercase tracking-[0.2em] rounded-full border border-white/20">
                    ★ Featured
                  </span>
                )}
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
                {project.name}
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed hidden md:block">
                {project.description}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Main content ── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Left: content */}
              <div className="lg:col-span-8 space-y-14">

                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3 block">(OVERVIEW)</span>
                  <h2 className="text-2xl md:text-3xl font-black mb-5 leading-snug">About this project</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </motion.div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3 block">(KEY FEATURES)</span>
                    <h2 className="text-2xl md:text-3xl font-black mb-6 leading-snug">What was built</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.07 }}
                          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-colors duration-200"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3 block">(SHOWCASE)</span>
                  <h2 className="text-2xl md:text-3xl font-black mb-6 leading-snug">Project visuals</h2>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="overflow-hidden rounded-2xl border border-border"
                    >
                      <img src={project.image} alt={project.name} className="w-full h-auto object-cover" />
                    </motion.div>

                    {project.gallery && project.gallery.length >= 2 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {project.gallery.slice(0, 2).map((url, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="overflow-hidden rounded-2xl border border-border aspect-video"
                          >
                            <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&fit=crop",
                          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&fit=crop",
                        ].map((url, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="overflow-hidden rounded-2xl border border-border aspect-video"
                          >
                            <img src={url} alt={`Showcase ${i + 2}`} className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right: sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-5">

                  {/* Quick info card */}
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-border bg-card p-6 space-y-6"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Category</p>
                      <p className="font-bold text-sm">{project.category}</p>
                    </div>

                    <div className="h-px bg-border" />

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-border" />

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-orange w-full flex items-center justify-center gap-2 group !rounded-xl !py-3 text-sm"
                    >
                      VISIT WEBSITE
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>

                  {/* Hire CTA card */}
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto">
                      <span className="text-primary text-lg">✦</span>
                    </div>
                    <div>
                      <p className="font-black text-sm mb-1">Need something similar?</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">Let's build your next project together.</p>
                    </div>
                    <Link
                      to="/#contact"
                      className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-wider hover:underline"
                    >
                      Get in touch <ArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Prev / Next ── */}
        {prevProject && nextProject && (
          <section className="border-t border-border">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">

                {/* Previous */}
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex items-center gap-5 py-8 md:py-10 pr-0 md:pr-10 hover:bg-card/30 transition-colors px-4 -mx-4 md:mx-0 md:px-0"
                >
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all flex-shrink-0">
                    <ChevronLeft className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1 font-bold">Previous</p>
                    <p className="text-lg md:text-xl font-black group-hover:text-primary transition-colors truncate">{prevProject.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{prevProject.category}</p>
                  </div>
                </Link>

                {/* Next */}
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group flex items-center justify-end gap-5 py-8 md:py-10 pl-0 md:pl-10 hover:bg-card/30 transition-colors px-4 -mx-4 md:mx-0 md:px-0"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1 font-bold">Next</p>
                    <p className="text-lg md:text-xl font-black group-hover:text-primary transition-colors truncate">{nextProject.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{nextProject.category}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all flex-shrink-0">
                    <ChevronRight className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </>)}
    </div>
  );
};

export default ProjectDetails;
