import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import uploadToStorage from "../../functions/uploadToStorage";
import { useSelector } from "react-redux";

const CreatePostForm = ({
  photoInfo,
  changePhotoInfo,
  initialPhotoInfo,
  navigation,
}) => {
  const { userId, userName, userAvatar } = useSelector((state) => state.auth);

  const onTitleChange = (value) => {
    changePhotoInfo({ ...photoInfo, photoTitle: value });
  };
  const onLocationChange = (value) => {
    changePhotoInfo({ ...photoInfo, locationName: value });
  };

  const uploadPostToServer = async () => {
    try {
      const {
        photo,
        locationName,
        locationCountry,
        photoTitle,
        location,
        createdAt,
      } = photoInfo;
      const photoUri = await uploadToStorage(photo, userId, "postImage");

      await addDoc(collection(db, "posts"), {
        userId,
        authorName: userName,
        authorAvatar: userAvatar,
        location,
        photo: photoUri,
        locationName,
        photoTitle,
        locationCountry,
        likes: [],
        commentsCount: 0,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPublicisePress = async () => {
    await uploadPostToServer();
    navigation.navigate("DefaultPostsScreen");
    changePhotoInfo(initialPhotoInfo);
  };

  const { photo, photoTitle, locationName } = photoInfo;
  const isDisabledSubmit = !photo || !photoTitle || !locationName;

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onTitleChange}
          value={photoTitle}
          style={styles.input}
          placeholderTextColor={"#BDBDBD"}
          placeholder="Title..."
        ></TextInput>
      </View>
      <View style={styles.inputLocationContainer}>
        <TextInput
          onChangeText={onLocationChange}
          value={locationName}
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholderTextColor={"#BDBDBD"}
          placeholder="Location..."
        ></TextInput>
        <EvilIcons
          style={styles.locationImage}
          name="location"
          size={24}
          color="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.publiciseBtn,
          backgroundColor: isDisabledSubmit
            ? "rgba(255, 108, 0, 0.3)"
            : "rgba(255, 108, 0, 1)",
        }}
        disabled={isDisabledSubmit}
        onPress={onPublicisePress}
      >
        <Text style={styles.publiciseBtnText}>Publicise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 59,
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
  },

  locationImage: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{ translateY: -12 }],
  },
  publiciseBtn: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 48,
  },
  publiciseBtnText: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    fontSize: 16,
  },
});

export default CreatePostForm;
