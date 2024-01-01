import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import authOperations from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const LogoutHeaderButton = ({ page }) => {
  const dispatch = useDispatch();
  const onLogoutPress = () => {
    dispatch(authOperations.authSignOutUser());
  };

  return (
    <TouchableOpacity style={page && styles.logoutBtn} onPress={onLogoutPress}>
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});

export default LogoutHeaderButton;
