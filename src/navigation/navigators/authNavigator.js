import {
    createStackNavigator,
    TransitionPresets
} from "react-navigation-stack";
// Screens
import SignInScreen from "../../screens/authentication/SignInScreen";
import SignUpScreen from "../../screens/authentication/SignUpScreen";
import VerifyCodeScreen from "../../screens/authentication/VerifyCodeScreen";

// The navigator organizes the authentication screens
const authNavigator = createStackNavigator({
        SignIn: SignInScreen,
        VerifyCode: {
            screen: VerifyCodeScreen,
            navigationOptions: { headerShown: false }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: { headerShown: false }
        },
    }, {
        headerMode: "none",
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    }
});

export default authNavigator;
