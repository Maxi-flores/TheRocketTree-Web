import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "buGExq4AkRZHe4LYDqNJBW",
      token: import.meta.env.VITE_PLASMIC_PROJECT_TOKEN,
    },
  ],
  preview: import.meta.env.DEV,
});
