import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase/config";

export const deleteFromStorage = async (userId, photoUrl) => {
  const arrayAvatarUri = photoUrl.split(`%2F${userId}%2F`);
  const prevImageId = arrayAvatarUri[1].split(`?alt=`)[0];
  const prevImageRef = ref(storage, `usersAvatars/${userId}/${prevImageId}`);
  await deleteObject(prevImageRef);
};
