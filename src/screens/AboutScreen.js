import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>About</Text>
                <View style={{ width: 30 }} />
            </View>

            <View style={styles.content}>
                <Icon name="math-compass" size={80} color={colors.primary} />
                <Text style={[styles.appName, { color: colors.text }]}>Pythagoras</Text>
                <Text style={[styles.version, { color: colors.text }]}>Version 1.0.0</Text>
                <Text style={[styles.description, { color: colors.text }]}>
                    A premium riddle and puzzle game designed to challenge your mind.
                </Text>
                <Text style={[styles.footer, { color: colors.text }]}>
                    Created with React Native
                </Text>
            </View>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
    },
    version: {
        fontSize: 16,
        marginTop: 10,
        opacity: 0.7,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
        lineHeight: 26,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        fontSize: 14,
        opacity: 0.5,
    },
});

export default AboutScreen;
