import uploadToStorage from "./uploadToStorage";
import { auth } from "../firebase/config";
import { changeUserAvatarDb } from "./changeUserAvatarDb";
import helpers from "../helpers";
import { deleteFromStorage } from "./deleteFromStorage";
import { updateProfile } from "firebase/auth";

export const updateUserAvatarFull = async ({ photo, method }) => {
  const authUser = auth.currentUser;

  let imageUrl;
  if (method === "add" || method === "signIn") {
    imageUrl = await uploadToStorage(photo, authUser.uid, "usersAvatars");
  }

  if (method === "add" || method === "signIn") {
    if (authUser.photoURL !== helpers.constants.DEFAULT_AVATAR) {
      await deleteFromStorage(authUser.uid, authUser.photoURL);
    }
  } else if (method === "delete") {
    await deleteFromStorage(authUser.uid, authUser.photoURL);
  }

  await updateProfile(auth.currentUser, {
    photoURL:
      method === "add" || method === "signIn"
        ? imageUrl
        : helpers.constants.DEFAULT_AVATAR,
  });

  const newUser = auth.currentUser;

  await changeUserAvatarDb(newUser.uid, newUser.photoURL);
  return {
    imageUrl: newUser.photoURL,
    userId: newUser.uid,
    userEmail: newUser.email,
    userName: newUser.displayName,
  };
};
