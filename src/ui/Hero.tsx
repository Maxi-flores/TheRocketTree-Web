import { motion } from "framer-motion";

export function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="pointer-events-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          TheRocketTree
        </h1>

        <p className="mt-6 text-lg opacity-80 max-w-xl mx-auto">
          A living intelligence interface for creative systems
        </p>

        <div className="mt-10 flex gap-6 justify-center">
          <button
            onClick={onLaunch}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            Enter App
          </button>

          <a
            href="https://www.ithacaprotocol.io/"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full border border-white/30 hover:border-white transition"
          >
            Explore Vision
          </a>
        </div>
      </motion.div>
    </div>
  );
}
