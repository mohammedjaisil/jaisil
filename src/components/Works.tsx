import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const Works = () => {
  const { data: projects = [] } = useProjects();
  const featuredProjects = projects.filter(p => p.featured).sort((a,b) => ((a.sortOrder || 0) - (b.sortOrder || 0)));
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="relative" ref={containerRef}>
      {/* Header */}
      <div className="relative container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex items-start justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Latest work
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-sm"
          >
            (0{featuredProjects.length})
          </motion.span>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative pb-24 md:pb-32">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalProjects={featuredProjects.length}
          />
        ))}
      </div>

      {/* More Projects Button */}
      <div className="relative z-[60] bg-background">
        <div className="container mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-8 uppercase tracking-[0.2em] text-sm">Have something else in mind?</p>
            <Link
              to="/projects"
              className="btn-outline-orange inline-flex items-center gap-4 group text-lg md:text-2xl px-10 md:px-16 py-5 md:py-6"
            >
              EXPLORE ALL PROJECTS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
  };
  index: number;
  totalProjects: number;
}

const ProjectCard = ({ project, index, totalProjects }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
      }}
      className="sticky top-24 mb-[15vh] last:mb-0 will-change-transform"
    >
      <div 
        className="container mx-auto px-6 md:px-12 will-change-transform"
        style={{
          transform: `translateY(${index * 15}px)`,
        }}
      >
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Project Image */}
            <div className="relative group overflow-hidden h-64 md:h-96">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <Link
                to={`/projects/${project.id}`}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Project Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-bold text-muted-foreground/20">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Project {index + 1} of {totalProjects}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">{project.name}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline group/link"
              >
                View Project Details
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Works;
