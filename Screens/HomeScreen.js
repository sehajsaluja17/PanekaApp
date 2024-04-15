import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function HomeScreen({ navigation }) {
  const data = [
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news2.9acdd30483fd196fc698.webp' },
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news3.b81351bc7d61008a00de.webp' },
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news1.5a2b812b9a21c15b0887.webp' },
    // Add more items as needed
  ];

  const { width: screenWidth, height: screenHeight } = useWindowDimensions(); // Get the width of the screen

  const renderItem = ({ item, index }) => {

    const handlePress = () => {
      // Navigate to another screen when the carousel item is pressed
      navigation.navigate('Profile');
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.item}>
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.image, { width: screenWidth - 90, height: screenHeight * 0.2 }]} // Adjust the width dynamically
          resizeMode="contain" // Ensure the whole image fits within the container
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default" // Choose the layout type
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth} // Width of your carousel
        itemWidth={screenWidth-90} // Width of each item in the carousel
        autoplay={true}
        autoplayInterval={5000}
        loop={true}
      />
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      fontFamily:'JockeyOne',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#fff',
      borderRadius: 15,
      borderColor: '#ccc',
      borderWidth: 1,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 15,
      alignContent: 'center',
      justifyContent: 'center'
    },
  });