import React from "react";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { PostForm } from "@Junto/forms";

const PostCreateScreen = (props) => {
    return (
        <ScreenContainer
        >
            <Header
                title="Post"
            />
            <PostForm
                type="create"
                submitText="Post"
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostCreateScreen;

