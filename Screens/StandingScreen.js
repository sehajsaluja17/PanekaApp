import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const StandingScreen = () => {
  const [standingsData, setStandingsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://v3.football.api-sports.io/standings?league=39&season=2023';

      const axiosConfig = {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': 'c47b12e1a80f487a594dc2e2e561482f',
        },
      };

      try {
        const response = await axios.get(apiUrl, axiosConfig);
        setStandingsData(response.data);
      } catch (error) {
        console.error('Error fetching standings data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Pos</Text>
          <Text style={styles.header}>Team</Text>
          <Text style={styles.header}>Matches Played</Text>
          <Text style={styles.header}>Won</Text>
          <Text style={styles.header}>Drawn</Text>
          <Text style={styles.header}>Lost</Text>
          <Text style={styles.header}>GF</Text>
          <Text style={styles.header}>GA</Text>
          <Text style={styles.header}>GD</Text>
          <Text style={styles.header}>Points</Text>
          <Text style={styles.header}>Form</Text>
        </View>
        {/* Table Data */}
        <ScrollView style={{ flex: 1 }}>
          {standingsData && standingsData.response && standingsData.response[0] && standingsData.response[0].league && standingsData.response[0].league.standings ? (
            standingsData.response[0].league.standings[0].map((team, index) => (
              <View key={team.team.id} style={[styles.row, index % 2 === 0 ? styles.lightGrayRow : {}]}>
                <Text style={styles.column}>{team.rank}</Text>
                <View style={styles.teamColumn}>
                  <Image
                    source={{ uri: team.team.logo }}
                    style={styles.logo}
                  />
                  <Text style={styles.teamName}>{team.team.name}</Text>
                </View>
                <Text style={styles.column}>{team.all.played}</Text>
                <Text style={styles.column}>{team.all.win}</Text>
                <Text style={styles.column}>{team.all.draw}</Text>
                <Text style={styles.column}>{team.all.lose}</Text>
                <Text style={styles.column}>{team.all.goals.for}</Text>
                <Text style={styles.column}>{team.all.goals.against}</Text>
                <Text style={styles.column}>{team.goalsDiff}</Text>
                <Text style={styles.column}>{team.points}</Text>
                <Text style={styles.column}>{team.form}</Text>
              </View>
            ))
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF0000" />
            </View>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  headerRow: {
    fontFamily:'JockeyOne',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
  },
  header: {
    fontFamily:'JockeyOne',
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  row: {
    fontFamily:'JockeyOne',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'JockeyOne',
  },
  teamColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'JockeyOne',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightGrayRow: {
    backgroundColor: '#f9f9f9',
  },
});

export default StandingScreen;