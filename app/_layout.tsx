import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
  <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register-flow/register-team" options={{
      title: "Register Team",
      headerStyle: { backgroundColor: "#181A20" }, // set dark background
      headerTintColor: "#fff", // set text/icons to white
  }} />
      <Stack.Screen name="register-flow/add-players" options={{ 
        title: "Add Players",
         headerStyle: { backgroundColor: "#181A20" }, // set dark background
         headerTintColor: "#fff", // set text/icons to white
        }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
