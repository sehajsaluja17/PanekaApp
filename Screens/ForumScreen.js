import { StyleSheet, Text, View } from 'react-native';

export default function ForumScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Forum Screen</Text>
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
  