import React from "react";
// Components
import { StyleSheet } from "react-native";
import { FlatList } from "@Junto/elements";
import Message from "./Message";

const MessageList = (props) => {
    // Props
    const {
        messages,
        loading
    } = props;

    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            RenderComponent={Message}
            style={styles.container}
            emptyMessage="No messages"
            loading={loading}
            inverted={messages.length > 0}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
});

export default MessageList;