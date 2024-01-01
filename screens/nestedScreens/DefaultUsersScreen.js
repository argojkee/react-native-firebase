import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

export const DefaultUsersScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (doc) =>
      setUsers(doc.docs.map((item) => ({ ...item.data(), id: item.id })))
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const onUserPress = (userId) => {
    if (userId === user.userId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserScreen", { userId });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: item.id === user.userId ? "tomato" : "gray",
              marginBottom: 5,
              padding: 15,
              borderRadius: 12,
            }}
            onPress={() => onUserPress(item.id)}
          >
            <View style={styles.userContainer}>
              <Image
                source={{ uri: item.userAvatar }}
                style={styles.userAvatar}
              />
              <View>
                <Text>{item.userName}</Text>
                <Text>{item.userEmail}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  userContainer: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
});
