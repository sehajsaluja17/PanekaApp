//FixturesHome.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const FixturesHome = () => {
  const [fixturesData, setFixturesData] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const apiUrl = 'https://v3.football.api-sports.io/fixtures?season=2023&league=39&next=4';
        const axiosConfig = {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            //'x-rapidapi-key': 'ef407cca5a83183c13738297c6aedc4b', 
          },
        };
        const response = await axios.get(apiUrl, axiosConfig);
        setFixturesData(response.data);
      } catch (error) {
        console.error('Error fetching fixtures data:', error);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <View style={styles.fixturePage}>
      <Text style={[{fontSize:25}, styles.text]}>Fixtures</Text>
      <ScrollView style={styles.fixtureList}>
        {fixturesData && fixturesData.response ? (
          <View style={styles.fixtureCards}>
            {fixturesData.response.map((fixture) => (
              <View style={styles.fixtureCard} key={fixture.fixture.id}>
                <Text style={[styles.fixtureDate, styles.fontJockeyOne]}>{fixture.fixture.date}</Text>
                <View style={styles.fixtureTeams}>
                  <View style={styles.homeTeam}>
                    <Image source={{ uri: fixture.teams.home.logo }} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{fixture.teams.home.name}</Text>
                  </View>
                  <Text style={styles.vs}>vs</Text>
                  <View style={styles.awayTeam}>
                    <Image source={{ uri: fixture.teams.away.logo }} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{fixture.teams.away.name}</Text>
                  </View>
                </View>
                {fixture.status && (
                  <Text style={[styles.fixtureStatus, styles.fontJockeyOne]}>{fixture.status.long}</Text>
                )}
                <View style={styles.fixtureScore}>
                  <Text style={[styles.halfTimeScore, styles.fontJockeyOne]}>Half-Time Score: {fixture.score.halftime.home} - {fixture.score.halftime.away}</Text>
                  <Text style={[styles.fullTimeScore, styles.fontJockeyOne]}>Full-Time Score: {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</Text>
                </View>
                <Text style={[styles.fixtureVenue, styles.fontJockeyOne]}>Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.loadingText, styles.fontJockeyOne]}>Loading fixtures...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontFamily: 'JockeyOne',
    textAlign: 'center'
  },
  fixturePage: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixtureTitle: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  fixtureList: {
    flex: 1,
  },
  fixtureCards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
  },
  fixtureCard: {
    backgroundColor: 'antiquewhite',
    borderRadius: 8,
    padding: 20,
    maxWidth: 350, // Increased width
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fixtureDate: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  fixtureTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  homeTeam: {
    alignItems: 'center',
    marginRight: 10,
  },
  teamLogo: {
    width: 80, // Increased width
    height: 80, // Increased height
    marginBottom: 5,
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'JockeyOne',
  },
  vs: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  awayTeam: {
    alignItems: 'center',
    marginLeft: 10,
  },
  fixtureStatus: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  fixtureScore: {
    marginBottom: 10,
  },
  halfTimeScore: {
    marginBottom: 5,
    textAlign: 'center',
  },
  fullTimeScore: {
    marginBottom: 5,
    textAlign: 'center',
  },
  fixtureVenue: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  fontJockeyOne: {
    fontFamily: 'JockeyOne',
  },
});

export default FixturesHome;
