import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const PostsStack = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
      />
      <PostsStack.Screen
        name="MapScreen"
        component={MapScreen}
      ></PostsStack.Screen>
      <PostsStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
      ></PostsStack.Screen>
    </PostsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
