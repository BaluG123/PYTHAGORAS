import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import riddles from '../data/riddles.json';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import SoundPlayer from 'react-native-sound-player';

const GameScreen = ({ navigation }) => {
    const { colors, isDark } = useTheme();
    const { currentLevel, completeLevel } = useGame();
    const [answer, setAnswer] = useState('');
    const [currentRiddle, setCurrentRiddle] = useState(null);
    const [shakeAnimation, setShakeAnimation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        const riddle = riddles.find(r => r.level === currentLevel);
        if (riddle) {
            setCurrentRiddle(riddle);
            setAnswer('');
        } else {
            Alert.alert("Congratulations!", "You have completed all available levels!");
            navigation.goBack();
        }
    }, [currentLevel]);

    const playSound = (soundName) => {
        try {
            SoundPlayer.playSoundFile(soundName, 'mp3');
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const checkAnswer = () => {
        if (!currentRiddle) return;

        if (answer.trim().toLowerCase() === currentRiddle.answer.toLowerCase()) {
            setIsWin(true);
            setModalVisible(true);
            playSound('win');
        } else {
            setShakeAnimation('shake');
            setTimeout(() => setShakeAnimation(null), 1000);
            setIsWin(false);
            setModalVisible(true);
            playSound('lose');
        }
    };

    const handleNextLevel = () => {
        setModalVisible(false);
        if (isWin) {
            completeLevel(currentLevel);
        }
    };

    if (!currentRiddle) return null;

    return (
        <LinearGradient
            colors={isDark ? ['#232526', '#414345'] : ['#E0EAFC', '#CFDEF3']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={30} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Level {currentLevel}</Text>
                        <TouchableOpacity onPress={() => Alert.alert("Hint", currentRiddle.hint)}>
                            <Icon name="lightbulb-on-outline" size={30} color="#FFD700" />
                        </TouchableOpacity>
                    </View>

                    <Animatable.View
                        animation="zoomIn"
                        style={[styles.card, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }]}
                    >
                        <Text style={[styles.questionText, { color: colors.text }]}>
                            {currentRiddle.question}
                        </Text>
                    </Animatable.View>

                    <Animatable.View
                        animation={shakeAnimation}
                        style={styles.inputContainer}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: colors.text,
                                    borderColor: colors.primary,
                                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : '#fff'
                                }
                            ]}
                            placeholder="Type your answer..."
                            placeholderTextColor={isDark ? '#aaa' : '#666'}
                            value={answer}
                            onChangeText={setAnswer}
                        />
                    </Animatable.View>

                    <TouchableOpacity onPress={checkAnswer} style={styles.submitButton}>
                        <LinearGradient
                            colors={['#11998e', '#38ef7d']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.submitText}>SUBMIT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: isDark ? '#333' : '#fff' }]}>
                        <LottieView
                            source={isWin ? require('../assets/animations/win.json') : require('../assets/animations/lose.json')}
                            autoPlay
                            loop={false}
                            style={styles.lottie}
                        />
                        <Text style={[styles.modalTitle, { color: isWin ? colors.success : colors.error }]}>
                            {isWin ? "Correct!" : "Wrong Answer"}
                        </Text>
                        <Text style={[styles.modalText, { color: colors.text }]}>
                            {isWin ? "Great job! Ready for the next one?" : "Don't give up! Try again."}
                        </Text>
                        <TouchableOpacity onPress={handleNextLevel} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>{isWin ? "Next Level" : "Try Again"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        padding: 30,
        borderRadius: 20,
        marginBottom: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    questionText: {
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 32,
        fontWeight: '500',
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        height: 60,
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    submitButton: {
        height: 60,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    gradientButton: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 10,
    },
    lottie: {
        width: 150,
        height: 150,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameScreen;
