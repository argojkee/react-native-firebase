import { StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import "react-native-get-random-values";

import CreatePostCameraImage from "../../components/CreatePostCameraImage/CreatePostCameraImage";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";

const initialPhotoInfo = {
  photo: null,
  photoTitle: "",
  location: null,
  locationName: "",
  locationCountry: "",
  createdAt: null,
};

export const CreatePostScreen = ({ navigation }) => {
  const [photoInfo, setPhotoInfo] = useState(initialPhotoInfo);

  const changePhotoInfo = (photo) => {
    setPhotoInfo(photo);
  };

  return (
    <ScrollView style={styles.container}>
      <CreatePostCameraImage
        changePhotoInfo={changePhotoInfo}
        photoInfo={photoInfo}
      />
      <CreatePostForm
        changePhotoInfo={changePhotoInfo}
        photoInfo={photoInfo}
        initialPhotoInfo={initialPhotoInfo}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
});
