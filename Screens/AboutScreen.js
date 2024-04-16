import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function AboutScreen({ navigation }) {
    return (
      <ScrollView>
      <View style={styles.aboutPage}>
      <View style={styles.members}>
        <Text style={styles.titleText}>Our Team</Text>
        <Text style={styles.normal}>Saahil Shaikh</Text>
        <Text style={styles.normal}>Sachit Desai</Text>
        <Text style={styles.normal}>Sanjana Sharma</Text>
        <Text style={styles.normal}>Sehaj Saluja</Text>
      </View>
      <View style={styles.firstPara}>
        <Text style={styles.titleText}>How this site came to be</Text>
        <Text style={styles.normal}>
          We're a team of four programmers who built this application as a college project using React Native. 
          Our common interest in football helped us conceptualize an application that could act as a one-stop shop for everything football.
        </Text>
      </View>
      <View>
        <Text style={styles.titleText}>How we plan to expand</Text>
        <Text style={styles.normal}>
          Since our reach is restricted to the fans of the English Premier League, our first goal is to cover football leagues from across the globe.
          We plan to expand our chat room to a full fledged forum where users can create posts and discuss all things football. We also wish to add
          a live news feed so users can read the latest news directly on our app.
        </Text>
      </View>
    </View>
    </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    aboutPage: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    titleText: {
      fontSize: 35,
      fontFamily: 'JockeyOne',
      color:'#E73725'
    },
    members: {
      marginBottom: 20,
      fontFamily: 'JockeyOne',
    },
    firstPara: {
      marginBottom: 20,
    },
    normal:{
      fontFamily:'JockeyOne',
      fontSize:20,
    }
  });
  