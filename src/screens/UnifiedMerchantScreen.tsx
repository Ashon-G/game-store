// UnifiedMerchantScreen with gradient background, particles, and hologram cards
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  interpolate
} from "react-native-reanimated";
import ItemDetailModal from "../components/ItemDetailModal";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ShopItem {
  id: string;
  name: string;
  level: number;
  price: number;
  stock: string;
  icon: string;
  seller: string;
  sellerIcon: string;
  lottieUrl?: string;
  gifUrl?: string;
  isVIP?: boolean;
}

// Token packages for the combined card
const tokenPackages = [
  { id: "1", name: "20 Tokens", price: 2.99 },
  { id: "2", name: "100 Tokens", price: 7.99 },
  { id: "3", name: "250 Tokens", price: 16.99 }
];

const TOKEN_LOTTIE_URL = "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/Token.lottie";

const shopItems: ShopItem[] = [
  {
    id: "4",
    name: "Daily Free Tokens",
    level: 2,
    price: 0,
    stock: "Claim Daily!",
    icon: "🎁",
    seller: "Free",
    sellerIcon: "✨",
    lottieUrl: "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/Token.lottie"
  },
  {
    id: "5",
    name: "VIP Subscription",
    level: 0,
    price: 14.99,
    stock: "Premium Benefits!",
    icon: "👑",
    seller: "Monthly",
    sellerIcon: "📅",
    lottieUrl: "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/Premium.lottie",
    isVIP: true
  },
  {
    id: "6",
    name: "Minted NFTs Module",
    level: 0,
    price: 0,
    stock: "Coming Soon!",
    icon: "🖼️",
    seller: "NFT",
    sellerIcon: "🔮",
    lottieUrl: "https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/Monkey%20NFT.lottie"
  },
  {
    id: "7",
    name: "3D Assets Module",
    level: 0,
    price: 0,
    stock: "Coming Soon!",
    icon: "🎨",
    seller: "3D",
    sellerIcon: "🔮"
  }
];

// Particle component for floating effect
function Particle({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useSharedValue(SCREEN_HEIGHT + 50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-50, { duration: 8000 + Math.random() * 4000, easing: Easing.linear }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value * 0.8,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: startX,
          width: 6 + Math.random() * 6,
          height: 6 + Math.random() * 6,
          borderRadius: 50,
          backgroundColor: "#2dd4bf",
          shadowColor: "#2dd4bf",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 10,
        },
        animatedStyle,
      ]}
    />
  );
}

// Sparkle component for VIP card
function VIPSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 400, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.in(Easing.ease) })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      )
    );
    rotation.value = withDelay(
      delay,
      withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x,
          top: y,
          width: 12,
          height: 12,
        },
        animatedStyle,
      ]}
    >
      <Text style={{ fontSize: 10, color: "#fbbf24" }}>✦</Text>
    </Animated.View>
  );
}

// Internal particle for VIP card
function VIPInternalParticle({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useSharedValue(120);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-10, { duration: 3000, easing: Easing.linear }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: 500 }),
          withTiming(0.8, { duration: 2000 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      )
    );
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: startX,
          bottom: 0,
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: "#fbbf24",
          shadowColor: "#fbbf24",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 4,
        },
        animatedStyle,
      ]}
    />
  );
}

// Shine effect component for VIP card
function VIPShineEffect() {
  const translateX = useSharedValue(-150);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(400, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withDelay(1000, withTiming(-150, { duration: 0 }))
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: "20deg" }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: -50,
          width: 60,
          height: 250,
          backgroundColor: "transparent",
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}

