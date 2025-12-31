import React from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ItemViewer3D from "./ItemViewer3D";

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

interface ItemDetailModalProps {
  visible: boolean;
  item: ShopItem | null;
  onClose: () => void;
  onPurchase: (item: ShopItem) => void;
}

export default function ItemDetailModal({
  visible,
  item,
  onClose,
  onPurchase,
}: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        <SafeAreaView edges={["bottom"]} className="bg-[#0a2540] rounded-t-3xl max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#2a6b8f]">
            <Text className="text-white text-2xl font-bold">Item Details</Text>
            <Pressable
              onPress={onClose}
              className="w-10 h-10 bg-[#1e5a7d] rounded-full items-center justify-center active:opacity-70"
            >
              <Ionicons name="close" size={24} color="white" />
            </Pressable>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* 3D Item Viewer */}
            <View className="h-80 bg-gradient-to-b from-[#1e5a7d] to-[#0a2540]">
              <ItemViewer3D itemIcon={item.icon} itemName={item.name} />
            </View>

            {/* Item Info */}
            <View className="px-6 py-6">
              {/* Stock Banner */}
              <View className="bg-[#2dd4bf] rounded-xl py-3 px-4 mb-4">
                <Text className="text-[#0a2540] text-sm font-bold text-center">
                  {item.stock}
                </Text>
              </View>

              {/* Item Name */}
              <Text className="text-white text-3xl font-bold mb-4">
                {item.name}
              </Text>

              {/* Level and Seller */}
              <View className="flex-row items-center mb-6">
                <View className="bg-[#1e5a7d] rounded-xl px-4 py-3 mr-3">
                  <Text className="text-white text-2xl font-bold">
                    Level {item.level}
                  </Text>
                </View>
                <View className="bg-[#0a2540] rounded-xl px-4 py-3 flex-row items-center">
                  <Text className="text-2xl mr-2">{item.sellerIcon}</Text>
                  <Text className="text-white text-lg font-semibold">
                    {item.seller}
                  </Text>
                </View>
              </View>

              {/* Item Description */}
              <View className="bg-[#1e5a7d] rounded-xl p-4 mb-6">
                <Text className="text-white text-lg font-bold mb-2">
                  Description
                </Text>
                <Text className="text-white/80 text-base leading-6">
                  {getItemDescription(item)}
                </Text>
              </View>

              {/* Item Stats */}
              <View className="bg-[#1e5a7d] rounded-xl p-4 mb-6">
                <Text className="text-white text-lg font-bold mb-3">
                  Stats
                </Text>
                {getItemStats(item).map((stat, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between py-2 border-b border-[#2a6b8f] last:border-b-0"
                  >
                    <View className="flex-row items-center">
                      <Text className="text-xl mr-2">{stat.icon}</Text>
                      <Text className="text-white text-base">{stat.name}</Text>
                    </View>
                    <Text className="text-white text-base font-bold">
                      {stat.value}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Price and Purchase Button */}
              <Pressable
                onPress={() => onPurchase(item)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 active:opacity-80"
              >
                <View className="bg-[#f97316] rounded-2xl py-5 px-6 flex-row items-center justify-center border-4 border-[#ea580c]">
                  <Text className="text-white text-2xl font-bold mr-2">
                    Purchase for {item.price.toLocaleString()}
                  </Text>
                  <Text className="text-3xl">🪙</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

function getItemDescription(item: ShopItem): string {
  const descriptions: Record<string, string> = {
    "Basic Melde Axe":
      "A reliable axe forged by the Melde clan. Perfect for both combat and gathering resources. Its balanced weight makes it ideal for warriors starting their journey.",
    "Standard Alfar Sword":
      "An elegant blade crafted with Alfar precision. Known for its sharp edge and durability. A favorite among skilled swordsmen.",
    "Standard Dokka Axe":
      "A heavy-duty axe from the Dokka warriors. Built for maximum impact and devastating strikes. Requires strength to wield effectively.",
    "Standard Melde Hammer":
      "A sturdy hammer designed for crushing blows. Simple yet effective, this weapon has proven itself in countless battles.",
  };
  return (
    descriptions[item.name] ||
    "A powerful weapon forged by skilled craftsmen. This item will serve you well in your adventures."
  );
}

function getItemStats(item: ShopItem): Array<{
  icon: string;
  name: string;
  value: string;
}> {
  const baseStats = [
    { icon: "⚔️", name: "Attack Power", value: `${item.level * 35 + 50}` },
    { icon: "🛡️", name: "Durability", value: `${item.level * 20 + 80}/100` },
    { icon: "⚡", name: "Speed", value: item.name.includes("Sword") ? "Fast" : item.name.includes("Hammer") ? "Slow" : "Medium" },
    { icon: "💎", name: "Rarity", value: item.stock.includes("Limited") ? "Rare" : "Common" },
  ];
  return baseStats;
}
