import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ProfileScreen({ navigation }) {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [user, setUsername] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignIn = async () => {
    // Validation for special characters in first name and last name
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(fname)) {
      setError('First name can only contain letters.');
      return;
    }
  
    if (!nameRegex.test(lname)) {
      setError('Last name can only contain letters.');
      return;
    }
  
    // Validation for special characters in username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(user)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.228.160:1337/register', { fname, lname, user, pwd });
      console.log(response.data);
      // Assuming the response contains data on success
      if (response && response.data) {
        navigation.navigate('Login'); // Redirect to the Login screen after successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
      // Reset the input field values after successful registration
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Information</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={handleFirstNameChange}
        value={fname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={handleLastNameChange}
        value={lname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={pwd}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.loginTextContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
  },
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginLink: {
    marginLeft: 5,
    color: '#E73725',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});