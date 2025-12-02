import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import SplashScreen from '../screens/SplashScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const { isDark, colors, fonts } = useTheme();

    return (
        <NavigationContainer theme={{
            dark: isDark,
            colors: {
                primary: colors.primary,
                background: colors.background,
                card: colors.card,
                text: colors.text,
                border: colors.border,
                notification: colors.secondary,
            },
            fonts: fonts || {
                regular: { fontFamily: 'System', fontWeight: '400' },
                medium: { fontFamily: 'System', fontWeight: '500' },
                bold: { fontFamily: 'System', fontWeight: '700' },
                heavy: { fontFamily: 'System', fontWeight: '900' },
            }
        }}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: isDark ? '#1a1a1a' : '#fff',
                        width: 240,
                    },
                    drawerActiveTintColor: colors.primary,
                    drawerInactiveTintColor: isDark ? '#aaa' : '#555',
                    drawerLabelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        drawerIcon: ({ color }) => <Icon name="cog" size={24} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        drawerIcon: ({ color }) => <Icon name="information" size={24} color={color} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
