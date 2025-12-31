import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";

interface ItemViewer3DProps {
  itemIcon: string;
  itemName: string;
}

export default function ItemViewer3D({ itemIcon, itemName }: ItemViewer3DProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  // Map items to their 3D model URLs
  const getModelUrl = (name: string): string => {
    if (name.includes("Axe")) {
      return "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/weapons/axe.glb";
    } else if (name.includes("Sword")) {
      return "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/weapons/sword.glb";
    } else if (name.includes("Hammer")) {
      return "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/weapons/hammer.glb";
    }
    return "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/weapons/sword.glb";
  };

  const modelUrl = getModelUrl(itemName);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            margin: 0;
            overflow: hidden;
            background: linear-gradient(180deg, #1e5a7d 0%, #0a2540 100%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            width: 100vw;
            height: 100vh;
            position: relative;
        }

        /* Glowing particles effect */
        #particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        }

        .particle {
            position: absolute;
            background: radial-gradient(circle, rgba(45, 212, 191, 1) 0%, rgba(45, 212, 191, 0.6) 50%, transparent 100%);
            border-radius: 50%;
            animation: float linear infinite;
            pointer-events: none;
            box-shadow: 0 0 15px rgba(45, 212, 191, 0.9);
        }

        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: scale(1);
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(var(--drift)) scale(0.5);
                opacity: 0;
            }
        }

        .particle:nth-child(1) { left: 20%; bottom: 0; width: 6px; height: 6px; animation-duration: 8s; animation-delay: 0s; --drift: 40px; }
        .particle:nth-child(2) { left: 40%; bottom: 0; width: 8px; height: 8px; animation-duration: 10s; animation-delay: 1s; --drift: -30px; }
        .particle:nth-child(3) { left: 60%; bottom: 0; width: 5px; height: 5px; animation-duration: 9s; animation-delay: 2s; --drift: 50px; }
        .particle:nth-child(4) { left: 80%; bottom: 0; width: 7px; height: 7px; animation-duration: 11s; animation-delay: 0.5s; --drift: -40px; }
        .particle:nth-child(5) { left: 10%; bottom: 0; width: 6px; height: 6px; animation-duration: 9s; animation-delay: 1.5s; --drift: 35px; }
        .particle:nth-child(6) { left: 30%; bottom: 0; width: 8px; height: 8px; animation-duration: 10s; animation-delay: 0.8s; --drift: -45px; }
        .particle:nth-child(7) { left: 50%; bottom: 0; width: 5px; height: 5px; animation-duration: 8s; animation-delay: 2s; --drift: 30px; }
        .particle:nth-child(8) { left: 70%; bottom: 0; width: 7px; height: 7px; animation-duration: 11s; animation-delay: 1.2s; --drift: -35px; }

        #canvas {
            width: 100vw;
            height: 100vh;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }

        #loading {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 16px;
            z-index: 100;
            text-align: center;
        }

        /* Rotating glow effect around the item */
        #glow-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 3px solid transparent;
            background: linear-gradient(#1e5a7d, #1e5a7d) padding-box,
                        linear-gradient(90deg, #2dd4bf, #60a5fa, #a78bfa, #ec4899, #2dd4bf) border-box;
            animation: rotate 4s linear infinite;
            z-index: 5;
            opacity: 0.6;
        }

        @keyframes rotate {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <!-- Animated particles background -->
    <div id="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div id="glow-ring"></div>
    <div id="loading">Loading ${itemIcon}<br/>${itemName}...</div>
    <canvas id="canvas"></canvas>

    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/"
        }
    }
    </script>

    <script type="module">
        import * as THREE from 'three';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        let scene, camera, renderer, controls, clock, model;
        const canvas = document.getElementById('canvas');
        const loading = document.getElementById('loading');

        function init() {
            scene = new THREE.Scene();
            scene.background = null;

            camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.set(0, 0.5, 3);

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setClearColor(0x000000, 0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Orbit controls for interactive rotation
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = true;
            controls.enablePan = false;
            controls.minDistance = 1.5;
            controls.maxDistance = 5;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.0;

            // Intense lighting setup for the weapon
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            scene.add(ambientLight);

            // Main key light
            const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
            keyLight.position.set(3, 5, 3);
            keyLight.castShadow = true;
            scene.add(keyLight);

            // Secondary key light
            const keyLight2 = new THREE.DirectionalLight(0xffffff, 2.0);
            keyLight2.position.set(-3, 5, 3);
            scene.add(keyLight2);

            // Colored accent lights
            const accentLight1 = new THREE.PointLight(0x2dd4bf, 2.5, 10);
            accentLight1.position.set(2, 1, 2);
            scene.add(accentLight1);

            const accentLight2 = new THREE.PointLight(0x60a5fa, 2.5, 10);
            accentLight2.position.set(-2, 1, 2);
            scene.add(accentLight2);

            const accentLight3 = new THREE.PointLight(0xec4899, 2.0, 8);
            accentLight3.position.set(0, -1, 2);
            scene.add(accentLight3);

            // Rim lights for dramatic effect
            const rimLight1 = new THREE.DirectionalLight(0x2dd4bf, 2.0);
            rimLight1.position.set(-2, 2, -3);
            scene.add(rimLight1);

            const rimLight2 = new THREE.DirectionalLight(0xa78bfa, 2.0);
            rimLight2.position.set(2, 2, -3);
            scene.add(rimLight2);

            // Bottom light
            const bottomLight = new THREE.DirectionalLight(0xfbbf24, 1.5);
            bottomLight.position.set(0, -3, 0);
            scene.add(bottomLight);

            clock = new THREE.Clock();

            loadModel();

            window.addEventListener('resize', onWindowResize, false);
        }

        async function loadModel() {
            const loader = new GLTFLoader();

            try {
                const gltf = await loader.loadAsync('${modelUrl}');
                model = gltf.scene;

                // Center and scale the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // Calculate scale to fit the model nicely in view
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 1.5 / maxDim;
                model.scale.setScalar(scale);

                // Recalculate after scaling
                const scaledBox = new THREE.Box3().setFromObject(model);
                const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

                // Center the model
                model.position.sub(scaledCenter);

                // Enable shadows
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(model);
                loading.style.display = 'none';

                animate();
            } catch (error) {
                console.error("Error loading model:", error);
                loading.innerHTML = "Model not available<br/>Showing placeholder";

                // Create a fallback geometric representation
                createFallbackModel();
                loading.style.display = 'none';
                animate();
            }
        }

        function createFallbackModel() {
            // Create a stylized weapon-like shape as fallback
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
            const material = new THREE.MeshStandardMaterial({
                color: 0x8b9dc3,
                metalness: 0.8,
                roughness: 0.2,
            });
            model = new THREE.Mesh(geometry, material);
            model.rotation.z = Math.PI / 4;

            // Add a blade/head
            const headGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1);
            const headMaterial = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0,
                metalness: 0.9,
                roughness: 0.1,
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.y = 1.2;
            model.add(head);

            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            if (controls) {
                controls.update();
            }

            // Optional: Add a gentle bobbing animation
            if (model) {
                model.position.y += Math.sin(Date.now() * 0.001) * 0.001;
            }

            renderer.render(scene, camera);
        }

        init();
    </script>
</body>
</html>
  `;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-transparent">
        <ActivityIndicator size="large" color="#2dd4bf" />
        <Text className="mt-4 text-white text-sm">Loading 3D Model...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1, backgroundColor: "transparent" }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}
