import { motion } from "framer-motion";

export const MobileNebula = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px]"
      />
      
      <div className="absolute inset-0 opacity-[0.05] z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};