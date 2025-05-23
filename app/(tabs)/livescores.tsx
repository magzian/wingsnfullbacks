import { darkTheme } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function LiveScoresScreen() {
    return (
        <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
            <Text style={[styles.text, { color: darkTheme.text }]}>Livescores</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});