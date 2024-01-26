import React, { useEffect } from "react";
// Components
import { StyleSheet } from "react-native";
import { ScreenContainer } from "@Junto/fundamentals";
// Icons
import { JuntoIcon } from "@Junto/icons";
// Context
import { useUser } from "@Junto/user-context";
// Constants
import { colors } from "@Junto/constants";

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useUser();

    useEffect(() => {
        // Check if the user is signed in
        checkSignedIn();
    }, []);

    return (
        <ScreenContainer
            style={styles.container}
            statusBarBackgroundColor={colors.primary.MAIN}
            statusBarStyle={"dark-content"}
        >
            <JuntoIcon
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
        backgroundColor: colors.primary.MAIN,
    }
});

export default ResolveAuthScreen;

