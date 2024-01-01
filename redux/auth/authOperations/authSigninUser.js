import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { updateUserProfile } from "../authSlice";
import uploadToStorage from "../../../functions/uploadToStorage";
import { auth } from "../../../firebase/config";
import helpers from "../../../helpers";
import { deleteFromStorage } from "../../../functions/deleteFromStorage";
import { changeUserAvatarDb } from "../../../functions/changeUserAvatarDb";
import { updateUserAvatarFull } from "../../../functions/updateUserAvatarFull";

export const authSignInUser =
  ({ email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (photo) {
        const { imageUrl, userId, userEmail, userName } =
          await updateUserAvatarFull({ method: "signIn", photo });
        // const imageUrl = await uploadToStorage(photo, user.uid, "usersAvatars");

        // if (user.photoURL !== helpers.constants.DEFAULT_AVATAR) {
        //   await deleteFromStorage(user.uid, user.photoURL);
        // }

        // await updateProfile(auth.currentUser, {
        //   photoURL: imageUrl,
        // });

        // const newUser = auth.currentUser;

        // await changeUserAvatarDb(newUser.uid, newUser.photoURL);

        dispatch(
          updateUserProfile({
            userAvatar: imageUrl,
            userId,
            userEmail,
            userName,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
