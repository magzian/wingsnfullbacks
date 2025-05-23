import React, { useEffect } from 'react';

import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';




export default function SplashScreen() {
    const navigation = useNavigation()
    const router = useRouter()


   /*  const handleGetStarted = () => {
    navigation.navigate("MainTabs" as never)
  } */


    useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home"); // Change 'home' to your actual home screen name
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [router]);


return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
        <Text>Welcome to Wings And Fullbacks</Text>
        {/* You can add your logo or any other content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

