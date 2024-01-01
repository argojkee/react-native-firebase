import { NavigationContainer } from "@react-navigation/native";
import { store } from "../../redux/store";
import { Router } from "../Router/Router";
import { Provider } from "react-redux";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function AppMain() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    </KeyboardAvoidingView>
  );
  {
  }
}
