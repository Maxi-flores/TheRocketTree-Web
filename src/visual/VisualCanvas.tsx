import { useEffect, useRef } from "react";
import * as THREE from "three";

import { treeState } from "./treeState";
import vertexShader from "./shaders/fullScreen.vert?raw";
import fragmentShader from "./shaders/treeSpace.frag?raw";

export function VisualCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------- Renderer ---------- */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";

    mount.appendChild(renderer.domElement);

    /* ---------- Scene & Camera ---------- */

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* ---------- Uniforms ---------- */

    const uniforms = {
      uTime: { value: 0 },
      uGrowth: { value: 0 }, // 🌱 controlled externally
      uResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    /* ---------- Material ---------- */

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* ---------- Interaction ---------- */

    const setPointer = (x: number, y: number) => {
      uniforms.uMouse.value.set(
        x / window.innerWidth,
        1.0 - y / window.innerHeight
      );
    };

    const onMouseMove = (e: MouseEvent) => {
      setPointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        setPointer(t.clientX, t.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    /* ---------- Animation Loop ---------- */

    let rafId = 0;
    const growthLerpSpeed = 0.015; // 🌿 organic response speed

    const animate = () => {
      uniforms.uTime.value += 0.01;

      // 🌳 Smoothly approach target growth (route-controlled)
      uniforms.uGrowth.value +=
        (treeState.targetGrowth - uniforms.uGrowth.value) *
        growthLerpSpeed;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    /* ---------- Resize ---------- */

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", onResize);

    /* ---------- Cleanup ---------- */

    return () => {
      cancelAnimationFrame(rafId);

      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0 }}
    />
  );
}
