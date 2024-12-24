"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Button } from "./ui/moving-border";
import { useRouter } from "next/navigation"; // Import useRouter

const ThreeScene = () => {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("three-canvas"),
    });
    renderer.setClearColor("#1c064f");
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add some basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#af7ff2", 100, 1000);
    pointLight.position.set(2, 5, 3);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;
    loader.load("/model/scene.gltf", (gltf) => {
      model = gltf.scene;
      scene.add(model);
    
      const width = window.innerWidth;
    
      if (width < 768) {
        model.scale.set(0.3, 0.3, 0.3);
        model.position.set(0, -5.7, 0);
      } else {
        model.scale.set(0.7, 0.8, 0.6);
        model.position.set(4.8, -11, -2);
      }
    });
    

    camera.position.z = 6;

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: enable smooth movement
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // Optional: prevent panning off the screen

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.005;
      }
      controls.update(); // Update the controls
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Function to handle the button click
  const navigateToCustomize = () => {
    router.push("/customize"); // Navigate to the customization page
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Ensures no content overflows
      }}
    >
      {/* Three.js Canvas */}
      <canvas id="three-canvas" style={{ display: "block" }} />

      {/* Overlay HTML Content */}
      <div 
        style={{
          position: "absolute",
          top: "25%",
          left: "5%",
          color: "white",
          fontFamily: "Arial, sans-serif",
          
        }}
      >
        <h1 className="font-bold sm:text-7xl text-4xl flex-wrap sm:w-2/5 mx-10 sm:mx-1 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-violet-800 ">
          Get Your Customize Hoodie
        </h1>
        <div className="absolute sm:right-52 sm:top-56 py-52 px-8 ">
          <Button onClick={navigateToCustomize}>Customize</Button>
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;
