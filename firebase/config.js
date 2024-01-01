import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByH4pvFgcwTfJhriGN9m4NEytEJUJ6sLU",
  authDomain: "tourists-app-posts.firebaseapp.com",
  projectId: "tourists-app-posts",
  storageBucket: "tourists-app-posts.appspot.com",
  messagingSenderId: "758742679797",
  appId: "1:758742679797:web:c94563def5c3cea82ec5bc",
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
