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

const RocketScene = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // Initialize with false, update on mount

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
    scene.clearColor = new Color4(0, 0, 0, 0); // Transparent background

    const camera = new ArcRotateCamera("camera", Math.PI / 0.3, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
    // camera.attachControl(canvas, false); // Keeping camera control detached for this animation

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMeshAsync("", "/models/", "rocket2.glb", scene).then((result) => {
      const rocketMesh = result.meshes[0];
      rocketMesh.scaling = new Vector3(1.9, 1.9, 1.9);
      rocketMesh.position = new Vector3(0, -1.5, 0);
      camera.setTarget(rocketMesh);

      // 🔥 Fire particles
      const fire = new ParticleSystem("fire", 2000, scene);
      fire.particleTexture = new Texture("/flame.png", scene);
      fire.emitter = new Vector3(0, -1.5, 0); // Below rocket
      fire.minEmitBox = new Vector3(-0.05, 0, -0.05);
      fire.maxEmitBox = new Vector3(0.05, 0, 0.05);
      fire.color1 = fire.color2 = new Color4(1, 0.4, 0, 1);
      fire.colorDead = new Color4(0, 0, 0, 0.1);
      fire.minSize = 0.1;
      fire.maxSize = 0.3;
      fire.minLifeTime = 0.2;
      fire.maxLifeTime = 0.4;
      fire.emitRate = 500;
      fire.direction1 = new Vector3(0, -1, 0);
      fire.direction2 = new Vector3(0, -1.2, 0);
      fire.gravity = new Vector3(0, -5, 0);
      fire.start();

      // 🚀 Enhanced animation for subtle rocket movement and tilt
      scene.onBeforeRenderObservable.add(() => {
        const t = performance.now() * 0.001; // Time in seconds

        // Subtle vertical bobbing (up and down)
        const verticalBobbingAmplitude = 0.05;
        const verticalBobbingFrequency = 2; // Slower frequency for gentle bob
        rocketMesh.position.y = -1.5 + Math.sin(t * verticalBobbingFrequency) * verticalBobbingAmplitude;

        // Subtle horizontal sway (left and right)
        const horizontalSwayAmplitude = 0.02;
        const horizontalSwayFrequency = 1.5; // Slower frequency for gentle sway
        rocketMesh.position.x = Math.sin(t * horizontalSwayFrequency) * horizontalSwayAmplitude;
        rocketMesh.position.z = Math.cos(t * horizontalSwayFrequency * 0.8) * horizontalSwayAmplitude; // Slightly different frequency for more natural movement

        // Subtle vertical tilt (rotation around X and Z axes)
        const tiltAmplitude = 0.05; // Max tilt angle in radians
        const tiltFrequencyX = 1.8;
        const tiltFrequencyZ = 2.2;

        rocketMesh.rotation.x = Math.sin(t * tiltFrequencyX) * tiltAmplitude;
        rocketMesh.rotation.z = Math.cos(t * tiltFrequencyZ) * tiltAmplitude;

        // Maintain continuous spin if desired (from original code)
        // rocketMesh.rotation.y += 0.01;
      });
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
    ></canvas>
  );
};

export default RocketScene;