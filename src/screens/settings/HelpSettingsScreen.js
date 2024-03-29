import React from "react";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { SettingsList } from "@Junto/lists";

const HelpSettingsScreen = () => {

    const settings = [
        {
            title: "Contact Support",
            type: "button",
            onPress: () => {
                // Linking.openURL("mailto: support@protosapps.com")
                // .catch(err => {
                //     Alert.alert("Couldn't open email client", null);
                // })
                Alert.alert("Support not implemented yet")
            }
        }
    ];
    
    return (
        <ScreenContainer>
            <Header
                title="Help"
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default HelpSettingsScreen;