import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [circleXPosition, setCircleXPosition] = useState(new Animated.Value(0));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Move the circle to the appropriate position based on the dark mode state
    Animated.timing(circleXPosition, {
      toValue: isDarkMode ? 0 : 40,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Text style={[styles.text, isDarkMode && styles.whiteText]}>
        {isDarkMode ? 'Dark Mode: ON' : 'Dark Mode: OFF'}
      </Text>
      <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
        <View style={styles.track}></View>
        <Animated.View
          style={[styles.circle, { transform: [{ translateX: circleXPosition }] }]}
        ></Animated.View>
      </TouchableOpacity>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    darkMode: {
      backgroundColor: '#000',
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
    },
    whiteText: {
      color: '#fff',
    },
    toggleButton: {
      flexDirection: 'row',
      width: 80,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ddd',
      position: 'relative',
    },
    track: {
      flex: 1,
      backgroundColor: '#666',
      borderRadius: 20,
    },
    circle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 2,
      left: 2,
    },
  });
  