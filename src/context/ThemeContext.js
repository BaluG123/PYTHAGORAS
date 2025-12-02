import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme !== null) {
                    setIsDark(savedTheme === 'dark');
                }
            } catch (e) {
                console.error('Failed to load theme', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    };

    const theme = {
        isDark,
        colors: isDark ? darkColors : lightColors,
        fonts,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

const lightColors = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#6200EE',
    secondary: '#03DAC6',
    card: '#F5F5F5',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#B00020',
};

const darkColors = {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    card: '#1E1E1E',
    border: '#2C2C2C',
    success: '#81C784',
    error: '#CF6679',
};

const fonts = {
    regular: {
        fontFamily: 'System',
        fontWeight: '400',
    },
    medium: {
        fontFamily: 'System',
        fontWeight: '500',
    },
    bold: {
        fontFamily: 'System',
        fontWeight: '700',
    },
    heavy: {
        fontFamily: 'System',
        fontWeight: '900',
    },
};
