import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

export const PostInfoContainer = ({ post, locationTitle, navigation }) => {
  const { userId } = useSelector((state) => state.auth);
  const onCommentsPress = (post) => {
    navigation.navigate("CommentsScreen", { post });
  };

  const onMapPress = (post) => {
    navigation.navigate("MapScreen", { post });
  };

  const onLikePress = async () => {
    if (post.likes.some((id) => id === userId)) {
      const newPostLikes = post.likes.filter((id) => id !== userId);
      await setDoc(
        doc(db, "posts", post.id),
        {
          likes: newPostLikes,
        },
        { merge: true }
      );
    } else {
      await setDoc(
        doc(db, "posts", post.id),
        {
          likes: [...post.likes, userId],
        },
        { merge: true }
      );
    }
  };

  const isLiked = post.likes.some((id) => id === userId);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.feedbackLocationContainer}>
        <View style={styles.feedbackContainer}>
          <TouchableOpacity
            onPress={() => onCommentsPress(post)}
            style={styles.commentsBtn}
          >
            <EvilIcons name="comment" size={24} color="#BDBDBD" />
            <Text style={styles.commentsCounter}>{post.commentsCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likesBtn} onPress={onLikePress}>
            <AntDesign
              name="like2"
              size={24}
              color={isLiked ? "orange" : "#BDBDBD"}
            />
          </TouchableOpacity>
          <Text style={styles.likesCounter}>{post.likes.length}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onMapPress(post)}
          style={styles.locationBtn}
        >
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <Text>{locationTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 8,
  },

  feedbackLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 24,
    marginTop: 8,
    alignItems: "center",
  },

  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  commentsBtn: {
    flexDirection: "row",
    columnGap: 6,
  },
  commentsCounter: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },

  likesBtn: {
    flexDirection: "row",
    columnGap: 6,
  },
  likesCounter: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationBtn: {
    flexDirection: "row",
    columnGap: 4,
    justifyContent: "center",
  },
  locationName: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
