import React from "react";
// Components
import { SettingsList } from "@RestaurantApp/lists";
import { ScreenContainer, Header } from "@RestaurantApp/fundamentals";

const SettingsScreen = ({ navigation }) => {

    const settings = [
        {
            title: "Appearance",
            type: "button",
            onPress: () => navigation.navigate("AppearanceSettings")
        },
        {
            title: "Account",
            type: "button",
            onPress: () => navigation.navigate("AccountSettings")
        },
        {
            title: "Help",
            type: "button",
            onPress: () => navigation.navigate("HelpSettings")
        },
    ];

    return (
        <ScreenContainer>
            <Header
                title="Settings"
            />
            <SettingsList settings={settings} />
        </ScreenContainer>
    );
};

export default SettingsScreen;

