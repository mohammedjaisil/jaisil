import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.054 23.478a.75.75 0 0 0 .918.918l5.671-1.495A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.722 9.722 0 0 1-4.99-1.375l-.358-.214-3.712.978.993-3.626-.234-.373A9.722 9.722 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github,       href: "https://github.com/mohammedjaisil",    label: "GitHub" },
    { icon: Linkedin,     href: "https://www.linkedin.com/in/jaisil-k/", label: "LinkedIn" },
    { icon: Instagram,    href: "https://www.instagram.com/jaisil__",    label: "Instagram" },
    { icon: WhatsAppIcon, href: "https://wa.me/971522305216",             label: "WhatsApp" },
    { icon: Mail,         href: "mailto:jaisilmohammed@gmail.com",        label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="text-left">
            <a href="#home" className="text-3xl font-black tracking-tighter text-foreground">
              JAISIL<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground mt-4 max-w-xs">
              Full-Stack Web Developer based in Dubai, UAE. Building modern digital experiences.
            </p>
          </div>

          {/* Social */}
          <div className="md:text-right flex flex-col items-start md:items-end">
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground mt-4 font-medium">
              jaisilmohammed@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mohammed Jaisil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