// VIP Card Component with all animations
function VIPCard({ item, onPress }: { item: ShopItem; onPress: () => void }) {
  const sparklePositions = [
    { x: -8, y: -8, delay: 0 },
    { x: SCREEN_WIDTH - 60, y: -8, delay: 300 },
    { x: -8, y: 80, delay: 600 },
    { x: SCREEN_WIDTH - 60, y: 80, delay: 900 },
    { x: SCREEN_WIDTH / 2 - 30, y: -10, delay: 450 },
    { x: SCREEN_WIDTH / 2 - 30, y: 85, delay: 750 },
  ];

  return (
    <View className="mb-3">
      {/* Sparkles around the card */}
      <View className="absolute inset-0" style={{ zIndex: 20 }} pointerEvents="none">
        {sparklePositions.map((pos, i) => (
          <VIPSparkle key={i} delay={pos.delay} x={pos.x} y={pos.y} />
        ))}
      </View>

      <Pressable
        onPress={onPress}
        className="rounded-2xl active:opacity-70 active:scale-[0.98]"
        style={{
          shadowColor: "#fbbf24",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.5,
          shadowRadius: 25,
          elevation: 12
        }}
      >
        <LinearGradient
          colors={["#1a1a2e", "#16213e", "#0f0f23"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            borderWidth: 3,
            borderColor: "#fbbf24",
            overflow: "hidden"
          }}
        >
          {/* Internal particles */}
          <View className="absolute inset-0" style={{ zIndex: 5 }} pointerEvents="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <VIPInternalParticle
                key={i}
                delay={i * 400}
                startX={40 + (i * 35)}
              />
            ))}
          </View>

          {/* Shine effect */}
          <View className="absolute inset-0" style={{ zIndex: 10, overflow: "hidden", borderRadius: 13 }} pointerEvents="none">
            <VIPShineEffect />
          </View>

          {/* Premium Gold Banner */}
          <LinearGradient
            colors={["#fbbf24", "#f59e0b", "#d97706"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 6, paddingHorizontal: 16, zIndex: 15 }}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-[#1a1a2e] text-sm font-bold tracking-wider">
                PREMIUM MEMBERSHIP
              </Text>
            </View>
          </LinearGradient>

          {/* VIP Content */}
          <View className="flex-row items-center" style={{ zIndex: 15 }}>
            {/* Lottie Animation - Full height, left side */}
            <View style={{ width: 120, height: 140, justifyContent: "center", alignItems: "center" }}>
              {item.lottieUrl && (
                <LottieView
                  source={{ uri: item.lottieUrl }}
                  autoPlay
                  loop
                  style={{ width: 140, height: 140 }}
                />
              )}
            </View>

            {/* VIP Info */}
            <View className="flex-1 px-4 py-3">
              <Text className="text-[#fbbf24] text-2xl font-bold mb-1">
                {item.name}
              </Text>
              <Text className="text-white/70 text-sm mb-2">
                Unlock exclusive perks
              </Text>
              <View className="flex-row items-center">
                <View className="bg-[#fbbf24]/20 rounded-full px-3 py-1 flex-row items-center">
                  <Text className="text-[#fbbf24] text-sm font-semibold">
                    {item.seller}
                  </Text>
                </View>
              </View>
            </View>

            {/* Price Button */}
            <LinearGradient
              colors={["#fbbf24", "#f59e0b", "#d97706"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 12,
                paddingVertical: 14,
                paddingHorizontal: 16,
                marginRight: 12,
                shadowColor: "#fbbf24",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 15
              }}
            >
              <Text className="text-[#1a1a2e] text-lg font-bold">
                ${item.price.toFixed(2)}
              </Text>
              <Text className="text-[#1a1a2e]/70 text-xs font-semibold text-center">
                /month
              </Text>
            </LinearGradient>
          </View>

          {/* Bottom accent line */}
          <LinearGradient
            colors={["transparent", "#fbbf24", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 2, marginHorizontal: 20, marginBottom: 8, zIndex: 15 }}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            margin: 0;
            overflow: hidden;
            background: transparent;
            width: 100vw;
            height: 100vh;
        }
        #canvas {
            width: 100vw;
            height: 100vh;
            display: block;
        }
        #loading {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
    </style>
