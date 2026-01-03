import { Scene } from "./motion/Scene";

export default function App() {
  return (
    <>
      <Scene />

      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontFamily: "system-ui",
          zIndex: 10,
        }}
      >
        🚀 TheRocketTree Web is running
      </div>
    </>
  );
}
