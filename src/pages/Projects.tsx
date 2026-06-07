import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">All Projects</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              A collection of my work spanning web development, mobile apps, and digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group"
                >
                  <Link to={`/projects/${project.id}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-6">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                        {project.category}
                      </span>

                      {project.featured && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                          Featured
                        </span>
                      )}

                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
