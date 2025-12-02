import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [unlockedLevels, setUnlockedLevels] = useState([1]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const loadGameData = async () => {
            try {
                const savedLevel = await AsyncStorage.getItem('currentLevel');
                const savedUnlocked = await AsyncStorage.getItem('unlockedLevels');
                const savedScore = await AsyncStorage.getItem('score');

                if (savedLevel) setCurrentLevel(parseInt(savedLevel, 10));
                if (savedUnlocked) setUnlockedLevels(JSON.parse(savedUnlocked));
                if (savedScore) setScore(parseInt(savedScore, 10));
            } catch (e) {
                console.error('Failed to load game data', e);
            }
        };
        loadGameData();
    }, []);

    const completeLevel = async (levelId) => {
        if (!unlockedLevels.includes(levelId + 1)) {
            const newUnlocked = [...unlockedLevels, levelId + 1];
            setUnlockedLevels(newUnlocked);
            await AsyncStorage.setItem('unlockedLevels', JSON.stringify(newUnlocked));
        }

        // Update current level if we just completed the highest unlocked level
        if (levelId === currentLevel) {
            const nextLevel = levelId + 1;
            setCurrentLevel(nextLevel);
            await AsyncStorage.setItem('currentLevel', nextLevel.toString());
        }

        const newScore = score + 10; // 10 points per level
        setScore(newScore);
        await AsyncStorage.setItem('score', newScore.toString());
    };

    const gameData = {
        currentLevel,
        unlockedLevels,
        score,
        completeLevel,
        setCurrentLevel, // Allow manual navigation if needed
    };

    return (
        <GameContext.Provider value={gameData}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