</head>
<body>
    <div id="loading">Loading 3D...</div>
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

        let scene, camera, renderer, mixer, clock;
        const canvas = document.getElementById('canvas');
        const loading = document.getElementById('loading');

        function init() {
            scene = new THREE.Scene();
            scene.background = null;

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 1.0, 3.0);
            camera.lookAt(0, 0.3, 0);

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setClearColor(0x000000, 0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
            scene.add(ambientLight);

            const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
            keyLight.position.set(3, 5, 5);
            keyLight.castShadow = true;
            scene.add(keyLight);

            const fillLight = new THREE.DirectionalLight(0x2dd4bf, 1.5);
            fillLight.position.set(-3, 3, 3);
            scene.add(fillLight);

            const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
            rimLight.position.set(0, 2, -3);
            scene.add(rimLight);

            const bottomLight = new THREE.DirectionalLight(0xec4899, 0.8);
            bottomLight.position.set(0, -2, 2);
            scene.add(bottomLight);

            clock = new THREE.Clock();
            loadModels();
            window.addEventListener('resize', onResize);
        }

        async function loadModels() {
            const loader = new GLTFLoader();

            try {
                // Load counter - scaled down 30%, moved up, dark wood color
                const counterGltf = await loader.loadAsync('https://raw.githubusercontent.com/Ashon-G/arcadia-next-assets/main/pals/shop/counter.glb');
                const counter = counterGltf.scene;
                counter.scale.set(0.000392, 0.000392, 0.000392);
                const counterBox = new THREE.Box3().setFromObject(counter);
                counter.position.set(0, -counterBox.min.y - 0.2, 1.0);
                counter.traverse(c => {
                    if(c.isMesh) {
                        c.castShadow = true;
                        c.receiveShadow = true;
                        // Apply darker brown wood color material
                        c.material = new THREE.MeshStandardMaterial({
                            color: 0x4A2511,
                            roughness: 0.8,
                            metalness: 0.1
                        });
                    }
                });
                scene.add(counter);

                // Load shop owner - scaled down 25%, moved up 30%
                const ownerGltf = await loader.loadAsync('https://models.readyplayer.me/690bf115672cca15c2013ec1.glb');
                const owner = ownerGltf.scene;
                owner.scale.set(0.6, 0.6, 0.6);
                const ownerBox = new THREE.Box3().setFromObject(owner);
                owner.position.set(0.15, -ownerBox.min.y - 0.91, 0);
                owner.traverse(c => { if(c.isMesh) { c.castShadow = true; c.receiveShadow = true; }});
                scene.add(owner);

                // Load animation
                try {
                    const animGltf = await loader.loadAsync('https://raw.githubusercontent.com/readyplayerme/animation-library/master/masculine/glb/idle/M_Standing_Idle_Variations_010.glb');
                    mixer = new THREE.AnimationMixer(owner);
                    if (animGltf.animations?.length > 0) {
                        const action = mixer.clipAction(animGltf.animations[0]);
                        action.setLoop(THREE.LoopRepeat);
                        action.play();
                    }
                } catch(e) { console.log('Animation load failed:', e); }

                loading.style.display = 'none';
                animate();
            } catch (error) {
                console.error('Model load error:', error);
                loading.textContent = 'Failed to load 3D';
            }
        }

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            if (mixer) mixer.update(clock.getDelta());
            renderer.render(scene, camera);
        }

        init();
    </script>
