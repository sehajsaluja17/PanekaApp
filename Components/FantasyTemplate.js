// FantasyTemplate.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const FantasyTemplate = ({ data }) => {
  const { desc, image, link } = data;

  return (
    <TouchableOpacity onPress={() => Linking.openURL(link)}>
      <View style={styles.newsBox}>
        <Image source={image} style={styles.image} />
        <View style={styles.description}>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsBox: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  description: {
    marginTop: 10,
  },
  desc: {
    fontSize: 16,
    color: '#333',
  },
});

export default FantasyTemplate;
