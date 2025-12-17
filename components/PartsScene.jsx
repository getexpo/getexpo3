"use client";

import { useEffect, useRef, useState } from "react";


const PartsScene = () => {
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

        const engine = new Engine(canvas, true, {
          preserveDrawingBuffer: true,
          stencil: true,
          alpha: true,
          powerPreference: "high-performance",
          doNotHandleContextLost: true,
        });
        engineRef.current = engine;

        const scene = new Scene(engine);
        sceneRef.current = scene;
        scene.clearColor = new Color4(0, 0, 0, 0);

        const camera = new ArcRotateCamera("camera", Math.PI / 0.3, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        camera.inputs.remove(camera.inputs.attached.mousewheel);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 5;

        new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        try {
          const result = await SceneLoader.ImportMeshAsync("", "/models/", "parts.glb", scene);
          
          if (!mounted) return;

          const partsMesh = result.meshes[0];
          partsMesh.scaling = new Vector3(0.3, 0.2, 0.3);
          partsMesh.position = new Vector3(0.1, -0.4, 0);
          camera.setTarget(partsMesh);

          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load parts model:", error);
          setLoadError(true);
          setIsLoading(false);
        }

        engine.runRenderLoop(() => {
          if (sceneRef.current) {
            sceneRef.current.render();
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

export default PartsScene;