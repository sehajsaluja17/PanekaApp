import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';

const { width } = Dimensions.get('window');
const logoSize = 100 // Adjust the logo size as needed

const data = [
  { id: '1', name: 'Arsenal', logo: require('../assets/arsenal_logo.png'), url: 'https://www.arsenal.com/' },
  { id: '2', name: 'Aston Villa', logo: require('../assets/astonvilla_logo.png'), url: 'https://www.avfc.co.uk/' },
  { id: '3', name: 'Bournemouth', logo: require('../assets/bournemouth_logo.png'), url: 'https://www.afcb.co.uk/' },
  { id: '4', name: 'Brentford', logo: require('../assets/brentford_logo.png'), url: 'https://www.brentfordfc.com/en' },
  { id: '5', name: 'Brighton & Hove Albion', logo: require('../assets/brighton_logo.png'), url: 'https://www.brightonandhovealbion.com/' },
  { id: '6', name: 'Burnley', logo: require('../assets/burnley_logo.png'), url: 'https://www.burnleyfootballclub.com/' },
  { id: '7', name: 'Chelsea', logo: require('../assets/chelsea_logo.png'), url: 'https://www.chelseafc.com/en' },
  { id: '8', name: 'Crystal Palace', logo: require('../assets/crystalpalace_logo.png'), url: 'https://www.cpfc.co.uk/' },
  { id: '9', name: 'Everton', logo: require('../assets/everton_logo.png'), url: 'https://www.evertonfc.com/' },
  { id: '10', name: 'Fulham', logo: require('../assets/fulham_logo.png'), url: 'https://www.fulhamfc.com/' },
  { id: '11', name: 'Liverpool', logo: require('../assets/liverpool_logo.png'), url: 'https://www.liverpoolfc.com/' },
  { id: '12', name: 'Luton Town', logo: require('../assets/lutontown_logo.png'), url: 'https://www.lutontown.co.uk/' },
  { id: '13', name: 'Manchester City', logo: require('../assets/mcity_logo.png'), url: 'https://www.mancity.com/' },
  { id: '14', name: 'Manchester United', logo: require('../assets/mutd_logo.png'), url: 'https://www.manutd.com/' },
  { id: '15', name: 'Newcastle United', logo: require('../assets/newcastle_logo.png'), url: 'https://www.nufc.co.uk/' },
  { id: '16', name: 'Nottingham Forest', logo: require('../assets/ntgf_logo.png'), url: 'https://www.nottinghamforest.co.uk/' },
  { id: '17', name: 'Sheffield United', logo: require('../assets/sutd_logo.png'), url: 'https://www.sufc.co.uk/' },
  { id: '18', name: 'Tottenham Hotspur', logo: require('../assets/spurs_logo.png'), url: 'https://www.tottenhamhotspur.com/' },
  { id: '19', name: 'West Ham United', logo: require('../assets/whm_logo.png'), url: 'https://www.whufc.com/' },
  { id: '20', name: 'Wolverhampton Wanderers', logo: require('../assets/wolves_logo.png'), url: 'https://www.wolves.co.uk/' },
  // Add more items as needed
];

const ClubScreen = ({ navigation }) => {
  const handlePress = (clubUrl) => {
    Linking.openURL(clubUrl); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.url)}>
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#fafafa',
    width: width - 40,
    maxWidth: 400,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  logo: {
    width: logoSize,
    height: logoSize,
    marginRight: 20,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    fontSize: 30,
    fontFamily: 'JockeyOne',
    textAlign: 'center'
  },
});

export default ClubScreen;
