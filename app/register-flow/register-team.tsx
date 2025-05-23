import { darkTheme } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterTeam() {
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
     <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
      <TextInput
        style={styles.input}
        placeholder="Team Name"
        placeholderTextColor={darkTheme.text}
        value={teamName}
        onChangeText={setTeamName}
      />
      <TextInput
        style={styles.input}
        placeholder="Coach Name"
        placeholderTextColor={darkTheme.text}
        value={coachName}
        onChangeText={setCoachName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        placeholderTextColor={darkTheme.text}
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={darkTheme.text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.logoPicker} onPress={pickImage}>
        <Text style={{ color: "#007AFF" }}>
          {logo ? "Change Team Logo" : "Pick Team Logo"}
        </Text>
      </TouchableOpacity> 
      {logo && (
        <Image source={{ uri: logo }} style={styles.logo} />
      )}
      <Button
        title="Add Players"
        onPress={() => router.push("/register-flow/add-players")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  logoPicker: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 50,
  },
});