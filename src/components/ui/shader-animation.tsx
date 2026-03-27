"use client";

import { useEffect, useRef } from "react";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const init = async () => {
      const THREE = await import("three");

      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          float t = time * 0.05;
          float lineWidth = 0.002;

          // Original ring math — same dramatic concentric rings
          vec3 rawColor = vec3(0.0);
          for(int j = 0; j < 3; j++){
            for(int i = 0; i < 5; i++){
              rawColor[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
            }
          }

          // Map raw RGB intensity to brand colors
          // Blue (#3C60A8) for cool tones, Yellow (#F5D134) for warm tones
          float intensity = (rawColor.r + rawColor.g + rawColor.b) / 3.0;
          vec3 brandBlue   = vec3(0.235, 0.376, 0.659);
          vec3 brandYellow = vec3(0.961, 0.820, 0.204);
          vec3 bgLight     = vec3(0.97, 0.975, 0.99);

          // Blend: low intensity = light bg, mid = blue rings, high = yellow peaks
          vec3 color = bgLight;
          color = mix(color, brandBlue, smoothstep(0.05, 0.3, intensity) * 0.8);
          color = mix(color, brandYellow, smoothstep(0.3, 0.8, intensity) * 0.9);
          color = mix(color, vec3(1.0), smoothstep(0.8, 1.2, intensity));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const camera = new THREE.Camera();
      camera.position.z = 1;

      const scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(2, 2);

      const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      const onWindowResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
      };

      onWindowResize();
      window.addEventListener("resize", onWindowResize, false);

      let animationId = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        renderer.render(scene, camera);
      };

      sceneRef.current = { camera, scene, renderer, uniforms, animationId };
      animate();

      cleanupRef.current = () => {
        window.removeEventListener("resize", onWindowResize);
        cancelAnimationFrame(animationId);
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    };

    init();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: "#F7F8FC", overflow: "hidden" }}
    />
  );
}
