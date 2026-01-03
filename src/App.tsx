import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import { PLASMIC } from "./plasmic/loader";
import { VisualCanvas } from "./visual/VisualCanvas";

/* ---------------- Plasmic Wrapper ---------------- */

function PlasmicPageWrapper() {
  const navigate = useNavigate();

  return (
    <motion.main
      style={{ position: "relative", zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      {/* 
        IMPORTANT:
        - Do NOT hardcode page="Home"
        - Let Plasmic resolve by URL (/ , /Home, etc.)
      */}
      <PLASMIC.Page
        componentProps={{
          LaunchButton: {
            onLaunch: () => navigate("/app"),
          },
        }}
      />
    </motion.main>
  );
}

/* ---------------- App Shell ---------------- */

function AppShell() {
  return (
    <motion.main
      style={{ position: "relative", zIndex: 1 }}
      className="min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h1 className="text-3xl p-12">TheRocketTree App</h1>
    </motion.main>
  );
}

/* ---------------- Root App ---------------- */

export default function App() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      {/* Global GPU / background layer */}
      <VisualCanvas />

      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* App shell must be explicit */}
            <Route path="/app" element={<AppShell />} />

            {/* EVERYTHING else is Plasmic */}
            <Route path="/*" element={<PlasmicPageWrapper />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </PlasmicRootProvider>
  );
}
