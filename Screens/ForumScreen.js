import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForumScreen = () => {
  const navigation = useNavigation(); 

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await axios.get('https://paneka-backend.onrender.com/posts', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      // You can navigate to the login screen or any other desired screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreatePost = () => {
    // Navigate to the screen where you create a new post
    navigation.navigate('CreatePostScreen');
  };

  const handlePostPress = (postId) => {
    // Navigate to CommentScreen with the post ID as a parameter
    navigation.navigate('CommentScreen', { postId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item._id)}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>Author: {item.author.username}</Text>
        <Text style={styles.postContent}>Upvotes: {item.upvotes.length}</Text>
        <Text style={styles.postContent}>Time: {new Date(item.time).toLocaleString()}</Text>
        {/* Render other post details */}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Create Post" onPress={handleCreatePost} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  postAuthor: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  postTitle:{
    fontSize: 16,
    fontWeight:'bold'
  }
  // Add styles for other post details
});

export default ForumScreen;
