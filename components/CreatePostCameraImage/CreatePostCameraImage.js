import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CreatePostCameraImage = ({ changePhotoInfo, photoInfo }) => {
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasCameraPermission, setHasCameraPermissions] = useState(null);

  useEffect(() => {
    (async () => {
      if (!hasCameraPermission) {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermissions(cameraStatus.status === "granted");
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        const { coords } = await Location.getCurrentPositionAsync();
        const arrayLocation = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        let currentNameLocation;
        if (arrayLocation && arrayLocation.length > 0) {
          currentNameLocation = `${arrayLocation[0].country}, ${arrayLocation[0].region}`;
        }

        changePhotoInfo({
          ...photoInfo,
          createdAt: Date.now(),
          location: coords,
          photo: data.uri,
          locationCountry: arrayLocation[0].country,
          locationName: photoInfo.locationName
            ? photoInfo.locationName
            : currentNameLocation,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onRetakePhotoPress = () => {
    changePhotoInfo({
      ...photoInfo,
      createdAt: null,
      photo: null,
      location: null,
    });
  };

  return (
    <View style={styles.cameraImageContainer}>
      {photoInfo.photo ? (
        <>
          <Image style={styles.photo} source={{ uri: photoInfo.photo }} />
          <TouchableOpacity
            style={styles.photoBtn}
            onPress={onRetakePhotoPress}
          >
            <MaterialCommunityIcons
              name="camera-retake-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flash}
        >
          <View style={styles.settingsCameraContainer}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <AntDesign
                name="retweet"
                size={24}
                color={type === CameraType.front ? "yellow" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <Ionicons
                name={
                  flash === Camera.Constants.FlashMode.off
                    ? "flash"
                    : "flash-off"
                }
                size={20}
                color={
                  flash === Camera.Constants.FlashMode.off ? "white" : "yellow"
                }
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.photoBtn} onPress={takePicture}>
            <Feather name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  permissionsBtn: {
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "tomato",
  },
  cameraImageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  settingsCameraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 8,
  },

  photoBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
});

export default CreatePostCameraImage;
