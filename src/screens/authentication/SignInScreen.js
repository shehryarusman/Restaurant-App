import React, { useState } from "react";
// Components
import {
    View,
    StyleSheet,
    Keyboard,
    Alert
} from "react-native";
import {
    Button,
    Text,
    TextInput,
    Hyperlink
} from "@Junto/elements";
import { ScreenContainer } from "@Junto/fundamentals";
// Context
import { useUser } from "@Junto/user-context";

const SignInScreen = ({ navigation }) => {
    const { signIn } = useUser();
    // Sign in feilds
    const [email, setEmail] = useState("");
    // Status states
    const [loading, setLoading] = useState(false);

    // Event handlers
    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            Keyboard.dismiss()
            setLoading(true);
            await signIn({ email });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if(formSuccess) {
                navigation.navigate("VerifyCode", { email });
            }
        }
    };

    return (
        <ScreenContainer>
            <View style={styles.form}>
                <Text style={styles.header}>Sign in</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <Button
                    title="Continue"
                    type="primary"
                    loading={loading}
                    buttonStyle={styles.submit}
                    onPress={handleSubmit}
                />
                <Text>(If an account doesn't exist we'll make one)</Text>
            </View>
        </ScreenContainer>
    );
};

SignInScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    form: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginBottom: 200
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    // Form elements
    input: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    forgotPassword: {
        marginBottom: 5,
    },
    submit: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    // Bottom text
    bottomText: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    linkLabel: {
        fontSize: 18
    }
});

export default SignInScreen;

