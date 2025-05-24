import { ActionCard } from "@/components/ActionCard";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkTheme } from "../../constants/theme";

export default function Register() {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.background }]}>  
      <View style={styles.card}>
        <Text style={styles.title}>Team Registration</Text>
        <Text style={styles.subtitle}>Register your football team and manage your squad easily.</Text>
        <View style={styles.actionGrid}>
          <ActionCard
            icon="person-add"
            title="Team Registration"
            onPress={() => router.push("/register-flow/register-team")}
            colors={darkTheme}
          />  
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.background,
    padding: 16,
  },
  card: {
    backgroundColor: "#23252B",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: darkTheme.text,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: darkTheme.secondaryText,
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
});