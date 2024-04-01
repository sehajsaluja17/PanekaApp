import { StyleSheet, Text, View } from 'react-native';

export default function FixtureScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Fixture Screen</Text>
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
    text:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:16,
    },
  });
  