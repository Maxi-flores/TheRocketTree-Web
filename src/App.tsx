import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import { PLASMIC } from "./plasmic/loader";
import { VisualCanvas } from "./visual/VisualCanvas";

/* ---------------- Home (Plasmic) ---------------- */

function HomeWrapper() {
  const navigate = useNavigate();

  return (
    <motion.main
      style={{ position: "relative", zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
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

/* ---------------- Animated Routes ---------------- */

function AnimatedRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Plasmic pages */}
        <Route path="/*" element={<HomeWrapper />} />

        {/* App shell */}
        <Route path="/app" element={<AppShell />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ---------------- Root App ---------------- */

export default function App() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </PlasmicRootProvider>
  );
}
