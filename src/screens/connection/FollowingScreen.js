import React from "react";
import { StyleSheet } from "react-native";
import { UserList } from "@Junto/lists";

const FollowingScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    const { following } = navigation.getParam("connections");

    return (
        <UserList
            users={following}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default FollowingScreen;