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
    const { state: { user }, verifyCode } = useUser();
    // Form feilds
    const [verificationCode, setVerificationCode] = useState("");
    // Status states
    const [loading, setLoading] = useState(false);

    // Event Handlers
    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            setLoading(true);
            Keyboard.dismiss();
            await verifyCode({ email, verificationCode });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if (formSuccess) {
                if(user.username){
                    navigation.navigate("ResolveAuth");
                }
                else{
                    navigation.navigate("SignUp", { email });
                }
            }
        }
    }

    return (
        <ScreenContainer>
            <View style={styles.auth}>
                <Text style={styles.header}>Verification Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Code"
                    onChangeText={setVerificationCode}
                    autoCorrect={false}
                />
                <Button
                    title="Continue"
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