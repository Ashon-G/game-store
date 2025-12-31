// Merchant Screen with Hologram Gradients and Animations
import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing
} from "react-native-reanimated";
import ShopScene from "../components/ShopScene";
import ItemDetailModal from "../components/ItemDetailModal";

interface ShopItem {
  id: string;
  name: string;
  level: number;
  price: number;
  stock: string;
  icon: string;
  seller: string;
  sellerIcon: string;
}

const shopItems: ShopItem[] = [
  {
    id: "1",
    name: "Basic Melde Axe",
    level: 3,
    price: 1000,
    stock: "Limited Stock! Only 1 left!",
    icon: "🪓",
    seller: "Outlaw",
    sellerIcon: "☠️"
  },
  {
    id: "2",
    name: "Standard Alfar Sword",
    level: 3,
    price: 1000,
    stock: "Limited Stock! Only 1 left!",
    icon: "⚔️",
    seller: "Goblin",
    sellerIcon: "👺"
  },
  {
    id: "3",
    name: "Standard Dokka Axe",
    level: 3,
    price: 1000,
    stock: "Limited Stock! Only 1 left!",
    icon: "🪓",
    seller: "Beast",
    sellerIcon: "👹"
  },
  {
    id: "4",
    name: "Standard Melde Hammer",
    level: 1,
    price: 1000,
    stock: "Limited Stock! Only 1 left!",
    icon: "🔨",
    seller: "Outlaw",
    sellerIcon: "☠️"
  }
];

export default function MerchantScreen() {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    // Handle purchase logic here
    console.log("Purchasing:", item.name);
    handleCloseModal();
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#0a2540", "#1e3a5f", "#2d4a6b"]}
        style={{ flex: 1 }}
      >
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header - Fixed at top */}
        <View className="px-4 pt-2 pb-4 bg-[#0a2540]">
          <View className="flex-row items-center mb-4">
            <View className="w-20 h-20 bg-[#5c8db8] rounded-lg items-center justify-center mr-4">
              <Text className="text-4xl">⚔️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-3xl font-bold">MERCHANT</Text>
              <Text className="text-white text-xl">Blunt&apos;s Weaponsmith</Text>
            </View>
          </View>
        </View>

        {/* Main Content Area */}
        <View className="flex-1">
          {/* Scrollable Items List */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 320 }}
            showsVerticalScrollIndicator={false}
          >
            {shopItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleItemPress(item)}
                className="mb-3 rounded-2xl overflow-hidden active:opacity-70 active:scale-[0.98]"
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
                    borderColor: "#2dd4bf"
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
                    <Text className="text-6xl">{item.icon}</Text>
                  </LinearGradient>

                  {/* Item Info */}
                  <View className="flex-1">
                    <Text className="text-white text-xl font-bold mb-1">
                      {item.name}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-white text-2xl font-bold mr-2">
                        Lv.{item.level}
                      </Text>
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
                    colors={["#f97316", "#ea580c", "#dc2626"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderWidth: 2,
                      borderColor: "#fbbf24",
                      shadowColor: "#f97316",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.6,
                      shadowRadius: 20
                    }}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-white text-2xl font-bold mr-1">
                        {item.price.toLocaleString()}
                      </Text>
                      <Text className="text-xl">🪙</Text>
                    </View>
                  </LinearGradient>

                  {/* Info Button */}
                  <View className="absolute top-2 right-2 w-7 h-7 bg-[#2dd4bf] rounded-full items-center justify-center" pointerEvents="none">
                    <Text className="text-white text-sm font-bold">i</Text>
                  </View>
                </View>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 3D Shop Owner Scene */}
        <View
          className="absolute left-0 right-0"
          style={{ bottom: 100, height: 250, pointerEvents: "none", zIndex: 0 }}
        >
          <ShopScene />
        </View>

        {/* Bottom Timer - Fixed at bottom */}
        <View className="items-center py-2 bg-[#0a2540] z-20">
          <View className="bg-[#f5deb3] rounded-lg px-4 py-2 flex-row items-center">
            <Text className="text-2xl mr-2">⏱️</Text>
            <Text className="text-[#0a2540] font-bold text-sm">NEW ITEMS IN</Text>
            <Text className="text-[#0a2540] font-bold text-lg ml-1">3:07h</Text>
          </View>
        </View>

        {/* Bottom Stats Bar - Fixed at bottom */}
        <View className="bg-gradient-to-r from-purple-900 to-purple-700 z-20">
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
        <View className="absolute bottom-32 left-4 z-30" pointerEvents="box-none">
          <Pressable className="w-14 h-14 bg-white rounded-lg items-center justify-center active:opacity-70 mb-2">
            <Ionicons name="home" size={28} color="#0a2540" />
          </Pressable>
          <Pressable className="w-14 h-14 bg-[#1e5a7d] rounded-lg items-center justify-center active:opacity-70">
            <Ionicons name="chevron-back" size={28} color="white" />
            <Text className="text-white text-xs font-bold">Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      </LinearGradient>

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
