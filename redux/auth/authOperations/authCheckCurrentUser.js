import { auth } from "../../../firebase/config";
import { updateUserProfile, updateIsAuth } from "../authSlice";
import { onAuthStateChanged } from "firebase/auth";

export const authCheckCurrentUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            userName: user.displayName,
            userAvatar: user.photoURL,
            userEmail: user.email,
          })
        );
        dispatch(updateIsAuth(true));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
