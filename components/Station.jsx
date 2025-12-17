"use client";

import { useEffect, useRef, useState } from "react";


const Station = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    let mounted = true;

    const loadBabylon = async () => {
      try {
        const [
          { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, Color4 }
        ] = await Promise.all([
          import("@babylonjs/core"),
          import("@babylonjs/loaders/glTF")
        ]);

        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const engine = new Engine(canvas, false, { // Disable anti-aliasing
          preserveDrawingBuffer: false,
          stencil: false,
          alpha: true,
          powerPreference: "high-performance",
          doNotHandleContextLost: true,
          antialias: false,
        });
        engineRef.current = engine;

        const scene = new Scene(engine);
        sceneRef.current = scene;
        scene.clearColor = new Color4(0, 0, 0, 0);
        
        // Optimize scene for performance
        scene.autoClear = false;
        scene.autoClearDepthAndStencil = false;

        const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, false);
        camera.inputs.remove(camera.inputs.attached.mousewheel);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 5;

        new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        try {
          const result = await SceneLoader.ImportMeshAsync("", "/models/", "station2.glb", scene);
          
          if (!mounted) return;

          const stationMesh = result.meshes[0];
          stationMesh.scaling = new Vector3(0.35, 0.35, 0.35);
          stationMesh.position = new Vector3(0, 0, 0);
          camera.setTarget(stationMesh);

          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load station model:", error);
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

export default Station;