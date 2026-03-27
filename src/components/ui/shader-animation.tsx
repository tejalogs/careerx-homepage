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
        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        // Brand colors: Yellow #F5D134, Blue #3C60A8
        vec3 brandYellow = vec3(0.961, 0.820, 0.204);
        vec3 brandBlue   = vec3(0.235, 0.376, 0.659);
        vec3 bgColor     = vec3(0.97, 0.975, 0.99); // light off-white #F7F8FC

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          float t = time * 0.03;

          // soft flowing waves using brand colors on light bg
          vec3 color = bgColor;

          for(int i = 0; i < 4; i++){
            float fi = float(i);
            float wave1 = sin(uv.x * 2.0 + t * (1.0 + fi * 0.3) + fi * 1.5) * cos(uv.y * 1.5 + t * 0.7 + fi);
            float wave2 = cos(uv.y * 2.5 + t * (0.8 + fi * 0.2) - fi * 0.8) * sin(uv.x * 1.8 - t * 0.5 + fi * 2.0);
            float blend = wave1 * wave2;

            // mix yellow and blue waves
            float yellowStr = smoothstep(-0.2, 0.4, blend) * 0.4;
            float blueStr   = smoothstep(-0.4, 0.2, -blend) * 0.45;

            color += brandYellow * yellowStr * (1.0 - fi * 0.1);
            color += brandBlue * blueStr * (1.0 - fi * 0.1);
          }

          // soft radial vignette
          float vignette = 1.0 - length(uv) * 0.2;
          color *= vignette;

          // allow richer color while staying light
          color = clamp(color, vec3(0.7), vec3(1.0));

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
