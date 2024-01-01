import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { CreatePostScreen } from "./mainTabs/CreatePostScreen";
import { PostsScreen } from "./mainTabs/PostsScreen";
import { ProfileScreen } from "./mainTabs/ProfileScreen";
import { UsersListScreen } from "./mainTabs/UsersListScreen";
import LogoutHeaderButton from "../components/LogoutHeaderButton/LogoutHeaderButton";
import { Ionicons } from "@expo/vector-icons";

const HomeTab = createBottomTabNavigator();

export const HomeScreen = ({ onLogoutPress, navigation, user }) => {
  return (
    <HomeTab.Navigator
      initialRouteName={"Posts"}
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitle,

        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let currentColor = focused ? "#fff" : "#212121";

          if (route.name === "Posts") {
            iconName = "appstore-o";
          } else if (route.name === "CreatePost") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "UsersList") {
            iconName = "addusergroup";
          }

          return (
            <View
              style={{
                ...styles.tabIconContainer,
                backgroundColor: focused ? "#FF6C00" : "#fff",
                width: focused ? 70 : 24,
              }}
            >
              <AntDesign name={iconName} size={24} color={currentColor} />
            </View>
          );
        },

        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarStyle: styles.tabContainer,
      })}
    >
      <HomeTab.Screen
        options={{
          headerTitle: "Posts",
          headerRight: () => {
            return <LogoutHeaderButton />;
          },
          headerRightContainerStyle: styles.headerButton,
        }}
        name="Posts"
        component={PostsScreen}
      />

      <HomeTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerLeft: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(CommonActions.goBack());
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#212121" />
              </TouchableOpacity>
            );
          },
        }}
      />

      <HomeTab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />

      <HomeTab.Screen
        options={{ headerShown: false }}
        name="UsersList"
        component={UsersListScreen}
      />
    </HomeTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    height: 40,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    paddingHorizontal: 81,
    display: "flex",
    columnGap: 31,
    height: 83,
    paddingBottom: 22,
    paddingTop: 9,
  },

  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  headerButton: {
    paddingRight: 10,
  },
});
