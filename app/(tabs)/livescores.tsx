import { darkTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const TABS = ["Upcoming", "Live", "Finished"];

export default function LiveScoresScreen() {
    const [selectedTab, setSelectedTab] = useState(0);

    // State for matches
    const [upcomingMatches, setUpcomingMatches] = useState([
        { id: "1", teams: "Team A vs Team B", time: "12:00" },
        { id: "2", teams: "Team C vs Team D", time: "15:00" },
    ]);
    const [liveGames, setLiveGames] = useState([
        { id: "3", teams: "Team E vs Team F", teamA: "Team E", teamB: "Team F", time: "60'" },
        { id: "4", teams: "Team G vs Team H", teamA: "Team G", teamB: "Team H", time: "72'" },
    ]);
    const [finishedGames, setFinishedGames] = useState([
        { id: "5", teams: "Team I vs Team J", score: "2-2", time: "FT" },
    ]);

    // Local state for input values (not persisted)
    const [scoreInputs, setScoreInputs] = useState<{ [key: string]: { scoreA: string; scoreB: string } }>({
        "3": { scoreA: "", scoreB: "" },
        "4": { scoreA: "", scoreB: "" },
    });

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [startTime, setStartTime] = useState("");

    // Goal modal state
    const [goalModalVisible, setGoalModalVisible] = useState(false);
    const [goalScorer, setGoalScorer] = useState("");
    const [goalAssist, setGoalAssist] = useState("");
    const [activeGoalGameId, setActiveGoalGameId] = useState<string | null>(null);

    const handleScoreChange = (gameId: string, team: "scoreA" | "scoreB", value: string) => {
        setScoreInputs((prev) => ({
            ...prev,
            [gameId]: {
                ...prev[gameId],
                [team]: value.replace(/[^0-9]/g, ""), // Only allow numbers
            },
        }));
    };

    // Confirm and finish game
    const handleConfirm = (gameId: string) => {
        setLiveGames(prevLiveGames => {
            const game = prevLiveGames.find(g => g.id === gameId);
            if (!game) return prevLiveGames;
            const scores = scoreInputs[gameId];
            Alert.alert(
                "Confirm",
                `Finish "${game.teams}" with score: ${scores?.scoreA || 0} - ${scores?.scoreB || 0}?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Finish",
                        style: "destructive",
                        onPress: () => {
                            setLiveGames(liveGames => liveGames.filter(g => g.id !== gameId));
                            setFinishedGames(finishedGames => [
                                {
                                    id: `${game.id}-${Date.now()}`, // ensure unique id
                                    teams: game.teams,
                                    score: `${scores?.scoreA || 0}-${scores?.scoreB || 0}`,
                                    time: "FT",
                                },
                                ...finishedGames,
                            ]);
                            setScoreInputs(inputs => {
                                const updated = { ...inputs };
                                delete updated[gameId];
                                return updated;
                            });
                        },
                    },
                ]
            );
            return prevLiveGames;
        });
    };

    // Add match logic
    const handleAddMatch = () => {
        if (!team1.trim() || !team2.trim() || !startTime.trim()) {
            Alert.alert("All fields are required.");
            return;
        }
        const newMatch = {
            id: Date.now().toString(),
            teams: `${team1} vs ${team2}`,
            time: startTime,
        };
        setUpcomingMatches([newMatch, ...upcomingMatches]);
        setTeam1("");
        setTeam2("");
        setStartTime("");
        setModalVisible(false);
    };

    // Make match live
    const handleMakeLive = (match: { id: string; teams: string; time: string }) => {
        // Split teams
        const [teamA, teamB] = match.teams.split(" vs ");
        const newLiveGame = {
            id: match.id,
            teams: match.teams,
            teamA: teamA?.trim() || "",
            teamB: teamB?.trim() || "",
            time: match.time,
        };
        setLiveGames([newLiveGame, ...liveGames]);
        setScoreInputs((prev) => ({
            ...prev,
            [match.id]: { scoreA: "", scoreB: "" },
        }));
        setUpcomingMatches(upcomingMatches.filter((m) => m.id !== match.id));
    };

    return (
        <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
            {/* Add Match Button */}
            {selectedTab === 0 && (
                <TouchableOpacity style={styles.addMatchBtn} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={24} color="#4CAF50" />
                    <Text style={styles.addMatchText}>Add Match</Text>
                </TouchableOpacity>
            )}

            {/* Add Match Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Match</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Team 1"
                            placeholderTextColor="#B0B3B8"
                            value={team1}
                            onChangeText={setTeam1}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Team 2"
                            placeholderTextColor="#B0B3B8"
                            value={team2}
                            onChangeText={setTeam2}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Start Time (e.g. 18:00)"
                            placeholderTextColor="#B0B3B8"
                            value={startTime}
                            onChangeText={setStartTime}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                            <Pressable style={styles.modalBtn} onPress={handleAddMatch}>
                                <Text style={styles.modalBtnText}>Add</Text>
                            </Pressable>
                            <Pressable style={[styles.modalBtn, { backgroundColor: "#444" }]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Goal Modal */}
            <Modal
                visible={goalModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setGoalModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Goal/Assist</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Goal Scorer"
                            placeholderTextColor="#B0B3B8"
                            value={goalScorer}
                            onChangeText={setGoalScorer}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Assist (optional)"
                            placeholderTextColor="#B0B3B8"
                            value={goalAssist}
                            onChangeText={setGoalAssist}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                            <Pressable
                                style={styles.modalBtn}
                                onPress={() => {
                                    // Here you would send goalScorer, goalAssist, and activeGoalGameId to backend or update state
                                    Alert.alert("Goal Recorded", `Scorer: ${goalScorer}\nAssist: ${goalAssist || "None"}`);
                                    setGoalScorer("");
                                    setGoalAssist("");
                                    setActiveGoalGameId(null);
                                    setGoalModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalBtnText}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalBtn, { backgroundColor: "#444" }]}
                                onPress={() => {
                                    setGoalScorer("");
                                    setGoalAssist("");
                                    setActiveGoalGameId(null);
                                    setGoalModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Toggle Tabs */}
            <View style={styles.tabContainer}>
                {TABS.map((tab, idx) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            selectedTab === idx && styles.activeTab,
                        ]}
                        onPress={() => setSelectedTab(idx)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: selectedTab === idx ? darkTheme.text : darkTheme.secondaryText },
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Section Content */}
            {selectedTab === 0 && (
                <FlatList
                    data={upcomingMatches}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View>
                                    <Text style={styles.cardText}>{item.teams}</Text>
                                    <Text style={styles.cardSub}>{item.time}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.makeLiveBtn}
                                    onPress={() => handleMakeLive(item)}
                                >
                                    <Ionicons name="play-circle" size={28} color="#4CAF50" />
                                    <Text style={styles.makeLiveText}>Make Live</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
            {selectedTab === 1 && (
                <FlatList
                    data={liveGames}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.card, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cardText}>{item.teams}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                    {/* Team A Input */}
                                    <Text style={styles.scoreLabel}>{item.teamA}</Text>
                                    <View style={styles.inputBox}>
                                        <TextInput
                                            style={styles.scoreInput}
                                            placeholder="0"
                                            placeholderTextColor="#B0B3B8"
                                            keyboardType="numeric"
                                            value={scoreInputs[item.id]?.scoreA || ""}
                                            onChangeText={(val) => handleScoreChange(item.id, "scoreA", val)}
                                        />
                                    </View>
                                    <Text style={styles.scoreLabel}> - </Text>
                                    {/* Team B Input */}
                                    <Text style={styles.scoreLabel}>{item.teamB}</Text>
                                    <View style={styles.inputBox}>
                                        <TextInput
                                            style={styles.scoreInput}
                                            placeholder="0"
                                            placeholderTextColor="#B0B3B8"
                                            keyboardType="numeric"
                                            value={scoreInputs[item.id]?.scoreB || ""}
                                            onChangeText={(val) => handleScoreChange(item.id, "scoreB", val)}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.cardSub}>Time: {item.time}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {/* Add Goal/Assist Button */}
                                <TouchableOpacity
                                    style={{
                                        marginRight: 8,
                                        backgroundColor: "#23252B",
                                        borderRadius: 16,
                                        padding: 6,
                                    }}
                                    onPress={() => {
                                        setActiveGoalGameId(item.id);
                                        setGoalModalVisible(true);
                                    }}
                                >
                                    <Ionicons name="add" size={24} color="#4CAF50" />
                                </TouchableOpacity>
                                {/* Confirm Button */}
                                <TouchableOpacity
                                    style={styles.confirmBtn}
                                    onPress={() => handleConfirm(item.id)}
                                >
                                    <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
            {selectedTab === 2 && (
                <FlatList
                    data={finishedGames}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{item.teams}</Text>
                            <Text style={styles.cardSub}>Final Score: {item.score}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 16 },
    addMatchBtn: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 24,
        marginBottom: 8,
        backgroundColor: "#23252B",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    addMatchText: {
        color: "#4CAF50",
        fontWeight: "bold",
        marginLeft: 6,
        fontSize: 16,
    },
    makeLiveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#181A20",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    makeLiveText: {
        color: "#4CAF50",
        fontWeight: "bold",
        marginLeft: 4,
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#23252B",
        padding: 24,
        borderRadius: 12,
        width: "85%",
        alignItems: "stretch",
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    modalInput: {
        backgroundColor: "#181A20",
        color: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#444",
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    modalBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    modalBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
        backgroundColor: "#23252B",
        borderRadius: 8,
        marginHorizontal: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#181A20",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#23252B",
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        padding: 16,
    },
    cardText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    cardSub: {
        color: "#B0B3B8",
        fontSize: 14,
        marginTop: 4,
        marginBottom: 8,
    },
    scoreLabel: {
        color: "#fff",
        fontSize: 14,
        marginHorizontal: 4,
    },
    inputBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    scoreInput: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        width: 40,
        height: 36,
        backgroundColor: "#181A20",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#444",
        textAlign: "center",
        marginHorizontal: 4,
    },
    confirmBtn: {
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});