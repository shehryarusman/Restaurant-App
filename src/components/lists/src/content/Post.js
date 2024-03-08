import React, {
    useState,
    useEffect,
    useRef
} from "react";
// Components
import {
    Appearance,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import MultiTap from "react-native-multitap";
import {
    Text,
    TouchableIcon,
    ImageList
} from "@Junto/elements";
import {
    LikeButton,
    DislikeButton
} from "./parts/likeness-buttons";
import ContentHeader from "./parts/ContentHeader";
import LikenessBar from "./parts/LikenessBar";
import { LikeAnimation } from "@Junto/animations";
// Navigation
import { navigate } from "@Junto/navigation-ref";
// Contexts
import { useUser } from "@Junto/user-context";
import { useContent } from "@Junto/content-context";
// Icons
import { CommentIcon } from "@Junto/icons";
// Constants
import { colors, sizes } from "@Junto/constants";

const Post = (props) => {
    // Refs
    const likeRef = useRef();
    const dislikeRef = useRef();
    const likeAnimationRef = useRef();

    // Context
    const { state: { user } } = useUser();
    const { likeContent, dislikeContent } = useContent();

    // Theme
    const theme = Appearance.getColorScheme();
    
    // Props
    const {
        commentsButtonDisabled=false,
        style,
        data: passedPost,
        onDelete
    } = props;
    
    const [post, setPost] = useState(passedPost);

    // Event handlers
    const onHeaderPress = () => {
        navigate("AccountView", { user: post.author });
    };

    const onViewPost = () => {
        if (!commentsButtonDisabled) {
            navigate("PostView", { post });
        }
    };

    const onLike = async () => {
        setPost(await likeContent("post", post.id));
    };

    const onDislike = async () => {
        setPost(await dislikeContent("post", post.id));
    };

    const onDoubleTap = () => {
        // Like post and show like animtion on double tap if you"re not already liking it
        if (!post.liking) {
            onLike();
            likeAnimationRef.current.fire();
        }
    };

    // Update post data when passed post changes
    useEffect(() => {
        setPost(passedPost);
    }, [passedPost]);

    return (
        <TouchableWithoutFeedback>
            <View style={[
                styles.post,
                themeStyles[theme].post,
                style
            ]}>
                <ContentHeader
                    content={post}
                    onPress={onHeaderPress}
                    onDelete={onDelete}
                />
                {
                    post.images && (
                        <MultiTap
                            onDoubleTap={onDoubleTap}
                            style={styles.imageContainer}
                        >
                            <ImageList
                                data={post.images}
                                style={styles.images}
                            />
                            <LikeAnimation
                                style={styles.likeAnimation}
                                ref={likeAnimationRef}
                            />
                        </MultiTap>
                    )
                }
                <View
                    style={styles.body}>
                    <Text style={styles.text}>{post.text}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.likenessContainer}>
                        <View style={styles.likeness}>
                            <LikeButton
                                onPress={onLike}
                                content={post}
                                ref={likeRef}
                            />
                            <DislikeButton
                                onPress={onDislike}
                                content={post}
                                style={styles.dislike}
                                ref={dislikeRef}
                            />
                        </View>
                        <LikenessBar
                            show={post.author.id === user.id}
                            like_count={post.like_count}
                            dislike_count={post.dislike_count}
                        />
                    </View>
                    <TouchableIcon
                        Icon={CommentIcon}
                        size={sizes.ACTION_ICON}
                        onPress={onViewPost}
                        style={styles.comment}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    post: {
        marginBottom: 5,
    },
    // Post image
    images: {
        marginBottom: 15
    },
    // Post body
    body: {
        margin: 15,
        marginTop: 0
    },
    // Actions
    actions: {
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        alignItems: "center"
    },
    likeness: {
        flexDirection: "row",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    dislike: {
        marginTop: 5,
        marginLeft: 5
    },
    comment: {
        marginLeft: 15,
        marginBottom: 15
    },
    imageContainer: {
        justifyContent: "center"
    },
    likeAnimation: {
        position: "absolute",
        alignSelf: "center",
    }
});

const themeStyles = {
    light: StyleSheet.create({
        post: {
            backgroundColor: colors.WHITE,
        }
    }),
    dark: StyleSheet.create({
        post: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

export default Post;