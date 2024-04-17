// StandingsHome.js
import React from 'react';
import { View, Text, StyleSheet,Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StandingsHome = ({ standingsData }) => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.tableContainer}>
      <Text style={[{fontSize: 25},styles.tableTitle, styles.text]}>Standings</Text>          

      {/* Table Data */}
      {standingsData && standingsData.response && standingsData.response[0] && standingsData.response[0].league && standingsData.response[0].league.standings ? (
      <View style={styles.container}>
        {/* Table Headings */}
        <View style={[styles.row, styles.headingRow]}>
          <Text style={[styles.header, styles.headingText, { flex: 2 }]}>Pos</Text>
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
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Standing')}
    >
      <Text style={styles.buttonText}>View full table</Text>
    </TouchableOpacity>
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
    fontFamily: 'JockeyOne',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lightGrayRow: {
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontFamily: 'JockeyOne',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E73725',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  buttonText:{
    color: '#fff',
    fontFamily: 'JockeyOne',
    textAlign: 'center',
    fontSize: 25,
  }
});

export default StandingsHome;
