import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Setting Screen</Text>
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
  