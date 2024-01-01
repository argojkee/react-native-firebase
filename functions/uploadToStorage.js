import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
const { v4: uuidv4 } = require("uuid");

export default uploadToStorage = async (photo, userId, pathName) => {
  try {
    let path;
    if (pathName === "postImage") {
      path = pathName;
    } else if (pathName === "usersAvatars") {
      path = `usersAvatars/${userId}`;
    }
    const response = await fetch(photo);
    const file = await response.blob();

    const imageId = uuidv4();
    const storageRef = ref(storage, `${path}/${imageId}`);

    await uploadBytes(storageRef, file);

    const folderPath = ref(storage, path);
    return await getDownloadURL(ref(folderPath, imageId));
  } catch (error) {
    console.log(error.message);
  }
};
