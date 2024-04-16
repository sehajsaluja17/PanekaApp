import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

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
            'x-rapidapi-key': '4f0e9e0980cb6569267d47cb121f80e9',
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
          
          {/* Blank line */}
          <View style={{ marginVertical: 20 }} />
          <View style={styles.tableContainer}>
            <Text style={[styles.tableTitle, styles.text]}>STANDINGS</Text>          

            {/* Table Data */}
            {standingsData && standingsData.response && standingsData.response[0] && standingsData.response[0].league && standingsData.response[0].league.standings ? (
            <View style={styles.container}>
              {/* Table Headings */}
              <View style={[styles.row, styles.headingRow]}>
                <Text style={[styles.header, styles.headingText, { flex: 1 }]}>Pos</Text>
                <Text style={[styles.header, styles.headingText, { flex: 3 }]}>Team</Text>
                <Text style={[styles.header, styles.headingText, { flex: 2 }]}>Matches Played</Text>
                <Text style={[styles.header, styles.headingText, { flex: 2 }]}>Points</Text>
              </View>
              
              {/* Table Data */}
              {standingsData.response[0].league.standings[0].map((team, index) => (
                team.rank < 11 && (
                  <View key={team.team.id} style={[styles.row, index % 2 === 0 ? styles.lightGrayRow : {}]}>
                    <Text style={[styles.data, { flex: 1, textAlign: 'center' }, styles.text]}>{team.rank}</Text>
                    <View style={[styles.team, { flex: 3, alignItems: 'center' }, styles.text]}>
                      <Image source={{ uri: team.team.logo }} style={styles.logo} />
                      <Text style={[styles.data, styles.text]}>{team.team.name}</Text>
                    </View>
                    <Text style={[styles.data, { flex: 2, textAlign: 'center' }, styles.text]}>{team.all.played}</Text>
                    <Text style={[styles.data, { flex: 2, textAlign: 'center' }, styles.text]}>{team.points}</Text>
                  </View>
                )
              ))}
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading data...</Text>
          )}

            <Button
              title="View full table"
              color="black"
              onPress={() => alert('View full table button pressed')}
            />
          </View>
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
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    fontFamily: 'JockeyOne',
    fontSize: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRow: {
    backgroundColor: 'white',
  },
  headingText: {
    fontFamily: 'JockeyOne',
    textAlign: 'center',
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
