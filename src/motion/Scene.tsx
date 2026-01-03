import { motion } from "framer-motion";

export function Scene() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #020617, #020617, #020617)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating atmospheric lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/10 blur-3xl"
          style={{
            width: 280,
            height: 280,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -80, 40, 0],
          }}
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
