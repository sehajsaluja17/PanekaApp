// FantasyTemplate.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const FantasyTemplate = ({ data }) => {
  const { desc, image, link } = data;

  const handlePress = () => {
    Linking.openURL(link); // Open the link in the browser when pressed
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.description}>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  description: {
    alignItems: 'center',
  },
  desc: {
    fontFamily:'JockeyOne',
    textAlign: 'center',
    color: 'black',
  },
});

export default FantasyTemplate;