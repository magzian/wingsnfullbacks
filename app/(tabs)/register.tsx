import { ActionCard } from "@/components/ActionCard";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { darkTheme } from "../../constants/theme";

export default function Register() {
  const router = useRouter();

  return (
    <View style={[styles.section, { backgroundColor: darkTheme.background }]}>
      <View style={styles.actionGrid}>
        <ActionCard
          icon="people"
          title="Team Registration"
          onPress={() => router.push("/register-flow/register-team")}
          colors={darkTheme}
        />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroBanner: {
    height: 160,
    padding: 16,
    justifyContent: "center",
  },
  heroContent: {
    maxWidth: "80%",
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 12,
  },
  heroButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  section: {
    flex: 1,
    padding: 16,
    backgroundColor: darkTheme.background,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: darkTheme.text,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  matchList: {
    gap: 12,
  },
  newsList: {
    gap: 12,
  },
});