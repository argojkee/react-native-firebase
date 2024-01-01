import { authSignOutUserAction } from "../authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOutUserAction());
  } catch (error) {
    console.log(error.message);
  }
};
