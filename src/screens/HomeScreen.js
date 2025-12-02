import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation();
    const { colors, isDark } = useTheme();
    const { currentLevel } = useGame();

    return (
        <LinearGradient
            colors={isDark ? ['#1a2a6c', '#b21f1f', '#fdbb2d'] : ['#a8c0ff', '#3f2b96']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <Animatable.View
                animation="fadeInDown"
                duration={1500}
                style={styles.logoContainer}
            >
                <LottieView
                    source={require('../assets/animations/math.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.title}>PYTHAGORAS</Text>
                <Text style={styles.subtitle}>Master the Riddles</Text>
            </Animatable.View>

            <Animatable.View
                animation="fadeInUp"
                delay={500}
                duration={1500}
                style={styles.contentContainer}
            >
                <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Current Level: {currentLevel}</Text>
                </View>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => navigation.navigate('Game')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#FF416C', '#FF4B2B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.playButtonText}>PLAY</Text>
                        <Icon name="play" size={30} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontFamily: 'System', // Replace with custom font if available
    },
    subtitle: {
        fontSize: 18,
        color: '#eee',
        marginTop: 10,
        letterSpacing: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 50,
    },
    levelBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    levelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    playButton: {
        width: width * 0.7,
        height: 70,
        borderRadius: 35,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    gradientButton: {
        flex: 1,
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10,
        letterSpacing: 2,
    },
});

export default HomeScreen;
