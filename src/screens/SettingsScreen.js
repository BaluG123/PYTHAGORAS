import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({ navigation }) => {
    const { isDark, toggleTheme, colors } = useTheme();
    const { setCurrentLevel } = useGame();

    const handleReset = () => {
        Alert.alert(
            "Reset Progress",
            "Are you sure you want to reset all game progress? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem('currentLevel');
                        await AsyncStorage.removeItem('unlockedLevels');
                        await AsyncStorage.removeItem('score');
                        setCurrentLevel(1);
                        Alert.alert("Reset Complete", "Game progress has been reset.");
                    }
                }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
                <View style={{ width: 30 }} />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#767577", true: colors.primary }}
                    thumbColor={isDark ? "#fff" : "#f4f3f4"}
                />
            </View>

            <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: colors.error }]}
                onPress={handleReset}
            >
                <Text style={styles.resetText}>Reset Game Progress</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
    },
    settingText: {
        fontSize: 18,
    },
    resetButton: {
        marginTop: 50,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    resetText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
