"use client";

import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  Color4,
  ParticleSystem,
  Texture,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const PartsScene = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set isMobile based on window width after the component mounts
    setIsMobile(window.innerWidth <= 768);

    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      alpha: true,
    });

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0); // transparent

    const camera = new ArcRotateCamera("camera", Math.PI / 0.3, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.inputs.remove(camera.inputs.attached.mousewheel);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMeshAsync("", "/models/", "parts.glb", scene).then((result) => {
      const rocketMesh = result.meshes[0];
      rocketMesh.scaling = new Vector3(0.3, 0.2, 0.3);
      rocketMesh.position = new Vector3(0.1, -0.4, 0);
      camera.setTarget(rocketMesh);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
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
  );
};

export default PartsScene;