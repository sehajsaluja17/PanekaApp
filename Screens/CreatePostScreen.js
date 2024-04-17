import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      await axios.post('https://paneka-backend.onrender.com/posts', {
        title,
        description, 
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Reset form fields
      setTitle('');
      setDescription('');
      navigation.navigate('Forum');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'JockeyOne', // Added font family
    textAlign: 'center', // Center align the text
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'JockeyOne', // Added font family
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'JockeyOne', // Added font family
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'JockeyOne', // Added font family
  },
  submitButton: {
    backgroundColor: '#E73725', // Changed background color to match app theme
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'JockeyOne', // Added font family
  },
});

export default CreatePostScreen;
