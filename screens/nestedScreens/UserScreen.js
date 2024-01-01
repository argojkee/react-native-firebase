import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  getCountFromServer,
  doc,
  getDoc,
} from "firebase/firestore";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";

export const UserScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", route.params.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        setUser({ ...user });
      } else {
        console.log("No such document!");
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const userId = route.params.userId;
    const q = query(collection(db, "posts"), where("userId", "==", userId));

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
    <ImageBackground
      style={styles.bgImage}
      source={require("../../assets/images/registration-login-bg.jpg")}
    >
      <View style={styles.container}>
        {user && (
          <ProfilePosts user={user} posts={posts} navigation={navigation} />
        )}
      </View>
    </ImageBackground>
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
