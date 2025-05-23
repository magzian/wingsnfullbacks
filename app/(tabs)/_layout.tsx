import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
    return (
        <View style={{ flex: 1, backgroundColor: "#181A20" }}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Wings and Fullbacks</Text>
            </View>
            {/* Tab Navigator */}
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#B0B3B8",
                    tabBarStyle: { backgroundColor: "#181A20", borderTopColor: "#23252B" },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Index",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home" size={24} color={color} />
                        ),
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
                    name="register"
                    options={{
                        title: "Register",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-add" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="plus" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="livescores"
                    options={{
                        title: "Live Scores",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="stats-chart" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        height: 100,
        backgroundColor: "#23252B",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 12,
    },
    topBarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});
