import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Card } from "./Card"

interface ActionCardProps {
  icon: string
  title: string
  onPress: () => void
  colors?: any
}

export const ActionCard: React.FC<ActionCardProps> = ({ icon, title, onPress, colors }) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.7}>
      <Card colors={colors} style={styles.card}>
        <View style={styles.container}>
          <View style={[styles.iconContainer, { backgroundColor: colors?.primary || "#000000" }]}>
            <Ionicons size={20} color={colors?.white || "#FFFFFF"} />
          </View>
          <Text style={[styles.title, { color: colors?.text || "#000000" }]}>{title}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    width: "48%",
    marginBottom: 12,
  },
  card: {
    height: 100,
  },
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
})
