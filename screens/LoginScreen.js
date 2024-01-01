import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import RegisterLoginForm from "../components/RegisterLoginForm/RegisterLoginForm";

export default function LoginScreen({
  //   isPortraitOrientation,
  navigation,
  onRegLoginPress,
}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const eventKeyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    const eventKeyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });

    return () => {
      eventKeyboardHide.remove();
      eventKeyboardShow.remove();
    };
  }, []);

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  const onWithoutFeedbackPress = () => {
    Keyboard.dismiss();
    hideKeyboard();
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onWithoutFeedbackPress}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/registration-login-bg.jpg")}
        >
          <View
            style={{
              ...styles.registerContainer,
              marginBottom: isShowKeyboard ? -150 : 0,
              //   marginTop: isPortraitOrientation ? "auto" : 50,
            }}
          >
            <RegisterLoginForm
              navigation={navigation}
              onRegLoginPress={onRegLoginPress}
              isRegistrationForm={false}
              onInputFocus={onInputFocus}
              hideKeyboard={hideKeyboard}
            />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  registerContainer: {
    paddingBottom: 45,
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
