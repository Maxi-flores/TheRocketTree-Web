import { motion } from "framer-motion";

export function LaunchButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative rounded-full px-8 py-4 text-sm font-medium tracking-wide text-white
                 bg-white/10 backdrop-blur-xl border border-white/20
                 hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      Enter App
    </motion.button>
  );
}
