import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInScreen({ navigation }) {
  const [user, setUsername] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validation for special characters in username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(user)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.228.160:1337/login', { user, pwd });
      console.log(response.data.accessToken);
      await AsyncStorage.setItem('accessToken',response.data.accessToken);
      // Handle successful login, navigate to home page
      navigation.navigate('Forum');
    } catch (error) {
      console.error('Login failed:', error.message);
      if (error.response && error.response.data) {
        Alert.alert('Invalid username or password');
      } else {
        Alert.alert('Error connecting to the server. Please try again later.');
      }
    }
  };

  const handleLoginClick = () => {
    handleSubmit(); // Call handleSubmit function
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={pwd}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'JockeyOne',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#E73725',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
