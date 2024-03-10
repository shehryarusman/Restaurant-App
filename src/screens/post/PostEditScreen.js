import React from "react";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { PostForm } from "@Junto/forms";

const PostEditScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    // Navigation Data
    const postData = navigation.getParam("data");

    return (
        <ScreenContainer>
            <Header
                title="Edit Post"
            />
            <PostForm
                data={postData}
                type="edit"
                submitText="Update"
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostEditScreen;

