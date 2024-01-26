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
    JuntoIcon,
    guestProfilePicture,
    awsBucketImage
} from "@Junto/icons";
// Context
import { useUser } from "@Junto/user-context";
import { useContent } from "@Junto/content-context";
import { useChat } from "@Junto/chat-context";
// Constants
import { colors } from "@Junto/constants";

const FeedScreen = ({ navigation }) => {
    // Context
    const { state: { user } } = useUser();
    const { getFeed } = useContent();
    const { state: { unreadChats } } = useChat();

    // Ref
    const postListRef = useRef();

    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? awsBucketImage(user.profile_picture_bucket_key)
        : guestProfilePicture
    );

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

