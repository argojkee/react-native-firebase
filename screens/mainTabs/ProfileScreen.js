import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  getCountFromServer,
} from "firebase/firestore";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.userId)
    );

    const unsubscribe = onSnapshot(q, async (doc) => {
      const promises = doc.docs.map(async (item) => {
        const coll = collection(db, `posts/${item.id}/comments`);
        const snapshot = await getCountFromServer(coll);

        return {
          ...item.data(),
          id: item.id,
          commentsCount: snapshot.data().count,
        };
      });
      const result = await Promise.allSettled(promises);
      setPosts(result.map((resp) => resp.value));
    });

    return () => {
      unsubscribe();
    };
  }, [posts]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/registration-login-bg.jpg")}
      >
        <ProfilePosts posts={posts} user={user} navigation={navigation} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
