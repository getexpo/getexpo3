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

const Station = () => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

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

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, false);
    camera.inputs.remove(camera.inputs.attached.mousewheel);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMeshAsync("", "/models/", "station2.glb", scene).then((result) => {
      const rocketMesh = result.meshes[0];
      rocketMesh.scaling = new Vector3(0.35, 0.35, 0.35);
      rocketMesh.position = new Vector3(0, 0, 0);
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

export default Station;