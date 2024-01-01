import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const avatarDefault = require("../../assets/images/avatar.jpg");

export default UserAvatarContainer = ({
  photo,
  changeUserAvatar,
  onDeletePhotoPress,
  isOwnerPage,
}) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const { isAuth, userId } = useSelector((state) => state.auth);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === "granted");
    })();
  }, []);

  const addPhotoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    changeUserAvatar(result.assets[0].uri);
  };

  return (
    <View style={{ ...styles.userAvatarContainer, left: width / 2 }}>
      <Image
        style={styles.userPhoto}
        source={photo ? { uri: photo } : avatarDefault}
      />

      {(!isAuth || isOwnerPage) && (
        <TouchableOpacity
          style={styles.addPhotoBtn}
          onPress={photo ? onDeletePhotoPress : addPhotoPress}
        >
          {photo ? (
            <AntDesign name="closecircleo" size={24} color="#E8E8E8" />
          ) : (
            <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userAvatarContainer: {
    position: "absolute",
    top: 0,
    transform: [{ translateX: -60 }, { translateY: -60 }],
    borderRadius: 16,
  },

  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  addPhotoBtn: {
    position: "absolute",
    bottom: 12,
    right: -12,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
});
