import React, {
    useEffect,
    useRef,
    useState
} from "react";
// Components
import { StyleSheet } from "react-native";
import { CreateButton } from "@Junto/single-use";
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { PostList } from "@Junto/lists";
// Icons
import {
    JuntoIcon
} from "@Junto/icons";
// Context
import { useContent } from "@Junto/content-context";
// Constants
import { colors } from "@Junto/constants";

const FeedScreen = () => {
    // Context
    const { getFeed } = useContent();

    // Ref
    const postListRef = useRef();

    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Event handlers

    const onScrollToTop = async () => {
        postListRef.current.scrollToTop();
        await retrieveFeed();
    };

    const onDidFocus = () => {
        postListRef.current.reloadContent();
    };

    // Retreive newsfeed from API and set state accordingly
    const retrieveFeed = async () => {
        setLoading(true);
        setPosts(await getFeed());
        setLoading(false);
    };

    // Get feed initially
    useEffect(() => {
        retrieveFeed();
    }, []);

    return (
        <ScreenContainer
            onDidFocus={onDidFocus}
        >
            <Header
                MiddleIcon={JuntoIcon}
                MiddleIconProps={{
                    color: colors.primary.MAIN,
                    onPress: onScrollToTop
                }}
                hideLeftIcon
            />
            <PostList
                emptyMessage="Follow people to populate your feed"
                loading={loading}
                onRefresh={retrieveFeed}
                data={posts}
                ref={postListRef}
            />
            <CreateButton
                style={styles.createPost}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
    },
    createPost: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
});

export default FeedScreen;

