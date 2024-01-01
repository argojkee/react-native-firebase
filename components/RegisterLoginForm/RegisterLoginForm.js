import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useState } from "react";
import helpers from "../../helpers";
import UserAvatarContainer from "../UserAvatarContainer/UserAvatarContainer";
import authOperations from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialUserInfoState = {
  email: "",
  password: "",
  photo: null,
};

export default RegisterLoginForm = ({
  isRegistrationForm,
  navigation,
  onInputFocus,
  hideKeyboard,
}) => {
  const [userInfo, setUserInfo] = useState(
    !isRegistrationForm
      ? initialUserInfoState
      : { ...initialUserInfoState, login: "" }
  );
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const dispatch = useDispatch();

  const onIsSecurePassword = () => {
    setIsSecurePassword(!isSecurePassword);
  };

  const onLoginChange = (value) => {
    setUserInfo((prevState) => ({ ...prevState, login: value }));
  };

  const onEmailChange = (value) => {
    setUserInfo((prevState) => ({ ...prevState, email: value }));
  };

  const onPasswordChange = (value) => {
    setUserInfo((prevState) => ({ ...prevState, password: value }));
  };

  const changeUserAvatar = (newPhoto) => {
    setUserInfo((prevState) => ({
      ...prevState,
      photo: newPhoto,
    }));
  };

  const onDeletePhotoPress = () => {
    setUserInfo((prevState) => ({
      ...prevState,
      photo: null,
    }));
  };

  const onAcceptPress = () => {
    if (!helpers.validateFormRegLogin(isRegistrationForm, userInfo)) return;

    if (isRegistrationForm) {
      dispatch(
        authOperations.authSignupUser({
          email: userInfo.email,
          password: userInfo.password,
          name: userInfo.login,
          photo: userInfo.photo,
        })
      );
    } else {
      dispatch(
        authOperations.authSignInUser({
          email: userInfo.email,
          password: userInfo.password,
          photo: userInfo.photo,
        })
      );
    }

    hideKeyboard();
    Keyboard.dismiss();
  };

  toOtherPagePress = () => {
    if (isRegistrationForm) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Registration");
    }
  };

  const { login, email, password, photo } = userInfo;
  const isDisabledSubmit = isRegistrationForm
    ? !login || !email || !password
    : !email || !password;

  return (
    <>
      <View style={styles.regForm}>
        <UserAvatarContainer
          photo={photo}
          changeUserAvatar={changeUserAvatar}
          onDeletePhotoPress={onDeletePhotoPress}
        />
        <View>
          <Text style={{ ...styles.formTitle }}>
            {isRegistrationForm ? "Registration" : "Login"}
          </Text>
        </View>

        {isRegistrationForm && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"#BDBDBD"}
              placeholderTextSize={"50px"}
              placeholder={"Login"}
              style={styles.input}
              value={login}
              onFocus={onInputFocus}
              onChangeText={onLoginChange}
            ></TextInput>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={"#BDBDBD"}
            placeholderTextSize={"50px"}
            placeholder={"Email"}
            style={styles.input}
            value={email}
            onFocus={onInputFocus}
            onChangeText={onEmailChange}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={"#BDBDBD"}
            placeholderTextSize={"50px"}
            placeholder={"Password"}
            style={styles.input}
            secureTextEntry={isSecurePassword}
            value={password}
            onChangeText={onPasswordChange}
            onFocus={onInputFocus}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.showPassBtn}
            onPress={onIsSecurePassword}
          >
            <Text style={styles.showPassTitle}>Show</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupBtnContainer}>
          <TouchableOpacity
            disabled={isDisabledSubmit}
            onPress={onAcceptPress}
            activeOpacity={0.7}
            style={{
              ...styles.signupBtn,
              backgroundColor: isDisabledSubmit
                ? "rgba(255, 108, 0, 0.3)"
                : "rgba(255, 108, 0, 1)",
            }}
          >
            <Text style={styles.signupBtnTitle}>
              {isRegistrationForm ? "Register" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tologinContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.tologinBtn}>
          <Text style={styles.toLoginTitle} onPress={toOtherPagePress}>
            {isRegistrationForm
              ? "Already have an account? Sign in"
              : "Haven't an account? Register!"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  regForm: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    paddingTop: 92,
  },

  formTitle: {
    color: "#212121",
    fontSize: 30,
    letterSpacing: 0.3,
    fontWeight: 500,
    marginBottom: 33,
    fontFamily: "Roboto-Regular",
    fontWeight: 500,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    position: "relative",
    width: "100%",
    height: 50,
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
  },
  showPassBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [{ translateX: -16 }, { translateY: 12 }],
  },
  showPassTitle: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  signupBtnContainer: {
    width: "100%",
    marginTop: 43,
  },

  signupBtn: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  signupBtnTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  toLoginTitle: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
