import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export const FixtureScreen = () => {
  const [fixturesData, setFixturesData] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const apiUrl = 'https://v3.football.api-sports.io/fixtures?season=2023&league=39';
        const axiosConfig = {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': 'db0b91f48bacba4e79c60b58899d4799',
          },
        };
        const response = await axios.get(apiUrl, axiosConfig);
        setFixturesData(response.data);
      } catch (error) {
        console.error('Error fetching fixtures data:', error);
      }
    };

    fetchdata();
  }, []);

  const filteredFixtures = selectedTeam
    ? fixturesData?.response?.filter(
        (fixture) =>
          fixture.teams.home.name === selectedTeam || fixture.teams.away.name === selectedTeam
      )
    : fixturesData?.response;

  return (
    <View style={styles.container}>
      <View style={styles.teamFilter}>
        <Text style={styles.filterText}>Filter by Team:</Text>
        <Picker
          selectedValue={selectedTeam}
          onValueChange={(value) => setSelectedTeam(value === 'All' ? null : value)}
          style={styles.picker}
        >
          <Picker.Item label="All Teams" value="All" />
          {fixturesData &&
            fixturesData.response &&
            [...new Set(fixturesData.response.map((fixture) => fixture.teams.home.name))].map(
              (teamName) => (
                <Picker.Item key={teamName} label={teamName} value={teamName} />
              )
            )}
        </Picker>
      </View>
      <ScrollView>
        {filteredFixtures ? (
          filteredFixtures.map((fixture) => (
            <View key={fixture.fixture.id} style={styles.fixtureCard}>
              <Text style={styles.fixtureDate}>{fixture.fixture.date}</Text>
              <View style={styles.fixtureTeams}>
                <View style={styles.team}>
                  <Image source={{ uri: fixture.teams.home.logo }} style={styles.logo} />
                  <Text style={styles.teamName}>{fixture.teams.home.name}</Text>
                </View>
                <Text style={styles.vs}>vs</Text>
                <View style={styles.team}>
                  <Image source={{ uri: fixture.teams.away.logo }} style={styles.logo} />
                  <Text style={styles.teamName}>{fixture.teams.away.name}</Text>
                </View>
              </View>
              {fixture.status && (
                <Text style={styles.fixtureStatus}>{fixture.status.long}</Text>
              )}
              <View style={styles.fixtureScore}>
                <Text style={styles.scoreText}>Half-Time Score: {fixture.score.halftime.home} - {fixture.score.halftime.away}</Text>
                <Text style={styles.scoreText}>Full-Time Score: {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</Text>
              </View>
              <Text style={styles.fixtureVenue}>
                Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.loadingMessage}>Loading fixtures...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed background to white
    padding: 10,
  },
  fixtureTitle: {
    marginTop: 50,
    textAlign: 'left',
    fontSize: 30,
    fontFamily: 'JockeyOne', // Changed font family
    color: 'black', // Changed color to black
  },
  teamFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    color: 'black', // Changed color to black
    marginRight: 10,
    fontFamily: 'JockeyOne', // Changed font family
  },
  picker: {
    flex: 1,
    color: 'black', // Changed color to black
    fontFamily: 'JockeyOne', // Changed font family
  },
  fixtureCard: {
    backgroundColor: 'antiquewhite',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fixtureDate: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black', // Changed color to black
    textAlign: 'center',
    fontFamily: 'JockeyOne', // Changed font family
  },
  fixtureTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    alignItems: 'center',
  },
  vs: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black', // Changed color to black
    fontFamily: 'JockeyOne', // Changed font family
  },
  fixtureStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'JockeyOne', // Changed font family
  },
  fixtureScore: {
    marginTop: 10,
  },
  scoreText: {
    color: 'black', // Changed color to black
    fontFamily: 'JockeyOne', // Changed font family
  },
  fixtureVenue: {
    marginTop: 10,
    fontSize: 14,
    color: 'black', // Changed color to black
    textAlign: 'center',
    fontFamily: 'JockeyOne', // Changed font family
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black', // Changed color to black
    marginTop: 20,
    fontFamily: 'JockeyOne', // Changed font family
  },
  teamName: {
    color: 'black', // Changed color to black
    fontFamily: 'JockeyOne', // Changed font family
  },
});

export default FixtureScreen;
