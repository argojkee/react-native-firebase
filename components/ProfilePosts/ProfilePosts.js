import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProfilePost from "../ProfilePost/ProfilePost";
import { useSelector, useDispatch } from "react-redux";
import LogoutHeaderButton from "../LogoutHeaderButton/LogoutHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import UserAvatarContainer from "../UserAvatarContainer/UserAvatarContainer";
import helpers from "../../helpers";
import { updateUserProfile } from "../../redux/auth/authSlice";
import { updateUserAvatarFull } from "../../functions/updateUserAvatarFull";

const ProfilePosts = ({ posts, user, navigation }) => {
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddAvatar = async (photo) => {
    const { imageUrl } = await updateUserAvatarFull({ method: "add", photo });

    dispatch(updateUserProfile({ ...currentUser, userAvatar: imageUrl }));
  };

  const onDeletePhotoPress = async () => {
    const { imageUrl } = await updateUserAvatarFull({ method: "delete" });

    dispatch(updateUserProfile({ ...currentUser, userAvatar: imageUrl }));
  };

  const onBackPress = () => {
    navigation.navigate("DefaultUsersScreen");
  };

  const isOwnerPage = currentUser.userId === user.userId;

  return (
    <View style={styles.container}>
      <UserAvatarContainer
        isOwnerPage={isOwnerPage}
        changeUserAvatar={onAddAvatar}
        onDeletePhotoPress={onDeletePhotoPress}
        photo={
          user.userAvatar === helpers.constants.DEFAULT_AVATAR
            ? null
            : user.userAvatar
        }
      />
      {isOwnerPage && <LogoutHeaderButton page="Profile" />}
      {!isOwnerPage && (
        <TouchableOpacity onPress={onBackPress} style={styles.goBackBtn}>
          <Ionicons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
      )}
      <Text style={styles.userName}>{user.userName}</Text>
      {posts && (
        <FlatList
          style={styles.postsList}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProfilePost item={item} navigation={navigation} />
          )}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 119,
    paddingBottom: 150,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: 0,
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },

  goBackBtn: {
    position: "absolute",
    top: 22,
    left: 16,
  },

  userName: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: "500",
    marginTop: 92,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  postsList: {
    marginTop: 20,
  },
});

export default ProfilePosts;
