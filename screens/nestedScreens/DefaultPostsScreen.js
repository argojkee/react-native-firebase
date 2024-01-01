import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import PostContainer from "../../components/PostContainer/PostContainer";

export default DefaultPostsScreen = ({ navigation }) => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (doc) =>
      setPostsList(
        doc.docs
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((post) => ({ ...post.data(), id: post.id }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsList}
        data={postsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostContainer item={item} navigation={navigation} />
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    paddingVertical: 32,
  },

  postsList: {
    paddingHorizontal: 10,
    marginTop: 10,
    height: "100%",
  },
});
