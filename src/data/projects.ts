export interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  image: string;
  tech: string[];
  link: string;
  category: string;
  features?: string[];
  gallery?: string[];
  featured?: boolean;
  sortOrder?: number;
}

export const projects: Project[] = [
  {
    id: "vroxhub",
    name: "VroxHub",
    description: "Website for videography and photography studio with portfolio showcase and booking system",
    fullDescription: "A comprehensive digital platform for VroxHub, a leading videography and photography studio. The project features a dynamic portfolio showcase, service listings, and an integrated booking system to streamline client inquiries.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://vroxhub.vercel.app/",
    category: "Web Development",
    features: ["Responsive Design", "Portfolio Gallery", "Booking Integration", "Custom Animations"],
  },
  {
    id: "neo-ocular",
    name: "Neo Ocular",
    description: "E-commerce website for premium eyewear brand with product catalog",
    fullDescription: "A luxury e-commerce experience for Neo Ocular, a premium eyewear brand. The site focuses on high-quality product imagery, seamless navigation, and a user-friendly shopping cart system.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop",
    tech: ["React", "Tailwind CSS"],
    link: "https://optical-shop-ten.vercel.app/",
    category: "E-commerce",
    features: ["Product Catalog", "Shopping Cart", "Brand Identity", "Mobile Optimization"],
  },
  {
    id: "neo-hair",
    name: "NeoHair",
    description: "Booking platform for modern hair salon with appointment management",
    fullDescription: "NeoHair is a specialized appointment management system for modern salons. It allows clients to choose stylists, view available time slots, and manage their bookings effortlessly.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://neohair.vercel.app/",
    category: "Web Application",
    features: ["Stylist Management", "Real-time Booking", "Admin Dashboard", "User Notifications"],
  },
  {
    id: "prastara-decor",
    name: "Prastara Decor Studio",
    description: "Interior design and architecture firm based in Dubai specializing in luxury projects.",
    fullDescription: "Prastara Decor Studio is a premier interior design and architecture firm based in Dubai, UAE. Since 2009, they have delivered over 500 high-quality fit-outs and design solutions for global clients like Google and Taj Group.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    tech: ["React", "Next.js", "Tailwind CSS"],
    link: "https://prastaradecor.vercel.app/",
    category: "Interior Design",
    features: ["Luxury Fit-outs", "MEP Services", "Commercial Design", "Portfolio Showcase"],
  },
  {
    id: "neo-barber",
    name: "Neo Barber",
    description: "Professional barbershop website with services and booking features",
    fullDescription: "A modern web presence for professional barbershops, featuring service menus, gallery of previous work, and an easy-to-use booking interface.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
    tech: ["React", "Tailwind CSS"],
    link: "https://neobarber-7l7h.vercel.app/",
    category: "Web Development",
    features: ["Service Lists", "Gallery Showcase", "Booking System", "Mobile Responsive"],
  },
  {
    id: "neo-cafe",
    name: "Neo Cafe",
    description: "Modern cafe website with menu showcase and ambiance",
    fullDescription: "Capturing the essence of a modern cafe through a visually stunning website. Includes interactive menus, location mapping, and ambiance galleries.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    tech: ["React", "Tailwind CSS"],
    link: "https://neocafe-flame.vercel.app/",
    category: "Web Development",
    features: ["Digital Menu", "Ambiance Gallery", "Location Map", "Contact Form"],
  },
  {
    id: "neo-restaurant",
    name: "Neo Restaurant",
    description: "Restaurant website with online menu and reservation system",
    fullDescription: "A sophisticated restaurant platform offering online reservations, detailed menus with dietary filters, and event hosting information.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    tech: ["React", "Tailwind CSS"],
    link: "https://neo-restaurant.vercel.app/",
    category: "Web Development",
    features: ["Table Reservation", "Interactive Menu", "Event Management", "SEO Optimized"],
  },
  {
    id: "sfr-creative",
    name: "SFR Creative",
    description: "E-commerce website for wall art and car hangings with full shopping functionality",
    fullDescription: "Built on WordPress/WooCommerce, SFR Creative provides a seamless shopping experience for unique wall art and lifestyle accessories.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    tech: ["WordPress", "WooCommerce", "PHP"],
    link: "https://sfrcreative.com",
    category: "E-commerce",
    features: ["Product Personalization", "Secure Payments", "Inventory Management", "Custom Themes"],
  },
];
