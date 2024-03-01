import React, { useState } from "react";
// Components
import {
    View,
    Keyboard,
    StyleSheet,
    Alert
} from "react-native";
import {
    Text,
    TextInput,
    Hyperlink,
    Button,
    DatePicker
} from "@Junto/elements";
import { ScreenContainer } from "@Junto/fundamentals";
// Context
import { useUser } from "@Junto/user-context";

const SignUpScreenOne = ({ navigation }) => {
    const email = navigation.getParam("email");
    const { state: { user }, signUp } = useUser();
    // Form feilds
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    // Status states
    const [loading, setLoading] = useState(false);

    // Event Handlers
    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            setLoading(true);
            Keyboard.dismiss();
            await signUp(user.id, { email, firstName, lastName, username, dob });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if (formSuccess) {
                navigation.navigate("ResolveAuth");
            }
        }
    }

    return (
        <ScreenContainer>
            <View style={styles.auth}>
                <Text style={styles.header}>Sign up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    autoCorrect={false}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    autoCorrect={false}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <DatePicker
                    placeholder="Date of birth"
                    buttonStyle={{width: 300}}
                    containerStyle={styles.submitContainer}
                    date={dob}
                    setDate={setDob}
                />
                <Button
                    title="Create an Account"
                    type="primary"
                    loading={loading}
                    buttonStyle={styles.submit}
                    containerStyle={styles.submitContainer}
                    onPress={handleSubmit}
                />
            </View>
        </ScreenContainer>
    );
};

SignUpScreenOne.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    auth: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    input: {
        width: 300,
        margin: 10,
    },
    submit: {
        width: 300,
    },
    submitContainer: {
        margin: 10
    },
    bottomText: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SignUpScreenOne;