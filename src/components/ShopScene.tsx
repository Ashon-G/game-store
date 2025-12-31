import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";

export default function ShopScene() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

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
            background: linear-gradient(180deg, #0a2540 0%, #1e3a5f 50%, #2d4a6b 100%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            width: 100vw;
            height: 100vh;
            position: relative;
        }

        /* Animated particles background */
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
            box-shadow: 0 0 15px rgba(45, 212, 191, 0.9), 0 0 25px rgba(45, 212, 191, 0.5);
        }

        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            5% {
                opacity: 1;
            }
            95% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(var(--drift));
                opacity: 0;
            }
        }

        /* Generate multiple particles with different delays and positions - start from various heights */
        .particle:nth-child(1) { left: 10%; bottom: 80%; width: 8px; height: 8px; animation-duration: 10s; animation-delay: 0s; --drift: 50px; }
        .particle:nth-child(2) { left: 20%; bottom: 60%; width: 10px; height: 10px; animation-duration: 12s; animation-delay: 1s; --drift: -30px; }
        .particle:nth-child(3) { left: 30%; bottom: 40%; width: 6px; height: 6px; animation-duration: 8s; animation-delay: 2s; --drift: 70px; }
        .particle:nth-child(4) { left: 40%; bottom: 70%; width: 9px; height: 9px; animation-duration: 11s; animation-delay: 0.5s; --drift: -50px; }
        .particle:nth-child(5) { left: 50%; bottom: 50%; width: 7px; height: 7px; animation-duration: 9s; animation-delay: 1.5s; --drift: 40px; }
        .particle:nth-child(6) { left: 60%; bottom: 30%; width: 11px; height: 11px; animation-duration: 13s; animation-delay: 0s; --drift: -60px; }
        .particle:nth-child(7) { left: 70%; bottom: 90%; width: 6px; height: 6px; animation-duration: 9s; animation-delay: 2.5s; --drift: 80px; }
        .particle:nth-child(8) { left: 80%; bottom: 45%; width: 9px; height: 9px; animation-duration: 11s; animation-delay: 1s; --drift: -40px; }
        .particle:nth-child(9) { left: 90%; bottom: 65%; width: 8px; height: 8px; animation-duration: 10s; animation-delay: 2s; --drift: 60px; }
        .particle:nth-child(10) { left: 15%; bottom: 35%; width: 10px; height: 10px; animation-duration: 12s; animation-delay: 0.5s; --drift: -70px; }
        .particle:nth-child(11) { left: 25%; bottom: 55%; width: 6px; height: 6px; animation-duration: 8s; animation-delay: 1.5s; --drift: 50px; }
        .particle:nth-child(12) { left: 35%; bottom: 75%; width: 9px; height: 9px; animation-duration: 11s; animation-delay: 0s; --drift: -55px; }
        .particle:nth-child(13) { left: 45%; bottom: 25%; width: 7px; height: 7px; animation-duration: 9s; animation-delay: 1s; --drift: 45px; }
        .particle:nth-child(14) { left: 55%; bottom: 85%; width: 10px; height: 10px; animation-duration: 12s; animation-delay: 2s; --drift: -65px; }
        .particle:nth-child(15) { left: 65%; bottom: 20%; width: 6px; height: 6px; animation-duration: 8s; animation-delay: 0.5s; --drift: 75px; }
        .particle:nth-child(16) { left: 75%; bottom: 50%; width: 9px; height: 9px; animation-duration: 11s; animation-delay: 1.5s; --drift: -45px; }
        .particle:nth-child(17) { left: 85%; bottom: 70%; width: 8px; height: 8px; animation-duration: 10s; animation-delay: 0s; --drift: 55px; }
        .particle:nth-child(18) { left: 95%; bottom: 40%; width: 10px; height: 10px; animation-duration: 12s; animation-delay: 2.5s; --drift: -75px; }
        .particle:nth-child(19) { left: 5%; bottom: 60%; width: 6px; height: 6px; animation-duration: 8s; animation-delay: 1s; --drift: 65px; }
        .particle:nth-child(20) { left: 50%; bottom: 10%; width: 9px; height: 9px; animation-duration: 11s; animation-delay: 2s; --drift: -50px; }
        #canvas {
            width: 100vw;
            height: 50vh;
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 10;
            pointer-events: none;
        }

        /* UI Overlay */
        #ui-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            pointer-events: none;
        }

        /* Scrollable Items */
        #items-container {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 20px;
            pointer-events: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .item-card {
            background: linear-gradient(135deg, #1e5a7d 0%, #2d4a6b 50%, #1e5a7d 100%);
            border: 3px solid transparent;
            background-clip: padding-box;
            border-radius: 12px;
            margin-bottom: 10px;
            overflow: visible;
            position: relative;
            box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
            width: 100%;
            max-width: 100%;
        }

        .item-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 12px;
            padding: 4px;
            background: linear-gradient(135deg, #2dd4bf, #60a5fa, #a78bfa, #ec4899, #2dd4bf);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: shimmer 3s linear infinite;
            pointer-events: none;
        }

        @keyframes shimmer {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 200% 50%;
            }
        }

        .item-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.1) 50%,
                transparent 70%
            );
            transform: rotate(45deg);
            animation: hologram-shine 4s ease-in-out infinite;
            pointer-events: none;
        }

        @keyframes hologram-shine {
            0%, 100% {
                transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            50% {
                transform: translateX(100%) translateY(100%) rotate(45deg);
            }
        }

        .item-banner {
            background: linear-gradient(90deg, #2dd4bf, #14b8a6, #2dd4bf);
            background-size: 200% 100%;
            padding: 4px 12px;
            text-align: center;
            animation: banner-glow 2s ease-in-out infinite;
            position: relative;
            z-index: 2;
        }

        @keyframes banner-glow {
            0%, 100% {
                background-position: 0% 50%;
                box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
            }
            50% {
                background-position: 100% 50%;
                box-shadow: 0 0 20px rgba(45, 212, 191, 0.8);
            }
        }

        .item-banner-text {
            color: #0a2540;
            font-size: 11px;
            font-weight: 600;
        }

        .item-content {
            display: flex;
            align-items: center;
            padding: 10px;
            gap: 10px;
            position: relative;
            z-index: 2;
            background: linear-gradient(135deg, rgba(30, 90, 125, 0.6) 0%, rgba(45, 74, 107, 0.8) 100%);
        }

        .item-image {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #a5b4fc, #c4b5fd, #ddd6fe);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            flex-shrink: 0;
            box-shadow: 0 4px 15px rgba(139, 157, 195, 0.4),
                        inset 0 2px 5px rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        .item-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: item-shine 3s ease-in-out infinite;
        }

        @keyframes item-shine {
            0%, 100% {
                left: -100%;
            }
            50% {
                left: 100%;
            }
        }

        .item-info {
            flex: 1;
            min-width: 0;
            overflow: hidden;
        }

        .item-name {
            color: white;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-details {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }

        .item-level {
            color: white;
            font-size: 16px;
            font-weight: bold;
        }

        .item-seller {
            background: #0a2540;
            border-radius: 14px;
            padding: 4px 10px;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .seller-text {
            color: white;
            font-size: 11px;
            font-weight: 600;
        }

        .item-price {
            background: linear-gradient(135deg, #f97316, #ea580c, #dc2626);
            border: 2px solid #fbbf24;
            border-radius: 9px;
            padding: 7px 11px;
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
            animation: price-pulse 2s ease-in-out infinite;
        }

        @keyframes price-pulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(249, 115, 22, 0.6),
                            inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            50% {
                box-shadow: 0 0 30px rgba(249, 115, 22, 0.9),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5);
            }
        }

        .price-text {
            color: white;
            font-size: 16px;
            font-weight: bold;
        }

        .stat-icon {
            font-size: 18px;
        }

        .info-btn {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 24px;
            height: 24px;
            background: #2dd4bf;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            z-index: 3;
        }

        /* Bottom UI */
        #bottom-ui {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            pointer-events: auto;
        }

        .timer-container {
            display: flex;
            justify-content: center;
            padding: 10px 0;
            background: #0a2540;
        }

        .timer {
            background: #f5deb3;
            border-radius: 8px;
            padding: 8px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .timer-text {
            color: #0a2540;
            font-weight: bold;
            font-size: 14px;
        }

        .timer-value {
            color: #0a2540;
            font-weight: bold;
            font-size: 18px;
        }

        .stats-bar {
            background: #4c1d95;
            padding: 15px 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .stat {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .stat-icon {
            font-size: 28px;
        }

        .stat-value {
            color: white;
            font-size: 20px;
            font-weight: bold;
        }

        .stat-plus {
            width: 24px;
            height: 24px;
            background: #ec4899;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: bold;
            margin-left: 4px;
        }

        .stat-plus.orange {
            background: #f97316;
        }

        .stat-max {
            color: white;
            font-size: 12px;
            margin-left: 4px;
        }

        .info-circle {
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4c1d95;
            font-size: 14px;
            font-weight: bold;
        }

        /* Navigation Buttons */
        .nav-buttons {
            position: absolute;
            bottom: 140px;
            left: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 100;
            pointer-events: auto;
        }

        .nav-btn {
            width: 56px;
            height: 56px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            cursor: pointer;
        }

        .nav-btn.home {
            background: white;
            color: #0a2540;
        }

        .nav-btn.back {
            background: #1e5a7d;
            color: white;
        }

        .nav-btn-text {
            font-size: 12px;
            font-weight: bold;
            margin-top: 2px;
        }

        #loading {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 18px;
            z-index: 100;
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
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div id="loading">Loading 3D Scene...</div>
    <canvas id="canvas"></canvas>

    <!-- UI Overlay -->
    <div id="ui-overlay">
        <!-- Scrollable Items -->
        <div id="items-container">
            <div class="item-card">
                <div class="item-banner">
                    <div class="item-banner-text">Limited Stock! Only 1 left!</div>
                </div>
                <div class="item-content">
                    <div class="item-image">🪓</div>
                    <div class="item-info">
                        <div class="item-name">Basic Melde Axe</div>
                        <div class="item-details">
                            <div class="item-level">Lv.3</div>
                            <div class="item-seller">
                                <span>☠️</span>
                                <span class="seller-text">Outlaw</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">
                        <span class="price-text">1,000</span>
                        <span class="stat-icon">🪙</span>
                    </div>
                    <div class="info-btn">i</div>
                </div>
            </div>

            <div class="item-card">
                <div class="item-banner">
                    <div class="item-banner-text">Limited Stock! Only 1 left!</div>
                </div>
                <div class="item-content">
                    <div class="item-image">⚔️</div>
                    <div class="item-info">
                        <div class="item-name">Standard Alfar Sword</div>
                        <div class="item-details">
                            <div class="item-level">Lv.3</div>
                            <div class="item-seller">
                                <span>👺</span>
                                <span class="seller-text">Goblin</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">
                        <span class="price-text">1,000</span>
                        <span class="stat-icon">🪙</span>
                    </div>
                    <div class="info-btn">i</div>
                </div>
            </div>

            <div class="item-card">
                <div class="item-banner">
                    <div class="item-banner-text">Limited Stock! Only 1 left!</div>
                </div>
                <div class="item-content">
                    <div class="item-image">🪓</div>
                    <div class="item-info">
                        <div class="item-name">Standard Dokka Axe</div>
                        <div class="item-details">
                            <div class="item-level">Lv.3</div>
                            <div class="item-seller">
                                <span>👹</span>
                                <span class="seller-text">Beast</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">
                        <span class="price-text">1,000</span>
                        <span class="stat-icon">🪙</span>
                    </div>
                    <div class="info-btn">i</div>
                </div>
            </div>

            <div class="item-card">
                <div class="item-banner">
                    <div class="item-banner-text">Limited Stock! Only 1 left!</div>
                </div>
                <div class="item-content">
                    <div class="item-image">🔨</div>
                    <div class="item-info">
                        <div class="item-name">Standard Melde Hammer</div>
                        <div class="item-details">
                            <div class="item-level">Lv.1</div>
                            <div class="item-seller">
                                <span>☠️</span>
                                <span class="seller-text">Outlaw</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">
                        <span class="price-text">1,000</span>
                        <span class="stat-icon">🪙</span>
                    </div>
                    <div class="info-btn">i</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Buttons (Outside ui-overlay) -->
    <div class="nav-buttons">
        <div class="nav-btn home">🏠</div>
        <div class="nav-btn back">
            ◀
            <div class="nav-btn-text">Back</div>
        </div>
    </div>

    <!-- Bottom UI (Outside ui-overlay) -->
    <div id="bottom-ui">
        <div class="timer-container">
            <div class="timer">
                <span class="stat-icon">⏱️</span>
                <span class="timer-text">NEW ITEMS IN</span>
                <span class="timer-value">3:07h</span>
            </div>
        </div>
        <div class="stats-bar">
            <div class="stat">
                <span class="stat-icon">💎</span>
                <span class="stat-value">536</span>
                <span class="stat-plus">+</span>
            </div>
            <div class="stat">
                <span class="stat-icon">🪙</span>
                <span class="stat-value">268,095</span>
                <span class="stat-plus orange">+</span>
            </div>
            <div class="stat">
                <span class="stat-icon">⚡</span>
                <span class="stat-value">562</span>
                <span class="stat-max">Max</span>
            </div>
            <div class="info-circle">i</div>
        </div>
    </div>

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

        let scene, camera, renderer, mixer, clock;
        const canvas = document.getElementById('canvas');
        const loading = document.getElementById('loading');

        function log(msg) {
            console.log(msg);
        }

        function init() {
            scene = new THREE.Scene();
            // Make scene background transparent so items show behind
            scene.background = null;

            camera = new THREE.PerspectiveCamera(
                50,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.set(0, 0.3, 2.5);
            camera.lookAt(0, -0.2, 0);

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setClearColor(0x000000, 0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Bright ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);

            // Main key light from above
            const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
            keyLight.position.set(5, 10, 5);
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.width = 2048;
            keyLight.shadow.mapSize.height = 2048;
            scene.add(keyLight);

            // Secondary key light from opposite angle
            const keyLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
            keyLight2.position.set(-5, 10, 5);
            keyLight2.castShadow = true;
            scene.add(keyLight2);

            // Warm fill light from the side
            const fillLight = new THREE.DirectionalLight(0xffa574, 1.2);
            fillLight.position.set(-5, 3, -5);
            scene.add(fillLight);

            // Cool fill light from opposite side
            const fillLight2 = new THREE.DirectionalLight(0xa5d8ff, 1.0);
            fillLight2.position.set(5, 3, -5);
            scene.add(fillLight2);

            // Main spotlight on shop owner from front
            const spotLight1 = new THREE.SpotLight(0xffffff, 3.0);
            spotLight1.position.set(0, 4, 4);
            spotLight1.angle = Math.PI / 5;
            spotLight1.penumbra = 0.4;
            spotLight1.distance = 10;
            spotLight1.castShadow = true;
            scene.add(spotLight1);

            // Secondary spotlight from left
            const spotLight2 = new THREE.SpotLight(0x2dd4bf, 2.5);
            spotLight2.position.set(-3, 3, 3);
            spotLight2.angle = Math.PI / 6;
            spotLight2.penumbra = 0.5;
            spotLight2.distance = 8;
            scene.add(spotLight2);

            // Secondary spotlight from right
            const spotLight3 = new THREE.SpotLight(0x60a5fa, 2.5);
            spotLight3.position.set(3, 3, 3);
            spotLight3.angle = Math.PI / 6;
            spotLight3.penumbra = 0.5;
            spotLight3.distance = 8;
            scene.add(spotLight3);

            // Rim light from behind left for depth
            const rimLight1 = new THREE.DirectionalLight(0x88ccff, 1.5);
            rimLight1.position.set(-2, 3, -5);
            scene.add(rimLight1);

            // Rim light from behind right for depth
            const rimLight2 = new THREE.DirectionalLight(0xec4899, 1.2);
            rimLight2.position.set(2, 3, -5);
            scene.add(rimLight2);

            // Bottom up light for dramatic effect
            const bottomLight = new THREE.DirectionalLight(0xa78bfa, 1.0);
            bottomLight.position.set(0, -2, 2);
            scene.add(bottomLight);

            // Point lights around the models for extra glow
            const pointLight1 = new THREE.PointLight(0x2dd4bf, 2.0, 5);
            pointLight1.position.set(-1, 0, 1);
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x60a5fa, 2.0, 5);
            pointLight2.position.set(1, 0, 1);
            scene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0xfbbf24, 1.5, 4);
            pointLight3.position.set(0, 1, 0);
            scene.add(pointLight3);

            const pointLight4 = new THREE.PointLight(0xec4899, 1.5, 4);
            pointLight4.position.set(0, -0.5, 0);
            scene.add(pointLight4);

            // Hemisphere light for overall scene balance
            const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x2dd4bf, 0.8);
            scene.add(hemisphereLight);

            clock = new THREE.Clock();

            createScene();

            window.addEventListener('resize', onWindowResize, false);
        }

        async function createScene() {
            log("CreateScene called");

            const loader = new GLTFLoader();

            try {
                log("Starting to load counter model...");
                const counterGltf = await loader.loadAsync('https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/shop/counter.glb');
                const counter = counterGltf.scene;
                log("Counter loaded successfully");

                const counterBox = new THREE.Box3().setFromObject(counter);
                const counterSize = counterBox.getSize(new THREE.Vector3());
                const counterCenter = counterBox.getCenter(new THREE.Vector3());
                log("Counter size: " + counterSize.x.toFixed(2) + ", " + counterSize.y.toFixed(2) + ", " + counterSize.z.toFixed(2));

                counter.scale.set(0.0008, 0.0008, 0.0008);

                const scaledCounterBox = new THREE.Box3().setFromObject(counter);
                // Position counter lower to match shop owner
                counter.position.set(0, -scaledCounterBox.min.y - 1.5, 0);

                counter.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(counter);
                log("Counter added to scene");

                log("Starting to load shop owner model...");
                const shopOwnerGltf = await loader.loadAsync('https://models.readyplayer.me/690bf115672cca15c2013ec1.glb');
                const shopOwner = shopOwnerGltf.scene;
                log("Shop owner loaded successfully");

                // Scale down the shop owner
                shopOwner.scale.set(0.4, 0.4, 0.4);

                const ownerBox = new THREE.Box3().setFromObject(shopOwner);
                // Position shop owner slightly to the right side of the screen
                shopOwner.position.set(0.35, -ownerBox.min.y - 1.8, -0.8);

                shopOwner.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(shopOwner);
                log("Shop owner added to scene");

                log("Loading custom idle animation...");
                try {
                    const animationGltf = await loader.loadAsync('https://raw.githubusercontent.com/readyplayerme/animation-library/master/masculine/glb/idle/M_Standing_Idle_Variations_010.glb');
                    log("Animation loaded successfully");

                    mixer = new THREE.AnimationMixer(shopOwner);

                    if (animationGltf.animations && animationGltf.animations.length > 0) {
                        const anim = animationGltf.animations[0];
                        const action = mixer.clipAction(anim);
                        action.setLoop(THREE.LoopRepeat);
                        action.play();
                        log("Animation playing");
                    }
                } catch (animError) {
                    log("ERROR loading animation: " + animError.message);
                }

                loading.style.display = 'none';
                log("Scene ready!");

                animate();
            } catch (error) {
                log("ERROR: " + error.message);
                console.error("Error loading 3D models:", error);
                loading.style.display = 'none';
                animate();
            }
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            if (mixer) {
                mixer.update(delta);
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
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-600">Initializing 3D Scene...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" pointerEvents="none">
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        pointerEvents="none"
      />
    </View>
  );
}
