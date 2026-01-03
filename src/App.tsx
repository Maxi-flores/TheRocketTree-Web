import { PlasmicRootProvider, PlasmicComponent } from "@plasmicapp/loader-react";
import { PLASMIC } from "./plasmic/loader";

export default function App() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent component="Home" />
    </PlasmicRootProvider>
  );
}
