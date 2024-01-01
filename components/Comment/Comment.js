import { format } from "date-fns";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";

const Comment = ({ item, index }) => {
  const width = Dimensions.get("window").width;

  return (
    <View
      key={item.id}
      style={[
        styles.commentContainer,
        index % 2 === 0 ? styles.evenCommentContainer : "",
      ]}
    >
      <View style={styles.commentAuthorContainer}>
        <Image
          source={{ uri: item.commentAuthorAvatar }}
          style={styles.commentAuthorAvatar}
        />
        <Text style={styles.commentAuthorName}>{item.commentAuthorName}</Text>
      </View>
      <View
        style={[
          styles.commentInfoContainer,
          index % 2 === 0 ? styles.evenCommentInfoContainer : "",
          { width: width - 82, wordWrap: "word-break" },
        ]}
      >
        <Text style={styles.comment}>{item.comment}</Text>
        <Text style={styles.commentDate}>
          {format(item.createdAt, "dd MMMM, yyyy | HH:mm")}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    columnGap: 16,
    marginBottom: 24,
  },

  evenCommentContainer: {
    flexDirection: "row-reverse",
  },

  commentInfoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
  },

  evenCommentInfoContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
  },
  commentAuthorContainer: {
    rowGap: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  commentAuthorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  commentAuthorName: {
    color: "tomato",
    fontFamily: "Roboto-Regular",
  },

  comment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },

  commentDate: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
  },
});
