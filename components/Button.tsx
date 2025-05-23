import type React from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, type TextStyle, type ViewStyle } from "react-native"

interface ButtonProps {
    title: string
    onPress: () => void
    backgroundColor?: string
    textColor?: string
    style?: ViewStyle
    textStyle?: TextStyle
    disabled?: boolean
    loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    backgroundColor = "#000000",
    textColor = "#FFFFFF",
    style,
    textStyle,
    disabled = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={textColor} size="small" />
            ) : (
                <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        fontFamily: "Inter-Medium",
    },
    disabled: {
        opacity: 0.5,
    },
})
