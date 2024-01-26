import React from "react";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { SettingsList } from "@Junto/lists";
// Context
import { useUser } from "@Junto/user-context";
// Constants
import { colors } from "@Junto/constants";

const AccountSettingsScreen = () => {
    // Context
    const { deleteUser } = useUser();

    const settings = [
        {
            title: "Delete Account",
            type: "button",
            color: colors.DISLIKE_RED,
            onPress:() => {

                Alert.alert(
                    "Are you sure you would like to delete your account?",
                    "This action cannot be undone. Doing so will delete all content linked to your account.",
                    [
                        {
                            text: "No",
                            style: "cancel"
                        }, {
                            text: "Yes",
                            style: "destructive",
                            onPress: deleteUser
                        }
                    ], { cancelable: true }
                );
            }
        }
    ];

    return (
        <ScreenContainer>
            <Header
                title="Account"
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default AccountSettingsScreen;