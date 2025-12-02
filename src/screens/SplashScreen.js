import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('HomeMain');
        }, 3000);
    }, []);

    return (
        <LinearGradient
            colors={['#000000', '#434343']}
            style={styles.container}
        >
            <Animatable.View
                animation="zoomIn"
                duration={2000}
                style={styles.logoContainer}
            >
                <Text style={styles.logoText}>P</Text>
            </Animatable.View>
            <Animatable.Text
                animation="fadeInUp"
                delay={1000}
                style={styles.title}
            >
                PYTHAGORAS
            </Animatable.Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 10,
    },
    logoText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#000',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
        letterSpacing: 5,
    },
});

export default SplashScreen;
