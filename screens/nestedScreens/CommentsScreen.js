import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";

import Comment from "../../components/Comment/Comment";
import AddCommentContainer from "../../components/AddCommentContainer/AddCommentContainer";
import PostAuthorContainer from "../../components/PostAuthorContainer.js/PostAuthorContainer";

export default CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState(null);
  const { post } = route.params;

  useEffect(() => {
    const commentsRef = collection(doc(db, "posts", post.id), "comments");
    const unsubscribe = onSnapshot(commentsRef, (doc) =>
      setComments(
        doc.docs
          .map((comment) => ({ ...comment.data(), id: comment.id }))
          .sort((a, b) => b.createdAt - a.createdAt)
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <PostAuthorContainer
        photoTitle={post.photoTitle}
        postPhoto={post.photo}
        authorName={post.authorName}
        authorAvatar={post.authorAvatar}
      />
      {comments && (
        <View style={styles.commentsList}>
          {comments.map((item, index) => (
            <Comment item={item} index={index} key={item.id} />
          ))}
        </View>
      )}
      <AddCommentContainer postId={post.id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
});
