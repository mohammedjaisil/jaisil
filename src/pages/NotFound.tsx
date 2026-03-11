import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-primary/10 blur-[100px] rounded-full animate-float" />
      </div>

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-primary font-black uppercase tracking-[1em] text-xs block mb-4">
            Error Code: 404
          </span>
          <h1 className="text-[25vw] md:text-[20vw] font-black leading-none text-white tracking-tighter relative inline-block">
            404
            <div className="absolute -bottom-2 left-0 w-full h-2 bg-primary shadow-[0_0_30px_#ff5c00]" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-12"
        >
          <p className="text-2xl md:text-3xl font-medium text-white/50 tracking-wide uppercase italic">
            You've ventured into the <span className="text-white">Void.</span>
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black rounded-2xl flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_40px_rgba(255,92,0,0.4)]"
            >
              <ArrowLeft className="w-5 h-5" />
              BACK TO REALITY
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Background Text */}
      <div className="absolute bottom-10 left-10 opacity-[0.03] select-none pointer-events-none">
        <span className="text-8xl font-black text-white italic">NOT FOUND</span>
      </div>
    </div>
  );
};

export default NotFound;
