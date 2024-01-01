import { StyleSheet, View, Text, Image } from "react-native";

const PostAuthorContainer = ({
  authorName,
  authorAvatar,
  postPhoto,
  photoTitle,
}) => {
  return (
    <View style={styles.photoContainer}>
      <View style={styles.postAuthorContainer}>
        <Text style={styles.author}>Author : {authorName}</Text>
        <Image style={styles.postAuthorAvatar} source={{ uri: authorAvatar }} />
      </View>
      <Text style={styles.photoTitle}>{photoTitle}</Text>
      <Image style={styles.photo} source={{ uri: postPhoto }} />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 20,
  },
  postAuthorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postAuthorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  photoTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    textTransform: "capitalize",
    color: "tomato",
    fontFamily: "Roboto-Regular",
  },

  photo: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },

  author: {
    color: "#20b2aa",
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Roboto-Regular",
  },
});
export default PostAuthorContainer;
