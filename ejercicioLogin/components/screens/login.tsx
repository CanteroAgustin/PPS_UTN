import {StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {Button} from "react-native-elements";
import {RootNavigatorParamList} from "../../types";

export interface LoginProps {
  navigation: StackNavigationProp<RootNavigatorParamList, "Home">;
}

// const buttonHandler = (
//   navigation: StackNavigationProp<RootNavigatorParamList, "HomeScreen">
// ) => {
//   navigation.navigate("HomeScreen");
// };

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Instamobile</Text>
            <TextInput
              placeholder="Username"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => navigation.navigate("Home")}
              title="Login"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // <View>
    //   <Button
    //     title="Login"
    //     onPress={() => {
    //       navigation.navigate("Home");
    //     }}
    //   />
    // </View>
  );
};

// async onFbLoginPress() {
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
//     permissions: ['public_profile', 'email'],
//   });
//   if (type === 'success') {
//     const response = await fetch(
//       `https://graph.facebook.com/me?access_token=${token}`);
//     Alert.alert(
//       'Logged in!',
//       `Hi ${(await response.json()).name}!`,
//     );
//   }
// }

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
