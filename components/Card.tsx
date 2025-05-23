import type React from "react"
import { StyleSheet, View, type ViewStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  colors?: any
}

export const Card: React.FC<CardProps> = ({ children, style, colors }) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors?.card || "#FFFFFF",
          borderColor: colors?.border || "#E0E0E0",
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
})
