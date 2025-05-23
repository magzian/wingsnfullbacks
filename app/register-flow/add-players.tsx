import { darkTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddPlayers() {
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  interface Player {
    name: string;
    position: string;
  }
  const router = useRouter();

  const addPlayer = () => {
    if (players.length >= 10) {
      Alert.alert("Maximum players reached", "You can only add up to 10 players.");
      return;
    }
    if (!playerName.trim() || !playerPosition.trim()) {
      Alert.alert("Please enter both name and position.");
      return;
    }
    setPlayers([...players, { name: playerName, position: playerPosition }]);
    setPlayerName("");
    setPlayerPosition("");
  };

  const completeRegistration = () => {
    Alert.alert("Team registration complete!", "Players added: " + players.length);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
      <TextInput
        style={styles.input}
        placeholder="Player Name"
        placeholderTextColor={darkTheme.text}
        value={playerName}
        onChangeText={setPlayerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Player Position"
        placeholderTextColor={darkTheme.text}
        value={playerPosition}
        onChangeText={setPlayerPosition}
      />
      <Button
        title="Add Player"
        onPress={addPlayer}
        disabled={players.length >= 10}
      />
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Complete Team Registration"
          onPress={completeRegistration}
          disabled={players.length === 0}
        />
      </View>
      <Text style={styles.subheading}>Players List ({players.length}/10):</Text>
      <FlatList
        data={players}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.playerItem}>{index + 1}. {item.name} - {item.position}</Text>
        )}
        style={{ marginVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: darkTheme.background },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: darkTheme.text },
  subheading: { fontSize: 16, fontWeight: "bold", marginTop: 20, color: darkTheme.text },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    color: darkTheme.text,
  },
  playerItem: {
    fontSize: 16,
    paddingVertical: 2,
    color: darkTheme.text,
  },
});