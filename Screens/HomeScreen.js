import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import FixturesHome from '../Components/FixturesHome'; 
import StandingsHome from '../Components/StandingsHome';



export default function HomeScreen({ navigation }) {
  const data = [
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news2.9acdd30483fd196fc698.webp' },
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news3.b81351bc7d61008a00de.webp' },
    { imageUrl: 'https://panenka-two.vercel.app/static/media/news1.5a2b812b9a21c15b0887.webp' },
    // Add more items as needed
  ];

  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions(); // Get the width of the screen

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://v3.football.api-sports.io/standings?league=39&season=2023';
        const axiosConfig = {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '9f0f05cf1d2067d0c4d54561d75637fc',
          },
        };
        const response = await axios.get(apiUrl, axiosConfig);
        setStandingsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching standings data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.fantasyTitle}>
            {/* <Text style={styles.titleText}>Fantasy News</Text> */}
          </View>
          
          {/* Render Fantasy News */}
          <Carousel
            layout="default" // Choose the layout type
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth} // Width of your carousel
            itemWidth={screenWidth - 90} // Width of each item in the carousel
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
          />
          
          <View>
            {/* FixtureHome component */}
            <FixturesHome /> 
          </View>

          {/* Blank line */}
          <View style={{ marginVertical: 20 }} />

          {/* StandingsHome component */}
          <StandingsHome standingsData={standingsData} />

          {/* Fantasy News */}
          
        </ScrollView>
      )}
    </View>
  );
}
  

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontFamily: 'JockeyOne',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    fontFamily: 'JockeyOne',
  },
  gridTry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    fontFamily: 'JockeyOne',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  data: {
    flex: 1,
    textAlign: 'center',
  },
  team: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamName: {
    fontFamily: 'JockeyOne',
    textAlign: 'center',
  },
  headingRow: {
    backgroundColor: 'white',
  },
  headingText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lightGrayRow: {
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  fantasyTitle: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
});
