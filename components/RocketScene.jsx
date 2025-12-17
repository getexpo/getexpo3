"use client";

import { useEffect, useRef, useState } from "react";

const RocketScene = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [babylonLoaded, setBabylonLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    let mounted = true;

    // Lazy load Babylon.js
    const loadBabylon = async () => {
      try {
        const [
          { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, Color4, ParticleSystem, Texture }
        ] = await Promise.all([
          import("@babylonjs/core"),
          import("@babylonjs/loaders/glTF")
        ]);

        if (!mounted) return;

        setBabylonLoaded(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const engine = new Engine(canvas, false, { // Disable anti-aliasing for performance
          preserveDrawingBuffer: false, // Disable for better performance
          stencil: false, // Disable stencil buffer
          alpha: true,
          powerPreference: "high-performance",
          doNotHandleContextLost: true,
          antialias: false, // Explicitly disable anti-aliasing
        });
        engineRef.current = engine;

        const scene = new Scene(engine);
        sceneRef.current = scene;
        scene.clearColor = new Color4(0, 0, 0, 0);
        
        // Optimize scene for performance
        scene.autoClear = false;
        scene.autoClearDepthAndStencil = false;

        const camera = new ArcRotateCamera("camera", Math.PI / 0.3, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 5;

        new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Load model with error handling
        try {
          const result = await SceneLoader.ImportMeshAsync("", "/models/", "rocket2.glb", scene);
          
          if (!mounted) return;

          const rocketMesh = result.meshes[0];
          rocketMesh.scaling = new Vector3(1.9, 1.9, 1.9);
          rocketMesh.position = new Vector3(0, -1.5, 0);
          camera.setTarget(rocketMesh);

          // Fire particles - Optimized for performance
          const fire = new ParticleSystem("fire", 800, scene); // Reduced from 2000
          fire.particleTexture = new Texture("/flame.png", scene);
          fire.emitter = new Vector3(0, -1.5, 0);
          fire.minEmitBox = new Vector3(-0.05, 0, -0.05);
          fire.maxEmitBox = new Vector3(0.05, 0, 0.05);
          fire.color1 = fire.color2 = new Color4(1, 0.4, 0, 1);
          fire.colorDead = new Color4(0, 0, 0, 0.1);
          fire.minSize = 0.1;
          fire.maxSize = 0.3;
          fire.minLifeTime = 0.2;
          fire.maxLifeTime = 0.4;
          fire.emitRate = 300; // Reduced from 500
          fire.direction1 = new Vector3(0, -1, 0);
          fire.direction2 = new Vector3(0, -1.2, 0);
          fire.gravity = new Vector3(0, -5, 0);
          fire.start();

          // Animation
          scene.onBeforeRenderObservable.add(() => {
            const t = performance.now() * 0.001;

            const verticalBobbingAmplitude = 0.05;
            const verticalBobbingFrequency = 2;
            rocketMesh.position.y = -1.5 + Math.sin(t * verticalBobbingFrequency) * verticalBobbingAmplitude;

            const horizontalSwayAmplitude = 0.02;
            const horizontalSwayFrequency = 1.5;
            rocketMesh.position.x = Math.sin(t * horizontalSwayFrequency) * horizontalSwayAmplitude;
            rocketMesh.position.z = Math.cos(t * horizontalSwayFrequency * 0.8) * horizontalSwayAmplitude;

            const tiltAmplitude = 0.05;
            const tiltFrequencyX = 1.8;
            const tiltFrequencyZ = 2.2;

            rocketMesh.rotation.x = Math.sin(t * tiltFrequencyX) * tiltAmplitude;
            rocketMesh.rotation.z = Math.cos(t * tiltFrequencyZ) * tiltAmplitude;
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load rocket model:", error);
          setLoadError(true);
          setIsLoading(false);
        }

        // Limit FPS to 30 for better performance
        let lastRender = 0;
        const targetFPS = 30;
        const frameTime = 1000 / targetFPS;
        
        engine.runRenderLoop(() => {
          const now = performance.now();
          if (now - lastRender >= frameTime) {
            if (sceneRef.current) {
              sceneRef.current.render();
            }
            lastRender = now;
          }
        });

        const handleResize = () => {
          engine.resize();
          setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.error("Failed to load Babylon.js:", error);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    loadBabylon();

    return () => {
      mounted = false;
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-sm">Unable to load 3D scene</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundColor: "transparent",
          pointerEvents: "auto",
          touchAction: "none",
          outline: "none",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
          border: "none",
        }}
      />
    </div>
  );
};

export default RocketScene;