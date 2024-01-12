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
} from "@froyo/elements";
import { ScreenContainer } from "@froyo/fundamentals";
// Context
import { useUser } from "@froyo/user-context";

const SignUpScreenOne = ({ navigation }) => {
    const { continueSignUp } = useUser();
    // Form feilds
    const [email, setEmail] = useState("");
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
            await continueSignUp({ email, username, dob });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if (formSuccess) {
                navigation.navigate("SignUpTwo", { email, username, dob });
            }
        }
    }
    
    const handleRefSignIn = () => {
        navigation.navigate("SignIn")
    };

    return (
        <ScreenContainer>
            <View style={styles.auth}>
                <Text style={styles.header}>Sign up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    title="Continue"
                    type="primary"
                    loading={loading}
                    buttonStyle={styles.submit}
                    containerStyle={styles.submitContainer}
                    onPress={handleSubmit}
                />
                <View style={styles.bottomText}>
                    <Text>Already have an account?</Text>
                    <Hyperlink
                        style={{color: "#41CA99"}}
                        onPress={handleRefSignIn}
                    >
                        Sign in
                    </Hyperlink>
                </View>
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

