import React from "react";
import {
    Alert,
    Platform
} from "react-native";
import * as Linking from "expo-linking";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { SettingsList } from "@Junto/lists";

const AppearanceSettingsScreen = () => {
    const settings = [
        {
            title: "Dark Mode",
            type: "button",
            onPress: () => {
                const message = `To set dark mode you must change your system theme${Platform.OS === "ios" ? ' in settings under "Display & Brightness"' : ""}`;
                Alert.alert(
                    message,
                    null,
                    Platform.OS === "ios" ? [
                        {
                            text: "Cancel",
                            style: "cancel"
                            
                        },
                        {
                            text: "Open Settings",
                            onPress: () => {
                                Linking.openURL("App-prefs:root=DISPLAY&path=APPEARANCE_OPTIONS")
                            }
                        }
                    ] : null
                );
            }
        }
    ];
    
    return (
        <ScreenContainer>
            <Header
                title="Appearance"
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default AppearanceSettingsScreen;