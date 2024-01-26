import React from "react";
import { View, StyleSheet } from "react-native";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { Button } from "@Junto/elements";

const SwipeScreen = () => {
    return (
        <ScreenContainer>
            <Header
                title="Meal Match"
                hideLeftIcon
            />
            <View style={styles.container}>
                <Button
                    title="Let them cook"
                    style={{ marginBottom: 25 }}
                />
                <Button
                    title="Let me cook"
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "center"
    },
});

export default SwipeScreen;