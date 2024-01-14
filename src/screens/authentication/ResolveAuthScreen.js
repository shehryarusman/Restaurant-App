import React, { useEffect } from "react";
// Components
import { StyleSheet } from "react-native";
import { ScreenContainer } from "@RestaurantApp/fundamentals";
// Icons
import { RestaurantAppIcon } from "@RestaurantApp/icons";
// Context
import { useUser } from "@RestaurantApp/user-context";
import { useSettings} from "@RestaurantApp/settings-context";
// Constants
import { colors } from "@RestaurantApp/constants";

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useUser();
    const { getSettings } = useSettings();

    useEffect(() => {
        // Get settings from storage and set to context
        getSettings();

        // Check if the user is signed in
        checkSignedIn();
    }, []);

    return (
        <ScreenContainer
            style={styles.container}
            statusBarBackgroundColor={colors.GREEN}
            statusBarStyle={"dark-content"}
        >
            <RestaurantAppIcon
                color={colors.WHITE}
                width={78}
                height={90}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: colors.GREEN,
    }
});

export default ResolveAuthScreen;

