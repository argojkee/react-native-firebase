import { View, Text, Image, StyleSheet } from "react-native";
import { PostInfoContainer } from "../PostInfoContainer/PostInfoContainer";

const ProfilePost = ({ item, navigation }) => {
  return (
    <View style={styles.postContainer}>
      <Image style={styles.photo} source={{ uri: item.photo }} />
      <Text style={styles.photoTitle}>{item.photoTitle}</Text>
      <PostInfoContainer
        post={item}
        locationTitle={item.locationCountry}
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    paddingTop: 10,
  },

  photoTitle: {
    marginTop: 8,
    textTransform: "capitalize",
    color: "tomato",
    fontSize: 20,
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
});

export default ProfilePost;
