import { useSelector } from "react-redux";
import { PostInfoContainer } from "../PostInfoContainer/PostInfoContainer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PostContainer = ({ item, navigation }) => {
  const { userId } = useSelector((state) => state.auth);

  return (
    <View style={styles.photoContainer}>
      <View style={styles.photoTitleContainer}>
        <Text style={styles.photoTitle}>{item.photoTitle}</Text>
      </View>

      <View style={styles.authorContainer}>
        <Image
          style={styles.authorAvatar}
          source={{ uri: item.authorAvatar }}
        />
        <Text style={styles.author}>{item.authorName}</Text>
      </View>

      <Image style={styles.photo} source={{ uri: item.photo }} />
      <PostInfoContainer
        navigation={navigation}
        post={item}
        locationTitle={item.locationName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: "100%",
    height: 300,
    marginBottom: 32,
  },
  photoTitleContainer: {
    width: "100%",
    alignItems: "center",
  },
  photoTitle: {
    fontSize: 20,
    color: "tomato",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
  },

  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginBottom: 5,
  },

  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  author: {
    color: "#20b2aa",
  },

  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});

export default PostContainer;
