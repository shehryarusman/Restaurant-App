import {
    createStackNavigator,
    TransitionPresets
} from "react-navigation-stack";
// Screens
// Acccount Screens
import AccountViewScreen from "../../screens/account/AccountViewScreen";
import AccountEditScreen from "../../screens/account/AccountEditScreen";
// Post Screens
import PostCreateScreen from "../../screens/post/PostCreateScreen";
import PostEditScreen from "../../screens/post/PostEditScreen";
import PostViewScreen from "../../screens/post/PostViewScreen";
// Comment Screens
import CommentCreateScreen from "../../screens/comment/CommentCreateScreen";
import CommentEditScreen from "../../screens/comment/CommentEditScreen";
// Meetup Screens;
import MeetupCreateScreen from "../../screens/meetup/MeetupCreateScreen";
// Navigators
import tabNavigator from "./tabNavigator";
import connectionNavigator from "./connectionNavigator";
import settingsNavigator from "./settingsNavigator";
import chatNavigator from "./chatNavigator";

// This navigator connects the tabFlow to the other screens
const mainNavigator = createStackNavigator(
    {
        tabFlow: tabNavigator,
        // Account Screens
        AccountEdit: AccountEditScreen,
        AccountView: AccountViewScreen,
        // Connections Screen
        Connections: connectionNavigator,
        // Settings navigator
        settingsFlow: settingsNavigator,
        // Chat navigator
        chatFlow: chatNavigator,
        // Post Screens
        PostCreate: PostCreateScreen,
        PostView: PostViewScreen,
        PostEdit: PostEditScreen,
        // Comment Screens
        CommentCreate: CommentCreateScreen,
        CommentEdit: CommentEditScreen,
        // Meetup Screens
        MeetupCreate: MeetupCreateScreen,
        MeetupChat: (() => null),
        MeetupGallery: (() => null),
        MeetupSettings: (() => null),
    },
    {
        headerMode: "none",
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export default mainNavigator;