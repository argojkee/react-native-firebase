import { getDownloadURL, ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import uploadToStorage from "../../../functions/uploadToStorage";
import { updateUserProfile } from "../authSlice";
import { auth, db, storage } from "../../../firebase/config";

export const authSignupUser =
  ({ email, name, photo, password }) =>
  async (dispatch) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let imageUrl;

      if (photo) {
        imageUrl = await uploadToStorage(photo, user.uid, "usersAvatars");
      } else {
        const folderPath = ref(storage, "usersAvatars/defaultImage");
        imageUrl = await getDownloadURL(ref(folderPath, "avatar.jpg"));
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl,
      });

      const newUser = auth.currentUser;

      await setDoc(doc(db, "users", newUser.uid), {
        userId: newUser.uid,
        userName: newUser.displayName,
        userAvatar: newUser.photoURL,
        userEmail: email,
      });

      dispatch(
        updateUserProfile({
          userId: newUser.uid,
          userName: newUser.displayName,
          userAvatar: newUser.photoURL,
          userEmail: newUser.email,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
