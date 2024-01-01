import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultUsersScreen } from "../nestedScreens/DefaultUsersScreen";
import { UserScreen } from "../nestedScreens/UserScreen";

const UsersStack = createNativeStackNavigator();

export const UsersListScreen = () => {
  return (
    <UsersStack.Navigator>
      <UsersStack.Screen
        name="DefaultUsersScreen"
        component={DefaultUsersScreen}
        options={{
          title: "Users",
          headerTitleAlign: "center",
          // headerTitleStyle: {
          // color: "#212121",
          // fontFamily: "Roboto-Regular",
          // fontSize: 17,
          // fontWeight: 500,
          // lineHeight: 22,
          // letterSpacing: -0.408,
          // },
        }}
      />
      <UsersStack.Screen
        name="UserScreen"
        options={{ headerShown: false }}
        component={UserScreen}
      ></UsersStack.Screen>
    </UsersStack.Navigator>
  );
};
