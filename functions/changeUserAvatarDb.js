import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const changeUserAvatarDb = async (userId, image) => {
  await setDoc(
    doc(db, "users", userId),
    {
      userAvatar: image,
    },
    { merge: true }
  );
};
