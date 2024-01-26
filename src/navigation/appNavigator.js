import React, { useEffect } from "react";
import { Appearance } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
// Expo
import * as Notifications from 'expo-notifications';
// SafeAreaProvider
import {
    SafeAreaProvider,
    initialWindowMetrics
} from "react-native-safe-area-context";
// Set Navigator
import { setNavigator, navigate } from "@RestaurantApp/navigation-ref";
// Miscellaneous Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import NoWifiScreen from "../screens/NoWifiScreen";
// Authentication Screens
import ResolveAuthScreen from "../screens/authentication/ResolveAuthScreen";
// Navigators
import mainNavigator from "./navigators/mainNavigator";
import authNavigator from "./navigators/authNavigator";
// Context
import { useNotification } from "@RestaurantApp/notification-context";
import { useChat } from "@RestaurantApp/chat-context";
// Constants
import { colors } from "@RestaurantApp/constants";

// This is the root navigator
const appNavigator = (hideFeed) => createSwitchNavigator({
    // Miscellaneous (external) screens
    ResolveAuth: ResolveAuthScreen,
    NoWifi: NoWifiScreen,
    Welcome: WelcomeScreen,
    // Flows
    authFlow: authNavigator,
    mainFlow: mainNavigator(hideFeed)
});

const AppNavigator = () => {
    // Context
    const { setNotificationToken } = useNotification();
    const { addUnreadChat } = useChat();
    // Theme
    const theme = Appearance.getColorScheme();
    const AppContainer = createAppContainer(appNavigator(false));

    useEffect(() => {
        setNotificationToken();
        const notificationForgroundListener = Notifications.addNotificationReceivedListener(notification => {
            const notificationData = notification.request.content.data;
            switch(notificationData.type){
                case 'message':
                    addUnreadChat(notificationData.message.chat_id);
                    break;
            }
        });

        const notificationTapListener = Notifications.addNotificationResponseReceivedListener(response => {
            const notificationData = response.notification.request.content.data;
            switch(notificationData.type){
                case 'message':
                    navigate('ChatMain', { chatId: notificationData.message.chat_id });
                    break;
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationForgroundListener);
            Notifications.removeNotificationSubscription(notificationTapListener);
        };
    }, []);

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === "dark" ? colors.dark.THIRD : colors.WHITE
            }}
        >
            <AppContainer
                theme={theme}
                hideFeed={false}
                ref={(navigator) => { setNavigator(navigator) }}
            />
        </SafeAreaProvider>
    );
};

export default AppNavigator;

