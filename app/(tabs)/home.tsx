import { darkTheme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();
    return (
        <ScrollView style={{ backgroundColor: darkTheme.background }} contentContainerStyle={styles.container}>
            {/* App Logo and Welcome */}
            <View style={styles.header}>
                <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
                <Text style={styles.title}>Wings & Fullbacks</Text>
                <Text style={styles.subtitle}>Your Ultimate Football Companion</Text>
            </View>

            {/* Highlights */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Highlights</Text>
                <View style={styles.highlightsRow}>
                    <View style={styles.highlightCard}>
                        <Text style={styles.highlightEmoji}>⚽</Text>
                        <Text style={styles.highlightText}>Live Scores</Text>
                    </View>
                    <View style={styles.highlightCard}>
                        <Text style={styles.highlightEmoji}>📝</Text>
                        <Text style={styles.highlightText}>Team Registration</Text>
                    </View>
                    <View style={styles.highlightCard}>
                        <Text style={styles.highlightEmoji}>📊</Text>
                        <Text style={styles.highlightText}>Match Stats</Text>
                    </View>
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/register-flow/register-team')}>
                        <Text style={styles.actionText}>Register Team</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/livescores')} >
                        <Text style={styles.actionText}>View Live Scores</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Latest News/Updates */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Latest News</Text>
                <View style={styles.newsCard}>
                    <Text style={styles.newsTitle}>🏆 New Season Kicks Off!</Text>
                    <Text style={styles.newsText}>Stay tuned for live updates, team registrations, and match stats as the new football season begins. Good luck to all teams!</Text>
                </View>
                <View style={styles.newsCard}>
                    <Text style={styles.newsTitle}>📢 Feature Update</Text>
                    <Text style={styles.newsText}>You can now add players to your team and track live match events in real time.</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    title: {
        color: darkTheme.text,
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    subtitle: {
        color: darkTheme.secondaryText,
        fontSize: 16,
        marginTop: 4,
        marginBottom: 8,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        color: darkTheme.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    highlightsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightCard: {
        backgroundColor: '#23252B',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        width: '30%',
    },
    highlightEmoji: {
        fontSize: 28,
        marginBottom: 6,
    },
    highlightText: {
        color: darkTheme.text,
        fontSize: 14,
        textAlign: 'center',
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBtn: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginHorizontal: 4,
        flex: 1,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    newsCard: {
        backgroundColor: '#23252B',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    newsTitle: {
        color: darkTheme.text,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    newsText: {
        color: darkTheme.secondaryText,
        fontSize: 14,
    },
});