import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            /* screenOptions={{
                tabBarActiveTintColor: "#e91e63",
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 5,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    height: 60,
                },
            }} */
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                      // Hide tab bar and header for splash screen
                    tabBarStyle: { display: "none" },
                    headerShown: false,
                }}
            />

            <Tabs.Screen 
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen 
                name="livescores"
                options={{
                    title: "Matches",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="trophy" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen 
                name="stats"
                options={{
                    title: "Stats",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="stats-chart" size={24} color={color} />
                    ),
                }}
            />
            
        </Tabs>
    );
}
