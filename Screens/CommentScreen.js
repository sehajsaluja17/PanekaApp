import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen = ({ route }) => {
  const { postId } = route.params; 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };

        // Fetch the post details
        const postResponse = await axios.get(`https://paneka-backend.onrender.com/posts/${postId}`, config);
        setPost(postResponse.data.post);

        // Fetch the comments for the post
        const commentsResponse = await axios.get(`https://paneka-backend.onrender.com/comments/post/${postId}`, config);
        setComments(commentsResponse.data.comments);
    
        // Clear the comment input field
        setNewComment('');
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      // Send a request to add the new comment to the post
      await axios.post(`https://paneka-backend.onrender.com/comments/post/${postId}`, { commentText: newComment }, config);

      // Refetch the comments to update the UI
      const commentsResponse = await axios.get(`https://paneka-backend.onrender.com/comments/post/${postId}`, config);
      setComments(commentsResponse.data.comments);

      // Clear the comment input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        {post && (
          <View style={styles.postDetails}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            {post.author && <Text style={styles.postAuthor}>Author: {post.author.username}</Text>}
            {/* Display other post details here */}
          </View>
        )}

        <Text style={styles.commentsTitle}>Comments</Text>
        <View style={styles.commentsList}>
          {Array.isArray(comments) && comments.map(comment => (
            <TouchableOpacity key={comment._id} style={styles.comment}>
              <Text style={styles.commentText}>{comment.comment}</Text>
              {/* Display other comment details here */}
            </TouchableOpacity>
          ))}
        </View>

        {/* Textbox for adding a new comment */}
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          multiline
        />
        <TouchableOpacity style={styles.addCommentBtn} onPress={handleCommentSubmit}>
          <Text style={styles.addCommentBtnText}>Add Comment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff', // Background color of the safe area view
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'stretch', // Ensure elements stretch to fill the screen width
  },
  postDetails: {
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'JockeyOne', // Added font family
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'JockeyOne', // Added font family
  },
  postAuthor: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'JockeyOne', // Added font family
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'JockeyOne', // Added font family
  },
  commentsList: {
    marginBottom: 20,
  },
  comment: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'stretch', // Ensure text stretches to fill the width
  },
  commentText: {
    fontSize: 16,
    fontFamily: 'JockeyOne', // Added font family
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'JockeyOne', // Added font family
    alignItems: 'stretch', // Ensure input stretches to fill the width
  },
  addCommentBtn: {
    backgroundColor: '#E73725', // Changed background color to match app theme
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  addCommentBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'JockeyOne', // Added font family
  },
});

export default CommentScreen;
