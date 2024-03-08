import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "../createDataContext";
import { navigate } from "@Junto/navigation-ref";
// API
import JuntoApi from "../../api/Junto";
import formRequest from "../../api/formRequest";
// Helpers
import { Alert } from "react-native";

// Handle setting state
const userReducer = (state, action) => {
    switch(action.type){
        case "sign_in":
            return { ...state, token: action.payload };
        case "sign_out":
            return { ...state, token: null };
        case "set_user_info":
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

// Sign in with email and password
const signIn = () => async ({ email }) => {
    try {
        if(!email){
            throw Error ("Must provide an email");
        }

        await JuntoApi.post(`/auth/login/${email}`);
    }
    catch (err) {
        throw Error(err.response ? err.response.data : err.message);
    }
};

const verifyCode = (dispatch) => async ({ email, verificationCode }) => {
    try{
        const { data: user, headers: { authorization } } = await JuntoApi.post("/auth/verify", { email, verificationCode });
        const token = authorization.replace("Bearer ", "");
        await AsyncStorage.setItem("token", token);
        dispatch({ type: "sign_in", payload: token });
        dispatch({ type: "set_user_info", payload: user });
    }
    catch (err) {
        throw Error(err.response.data || err.message);
    }
};

// Verify that the information from the first page of sign up is valid
const signUp = () => async (userId, userInfo) => {
    try {
        await JuntoApi.post(`/auth/register/${userId}`, userInfo);
    }
    catch (err) {
        throw Error(err.response ? err.response.data : err.message);
    }
};

// Clear token from AsyncStorage
const signOut = (dispatch) => async () => {
    try{
        // Remove all AsyncStorage items
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);

        // Clear the token from state
        dispatch({ type: "sign_out" });
        navigate("ResolveAuth");
    }
    catch(err) {
        Alert.alert(err.response.data || err.message);
    }
};

// Delete a user from the database and sign out
const deleteUser = (dispatch) => async () => {
    try{
        await JuntoApi.delete("/users");
        signOut(dispatch)();
    }
    catch(err){
        throw Error(err.response.data || err.message);
    }
};

// Get a user's information given their ID
const getUser = () => async (id) => {
    const { data: user } = await JuntoApi.get(`/users/${id}`);
    return user;
};

const searchUser = () => async (query) => {
    const { data: users } = await JuntoApi.get(`/users`, {
        params: query
    });
    return users;
};

// Update a user's information
const updateUser = (dispatch) => async (info) => {
    const {
        firstName,
        lastName,
        username,
        description,
        image
    } = info;
    
    // Check all required fields are filled
    switch(""){
        case firstName:
            throw new Error("Must enter a first name");
        case lastName:
            throw new Error("Must enter a last name");
        case username:
            throw new Error("Must enter a username");
    }

    await formRequest("put", "/users", {
        first_name: firstName,
        last_name: lastName,
        username,
        description,
        image
    });
    const { data: userId } = await JuntoApi.get("/");
    const { data: user } = await JuntoApi.get(`/users/${userId}`);
    dispatch({ type: "set_user_info", payload: user });
};

// Goes to either your feed or welcome page depending on whether you are logged in
const checkSignedIn = (dispatch) => async () => {
    try{
        const { data: userId } = await JuntoApi.get("/");
        const { data: user } = await JuntoApi.get(`/users/${userId}`);
        if (typeof(user) === "object" && user.username) {
            dispatch({ type: "set_user_info", payload: user });
            navigate("mainFlow");
        }
        else {
            throw new Error("");
        }
    }
    catch(err){
        if(err+"" === "Error: Network Error"){
            navigate("NoWifi");
        }
        else{
            navigate("Welcome");
        }
    }
};

// Follow a user. Unfollows if the user is already following them
const follow = () => async (targetUser) => {
    await JuntoApi.put(`/users/${targetUser}/follow`);
};

// Get whether userA is following userB
const following = () => async (userA, userB) => {
    const { data: following } = await JuntoApi.get(`/users/${userA}/following/${userB}`);
    return following;
};

// Get followers and those folowing a user
const getConnections = () => async (userId) => {
    const { data: connections } = await JuntoApi.get(`/users/${userId}/connections`);
    return connections;
};

export const { Provider, Context } = createDataContext(
    userReducer,
    {
        signIn,
        verifyCode,
        signUp,
        checkSignedIn,
        signOut,
        deleteUser,
        getUser,
        searchUser,
        updateUser,
        follow,
        following,
        getConnections
    }, { user: {} }
);

export const useUser = () => useContext(Context);

