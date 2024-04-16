import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function ForumScreen () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:1337/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.postAuthor}>{item.author}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postInfo}>
        <Text style={styles.postUpvotes}>Upvotes: {item.upvotes}</Text>
        <Text style={styles.postComments}>Comments: {item.comments}</Text>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postUpvotes: {
    fontSize: 12,
  },
  postComments: {
    fontSize: 12,
  },
  postTime: {
    fontSize: 12,
  },
});
