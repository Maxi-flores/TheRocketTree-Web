import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VisualCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /* ---------------- Renderer ---------------- */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";

    mountRef.current.appendChild(renderer.domElement);

    /* ---------------- Scene ---------------- */

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* ---------------- Uniforms ---------------- */

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    /* ---------------- Shader ---------------- */

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;

        float ripple(vec2 p, vec2 center) {
          float d = length(p - center);
          return sin(d * 12.0 - uTime * 3.0) / (d * 6.0 + 1.0);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          vec2 p = uv * 2.0 - 1.0;

          vec2 m = uMouse * 2.0 - 1.0;

          float r = ripple(p, m);

          vec3 base = vec3(0.02, 0.03, 0.09);
          vec3 accent = vec3(0.95, 0.45, 0.15);

          vec3 color = mix(base, accent, r * 0.8 + 0.4);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* ---------------- Interaction ---------------- */

    const onMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      uniforms.uMouse.value.set(
        t.clientX / window.innerWidth,
        1.0 - t.clientY / window.innerHeight
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);

    /* ---------------- Loop ---------------- */

    let raf: number;
    const animate = () => {
      uniforms.uTime.value += 0.015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    /* ---------------- Resize ---------------- */

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", onResize);

    /* ---------------- Cleanup ---------------- */

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
}
