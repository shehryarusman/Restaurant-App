import { useContext } from "react";
import createDataContext from "../createDataContext";
// API
import RestaurantAppApi from "../../api/RestaurantApp";
import formRequest from "../../api/formRequest";
// Helper functions
import { capitalize } from "@RestaurantApp/helpers";

// Handle setting state
const contentReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

// Create a post or comment
const createContent = () => async (contentType, info) => {
    const { text } = info;
    if (!text || text.length < 1) throw new Error(`${capitalize(contentType)} body is required`);
    try{
        // Only use formRequest to handle file uploads (bandaid solution)
        if (contentType === "post") {
            await formRequest("post", `/${contentType}s`, info);
        }
        else {
            await RestaurantAppApi.post(`/${contentType}s`, info);
        }
    }
    catch (err) {
        throw new Error(err.response.data || err.message);
    }
};

const updateContent = () => async (contentType, id, info) => {
    const {
        text
    } = info;
    if (!text || text.length < 1) throw new Error(`${capitalize(contentType)} body is required`);
    try{
        // Only use formRequest to handle file uploads (bandaid solution)
        if (contentType === "post") {
            await formRequest("put", `/${contentType}s/${id}`, info);
        }
        else {
            await RestaurantAppApi.put(`/${contentType}s/${id}`, info);
        }
    }
    catch (err) {
        throw new Error(err.response.data || err.message);
    }
};

// Delete a post or comment by id
const deleteContent = () => async (contentType, contentId) => {
    await RestaurantAppApi.delete(`/${contentType}s/${contentId}`);
}

// Get content by id
const getContent = () => async (contentType, contentId) => {
    const {
        data: content
    } = await RestaurantAppApi.get(`/${contentType}s/${contentId}`);
    return content;
}

// (GET) Search content
const searchContent = () => async (contentType, query) => {
    const { data: content } = await RestaurantAppApi.get(`/${contentType}s`, {
        params: query
    });
    return content;
}

// GET all the comments of a given parent
const getComments = () => async (contentType, parentId) => {
    const { data: comments } = await RestaurantAppApi.get(`/${contentType}s/${parentId}/comments`);
    return comments;
};

// GET the user's personal feed
const getFeed = () => async () => {
    const { data: posts } = await RestaurantAppApi.get(`/feed`);
    return posts;
};

// Like a post or comment (unlikes if already liked)
const likeContent = () => async (contentType, contentId) => {
    const { data: updatedContent } = await RestaurantAppApi.put(`/${contentType}s/${contentId}/like`);
    return updatedContent;
};

// Dislike a post or comment (undislikes if already disliked)
const dislikeContent = () => async (contentType, contentId) => {
    const { data: updatedContent } = await RestaurantAppApi.put(`/${contentType}s/${contentId}/dislike`);
    return updatedContent;
};

export const { Provider, Context } = createDataContext(
    contentReducer,
    {
        createContent,
        updateContent,
        deleteContent,
        getContent,
        searchContent,
        getComments,
        getFeed,
        likeContent,
        dislikeContent
    }, {}
);

export const useContent = () => useContext(Context);

