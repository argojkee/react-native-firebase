import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc, collection, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AddCommentContainer = ({ postId }) => {
  const { userId, userName, userAvatar } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const onCommentChange = (v) => {
    setComment(v);
  };

  const createComments = async () => {
    try {
      const dataComment = {
        commentAuthorName: userName,
        commentAuthorId: userId,
        commentAuthorAvatar: userAvatar,
        comment,
        createdAt: Date.now(),
      };

      const commentsRef = doc(collection(db, "posts"), postId);
      const postRef = await getDoc(doc(db, "posts", postId));
      const { commentsCount } = postRef.data();

      await addDoc(collection(commentsRef, "comments"), dataComment);
      await setDoc(
        doc(db, "posts", postId),
        {
          commentsCount: commentsCount + 1,
        },
        { merge: true }
      );
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        value={comment}
        onChangeText={onCommentChange}
        style={styles.textArea}
        multiline={true}
      ></TextInput>
      <View style={styles.addCommentBtnContainer}>
        <TouchableOpacity
          disabled={!comment}
          style={styles.addCommentBtn}
          onPress={createComments}
        >
          <Text style={styles.addCommentBtnText}>Add comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    width: "100%",
    borderColor: "#20b2aa",
    borderWidth: 1,
    textAlignVertical: "top",
    borderRadius: 12,
    padding: 10,
  },

  addCommentBtnContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 10,
  },

  addCommentBtn: {
    width: 200,
    borderColor: "#20b2aa",
    borderRadius: 16,
    borderWidth: 2,
    height: 40,
    justifyContent: "center",
  },
  addCommentBtnText: {
    textAlign: "center",
    color: "tomato",
    fontFamily: "Roboto-Regular",
  },
});

export default AddCommentContainer;
