"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"; // Import the GLTFExporter

const ThreeScene = () => {
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [shirtTexture, setShirtTexture] = useState(null);
  const [logoTexture, setLogoTexture] = useState(null);
  const [backTexture, setBackTexture] = useState(null);
  const modelRef = useRef(null);
  const materialRefs = useRef([]);
  const logoMeshRef = useRef(null);
  const backMeshRef = useRef(null);
  const sceneRef = useRef(null);

  // Handle texture changes (same as before)
  const handleTextureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const texture = new THREE.Texture(image);
          texture.needsUpdate = true;
          texture.flipY = false; // Explicitly disable flipY
          texture.premultiplyAlpha = false; // Explicitly disable premultiplyAlpha

          setShirtTexture(texture); // Update state with the new shirt texture
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const texture = new THREE.Texture(image);
          texture.needsUpdate = true;
          texture.flipY = false; // Explicitly disable flipY
          texture.premultiplyAlpha = false; // Explicitly disable premultiplyAlpha

          setLogoTexture(texture); // Update state with the new logo texture
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const texture = new THREE.Texture(image);
          texture.needsUpdate = true;
          texture.flipY = false; // Explicitly disable flipY
          texture.premultiplyAlpha = false; // Explicitly disable premultiplyAlpha

          setBackTexture(texture); // Update state with the new back texture
        };
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("three-canvas"),
    });
    renderer.setClearColor("#1b0255");
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#af7ff2", 100, 100);
    pointLight.position.set(2, 5, 3);
    scene.add
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/model/scene.gltf", (gltf) => {
      const loadedModel = gltf.scene;
      modelRef.current = loadedModel;
      scene.add(loadedModel);
      const width = window.innerWidth;

      loadedModel.scale.set(0.7, 0.8, 0.8);
      
      if (width < 768) {
        loadedModel.scale.set(0.3, 0.3, 0.3);
        loadedModel.position.set(0, -2, 0); // Adjust position for small screens
      } else {
        // For larger screens (e.g., tablets and desktops)
        loadedModel.position.set(4.8, -11, -2); // Original position for larger screens
      }
    

      loadedModel.traverse((child) => {
        if (child.isMesh) {
          materialRefs.current.push(child.material);
        }
      });

      // Apply the initial shirt color
      materialRefs.current.forEach((material) => {
        material.color.set(shirtColor);
      });

      // Apply the shirt texture if it exists
      if (shirtTexture) {
        materialRefs.current.forEach((material) => {
          material.map = shirtTexture;
          material.needsUpdate = true;
        });
      }

      // Add logo as a separate mesh
      const logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture || new THREE.TextureLoader().load("/image.png"),
        transparent: true,
        side: THREE.DoubleSide,
      });

      const logoGeometry = new THREE.CircleGeometry(0.2, 32);
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
      
      if (width < 768) {
        logoMesh.position.set(.3, 2.6, 0.38);  // Move logo for small screens
        logoMesh.scale.set(.5,.5)
      } else {
        logoMesh.position.set(5.1, 1.2, -0.98); // Original logo position for larger screens
      }
      logoMesh.rotation.x -= 0.39;
      logoMesh.rotation.y -= 0.1;
      logoMesh.rotation.z = Math.PI;
      logoMesh.rotation.y = Math.PI;
      logoMesh.name = "logoMesh";
      logoMeshRef.current = logoMesh;

      // Add back as a separate mesh
      const backMaterial = new THREE.MeshBasicMaterial({
        map: backTexture || new THREE.TextureLoader().load("/image.png"),
        transparent: true,
        side: THREE.DoubleSide,
      });

      const backGeometry = new THREE.CircleGeometry(0.5, 32);
      const backMesh = new THREE.Mesh(backGeometry, backMaterial);
      if (width < 768) {
        backMesh.position.set(0, 2.4, -0.5); 
        backMesh.scale.set(.6,.6)
    
        backMesh.rotation.y = Math.PI+0.05;
        backMesh.rotation.x -= 0.06; 
      } else {
        backMesh.position.set(4.6, 1.1, -3.29);
        backMesh.rotation.x += 0.08;
        backMesh.rotation.z = Math.PI; 
        backMesh.rotation.y += 0.09;
      }
      
     
     
      backMesh.name = "backMesh";
      backMeshRef.current = backMesh;

      const shirtMesh = loadedModel.getObjectByName("shirtMeshName");
      if (shirtMesh) {
        shirtMesh.add(logoMesh);
        shirtMesh.add(backMesh);
      } else {
        scene.add(logoMesh);
        scene.add(backMesh);
      }
    });

    camera.position.z = 6;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
  }, [shirtColor, shirtTexture, logoTexture, backTexture]);

  const handleColorChange = (e) => {
    setShirtColor(e.target.value);
    materialRefs.current.forEach((material) => {
      material.color.set(e.target.value);
    });
  };

  // Save function to export the customized model as a GLB file
  const saveModel = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      sceneRef.current,
      (result) => {
        const blob = new Blob([JSON.stringify(result)], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "custom_tshirt_model.glb";
        link.click();
        URL.revokeObjectURL(url);
      },
      { binary: true } // Export as binary GLB format
    );
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <canvas id="three-canvas" style={{ display: "block" }} />
      {/* UI controls */}
      <div className="absolute sm:top-[30%] sm:left-[10%] top-[45%] left-2 flex flex-col gap-6 p-6 bg-black rounded-xl shadow-lg shadow-gray-800 sm:w-[80%] md:w-[30%] w-[94%] ">
  {/* Shirt Texture Section */}
  <div className="flex items-center gap-4">
    <label
      htmlFor="shirtTexture"
      className="bg-black text-xs sm:text-sm text-white px-4 py-2 rounded-3xl font-extralight cursor-pointer shadow-md shadow-teal-500 hover:bg-gray-800 transition duration-300"
    >
      Choose Hoodie Texture
    </label>
    <input
      id="shirtTexture"
      type="file"
      accept="image/*"
      onChange={handleTextureChange}
      className="hidden"
    />
  </div>

  {/* Shirt Color Section */}
  <div className="flex items-center gap-4">
    <label
      htmlFor="shirtColor"
      className="bg-black text-white text-xs sm:text-sm px-4 py-2 rounded-3xl font-extralight  shadow-teal-500 cursor-pointer shadow-md hover:bg-gray-800 transition duration-300"
    >
      Choose Hoodie Color
    </label>
    <input
      id="shirtColor"
      type="color"
      value={shirtColor}
      onChange={handleColorChange}
      className="sm:w-6 sm:h-6 w-3 h-3 bg-black rounded-3xl cursor-pointer"
    />
  </div>

  {/* Logo Texture Section */}
  <div className="flex items-center gap-4">
    <label
      htmlFor="logoTexture"
      className="bg-black text-white text-xs sm:text-sm px-4 py-2 rounded-3xl  shadow-teal-500 font-extralight cursor-pointer shadow-md hover:bg-gray-800 transition duration-300"
    >
      Choose Logo
    </label>
    <input
      id="logoTexture"
      type="file"
      accept="image/*"
      onChange={handleLogoChange}
      className="hidden"
    />
  </div>

  {/* Back Texture Section */}
  <div className="flex items-center gap-4">
    <label
      htmlFor="backTexture"
      className="bg-black text-white px-4 text-xs sm:text-sm py-2 rounded-3xl  shadow-teal-500  cursor-pointer shadow-md hover:bg-gray-800 transition duration-300 font-extralight"
    >
      Choose Back Texture
    </label>
    <input
      id="backTexture"
      type="file"
      accept="image/*"
      onChange={handleBackChange}
      className="hidden"
    />
  </div>
</div>

      {/* Save Button */}
      <div className="absolute sm:top-[78%] top-[90%] sm:left-[63%] left-[25%] cursor-pointer border-2 border-gray-600 p-1 rounded-2xl bg-clip bg-gradient-to-r bg-green-600 from-green-950 hover:bg-green-400 font-thin shadow-md shadow-green-200 "
        onClick={saveModel} 
      >
        Save Your Design
      </div>
      
    </div>
  );
};

export default ThreeScene;