</body>
</html>
`;

export default function UnifiedMerchantScreen() {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sceneLoading, setSceneLoading] = useState(true);

  const handleItemPress = (item: ShopItem) => {
    console.log("=== ITEM PRESSED ===", item.name);
    setSelectedItem(item);
    setModalVisible(true);
    console.log("=== MODAL SET TO VISIBLE ===");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handlePurchase = (item: ShopItem) => {
    console.log("Purchasing:", item.name);
    handleCloseModal();
  };

  return (
    <View className="flex-1 bg-[#0a2540]">
      {/* Background gradient - base layer */}
      <LinearGradient
        colors={["#0a2540", "#1e3a5f", "#2d4a6b"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
      />

      {/* Floating Particles Layer */}
      <View className="absolute inset-0" style={{ zIndex: 1 }} pointerEvents="none">
        {Array.from({ length: 15 }).map((_, i) => (
          <Particle
            key={i}
            delay={i * 600}
            startX={Math.random() * SCREEN_WIDTH}
          />
        ))}
      </View>

      {/* Layer 1: Scrollable Cards - behind 3D models */}
      <SafeAreaView edges={["top"]} className="absolute inset-0" style={{ zIndex: 2 }}>
        <View className="flex-1">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 400 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Combined Token Packages Card */}
            <View
              className="mb-3 rounded-2xl overflow-hidden"
              style={{
                shadowColor: "#f97316",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 20,
                elevation: 8
              }}
            >
              {/* Orange Header */}
              <LinearGradient
                colors={["#f97316", "#ea580c", "#dc2626"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16
                }}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-white text-lg font-bold">Token Packages</Text>
                  <View className="bg-white/20 rounded-full w-6 h-6 items-center justify-center">
                    <Text className="text-white font-bold">?</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Token Options Container */}
              <LinearGradient
                colors={["#1e5a7d", "#2d4a6b", "#1e5a7d"]}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  borderWidth: 2,
                  borderTopWidth: 0,
                  borderColor: "#f97316"
                }}
              >
                <View className="flex-row justify-between">
                  {tokenPackages.map((pkg) => (
                    <Pressable
                      key={pkg.id}
                      className="flex-1 mx-1 items-center active:opacity-70 active:scale-95"
                      onPress={() => handleItemPress({
                        id: pkg.id,
                        name: pkg.name,
                        level: 0,
                        price: pkg.price,
                        stock: "Buy Now!",
                        icon: "🪙",
                        seller: "Shop",
                        sellerIcon: "🏪",
                        lottieUrl: TOKEN_LOTTIE_URL
                      })}
                    >
                      {/* Token Name */}
                      <Text className="text-white text-sm font-bold mb-2">{pkg.name}</Text>

                      {/* Token Image Container */}
                      <View
                        className="w-20 h-20 rounded-xl items-center justify-center mb-2"
                        style={{ backgroundColor: "#0a2540" }}
                      >
                        <LottieView
                          source={{ uri: TOKEN_LOTTIE_URL }}
                          autoPlay
                          loop
                          style={{ width: 60, height: 60 }}
                        />
                      </View>

                      {/* Price */}
                      <LinearGradient
                        colors={["#f97316", "#ea580c"]}
                        style={{
                          borderRadius: 8,
                          paddingVertical: 6,
                          paddingHorizontal: 12
                        }}
                      >
                        <Text className="text-white text-sm font-bold">${pkg.price.toFixed(2)}</Text>
                      </LinearGradient>
                    </Pressable>
                  ))}
                </View>
              </LinearGradient>
            </View>

            {shopItems.map((item) => (
              item.isVIP ? (
                // Premium VIP Card with animations
                <VIPCard key={item.id} item={item} onPress={() => handleItemPress(item)} />
              ) : (
                // Regular Card Design
                <Pressable
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  className="mb-3 rounded-2xl active:opacity-70 active:scale-[0.98]"
                  style={{
                    shadowColor: "#2dd4bf",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 8
                  }}
                >
                <LinearGradient
                  colors={["#1e5a7d", "#2d4a6b", "#1e5a7d"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    borderWidth: 4,
                    borderColor: "#2dd4bf",
                    overflow: "hidden"
                  }}
                >
                {/* Stock Banner */}
                <LinearGradient
                  colors={["#2dd4bf", "#14b8a6", "#2dd4bf"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingVertical: 4, paddingHorizontal: 12 }}
                >
                  <Text className="text-[#0a2540] text-xs font-semibold text-center">
                    {item.stock}
                  </Text>
                </LinearGradient>

                {/* Item Content */}
                <View className="flex-row items-center p-3">
                  {/* Item Image */}
                  <LinearGradient
                    colors={["#a5b4fc", "#c4b5fd", "#ddd6fe"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                      shadowColor: "#8b9dc3",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 15
                    }}
                  >
                    {item.lottieUrl ? (
                      <LottieView
                        source={{ uri: item.lottieUrl }}
                        autoPlay
                        loop
                        style={{ width: 80, height: 80 }}
                      />
                    ) : (
                      <Text className="text-6xl">{item.icon}</Text>
                    )}
                  </LinearGradient>

                  {/* Item Info */}
                  <View className="flex-1">
                    <Text className="text-white text-xl font-bold mb-1">
                      {item.name}
                    </Text>
                    <View className="flex-row items-center">
                      {item.level > 0 && (
                        <Text className="text-white text-2xl font-bold mr-2">
                          x{item.level}
                        </Text>
                      )}
                      <View className="bg-[#0a2540] rounded-full px-3 py-1 flex-row items-center">
                        <Text className="text-xs mr-1">{item.sellerIcon}</Text>
                        <Text className="text-white text-sm font-semibold">
                          {item.seller}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Price Button */}
                  <LinearGradient
                    colors={item.price === 0 ? ["#10b981", "#059669", "#047857"] : ["#f97316", "#ea580c", "#dc2626"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderWidth: 2,
                      borderColor: item.price === 0 ? "#34d399" : "#fbbf24",
                      shadowColor: item.price === 0 ? "#10b981" : "#f97316",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.6,
                      shadowRadius: 20
                    }}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-white text-xl font-bold">
                        {item.price === 0 ? (item.stock === "Coming Soon!" ? "Soon" : "FREE") : `$${item.price.toFixed(2)}`}
                      </Text>
                    </View>
                  </LinearGradient>

                  {/* Info Button */}
                  <View className="absolute top-2 right-2 w-7 h-7 bg-[#2dd4bf] rounded-full items-center justify-center" pointerEvents="none">
                    <Text className="text-white text-sm font-bold">i</Text>
                  </View>
                </View>
                </LinearGradient>
              </Pressable>
              )
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Layer 2: 3D Shop Owner Scene - full screen, transparent, on top of cards */}
      <View
        className="absolute inset-0"
        style={{ zIndex: 10 }}
        pointerEvents="none"
      >
        {sceneLoading && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator size="large" color="#2dd4bf" />
            <Text className="mt-2 text-white/60 text-sm">Loading 3D Scene...</Text>
          </View>
        )}
        <WebView
          source={{ html: htmlContent }}
          style={{ flex: 1, backgroundColor: "transparent" }}
          containerStyle={{ backgroundColor: "transparent" }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          scrollEnabled={false}
          overScrollMode="never"
          onLoad={() => {
            setTimeout(() => setSceneLoading(false), 1000);
          }}
        />
      </View>

      {/* Layer 3 (Top): Bottom UI - Timer and Stats */}
      <View className="absolute bottom-0 left-0 right-0" style={{ zIndex: 20 }}>
        {/* Bottom Timer */}
        <View className="items-center py-2 bg-[#0a2540]">
          <View className="bg-[#f5deb3] rounded-lg px-4 py-2 flex-row items-center">
            <Text className="text-2xl mr-2">⏱️</Text>
            <Text className="text-[#0a2540] font-bold text-sm">NEW ITEMS IN</Text>
            <Text className="text-[#0a2540] font-bold text-lg ml-1">3:07h</Text>
          </View>
        </View>

        {/* Bottom Stats Bar */}
        <View className="bg-[#4c1d95] flex-row items-center justify-around py-3 px-4">
          <View className="flex-row items-center">
            <Text className="text-3xl mr-2">💎</Text>
            <Text className="text-white text-xl font-bold">536</Text>
            <View className="ml-2 w-6 h-6 bg-pink-500 rounded items-center justify-center">
              <Text className="text-white text-lg font-bold">+</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Text className="text-3xl mr-2">🪙</Text>
            <Text className="text-white text-xl font-bold">268,095</Text>
            <View className="ml-2 w-6 h-6 bg-orange-500 rounded items-center justify-center">
              <Text className="text-white text-lg font-bold">+</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Text className="text-3xl mr-2">⚡</Text>
            <Text className="text-white text-xl font-bold">562</Text>
            <Text className="text-white text-xs ml-1">Max</Text>
          </View>

          <Pressable className="w-6 h-6 bg-white rounded-full items-center justify-center">
            <Text className="text-[#4c1d95] text-sm font-bold">i</Text>
          </Pressable>
        </View>
      </View>

      {/* Navigation Buttons - Fixed position */}
      <View className="absolute bottom-32 left-4" style={{ zIndex: 30 }} pointerEvents="box-none">
        <Pressable className="w-14 h-14 bg-white rounded-lg items-center justify-center active:opacity-70 mb-2">
          <Ionicons name="home" size={28} color="#0a2540" />
        </Pressable>
        <Pressable className="w-14 h-14 bg-[#1e5a7d] rounded-lg items-center justify-center active:opacity-70">
          <Ionicons name="chevron-back" size={28} color="white" />
          <Text className="text-white text-xs font-bold">Back</Text>
        </Pressable>
      </View>

      {/* Item Detail Modal */}
      <ItemDetailModal
        visible={modalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
        onPurchase={handlePurchase}
      />
    </View>
  );
}
