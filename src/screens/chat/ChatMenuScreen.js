import React, { useEffect, useState } from 'react';
// Components
import { Alert } from 'react-native';
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { ChatPreviewList } from "@Junto/lists";
// Context
import { useChat } from "@Junto/chat-context";
// Icons
import { PlusIcon } from "@Junto/icons";

const ChatMenuScreen = (props) => {
    const { getPersonalChats, state: { unreadChats } } = useChat();

    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState(true);

    const {
        navigation
    } = props;

    const onCreateChat = () => {
        navigation.navigate("ChatCreate");
    };

    const refreshChats = () => {
        getPersonalChats()
        .then(chats => {
            setChats(chats);
        }).catch(err => {
            Alert.alert(err.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        refreshChats();
    }, []);

    return (
        <ScreenContainer
            onDidFocus={refreshChats}
        >
            <Header
                title="Chat"
                RightIcon={PlusIcon}
                RightIconProps={{
                    onPress: onCreateChat
                }}
            />
            <ChatPreviewList
                chats={chats}
                unReadChats={unreadChats}
                loading={loading}
                refreshable
                onRefresh={refreshChats}
            />
        </ScreenContainer>
    );
};

export default ChatMenuScreen;
