import React from "react";
import { View, Image, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Button, Text } from "@Junto/elements";
import { LinearGradient } from "expo-linear-gradient";
// Constants
import { colors } from "@Junto/constants";

const WelcomeScreen = ({ navigation }) => {
    // Event Handlers
    const handleRefSignIn = () => {
        navigation.navigate("SignIn")
    };
    const handleRefSignUp = () => {
        navigation.navigate("SignUp")
    };

    return (  
        <LinearGradient
            colors={["#3799B8", "#6541CA"]}
            style={styles.container}
        >
            <StatusBar backgroundColor="#3799B8" barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/logo-white.png")}
                        style={styles.logo}
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Junto</Text>
                        <Text style={styles.subTitle}>Let Them Cook</Text>
                    </View>
                </View>
                <View style={styles.authOptions}>
                    <Button
                        title="Get in loser"
                        color="white"
                        textColor="#6541CA"
                        type="primary"
                        buttonStyle={styles.primary}
                        titleStyle={styles.primaryText}
                        onPress={handleRefSignIn}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
    logo: {
        width: 82,
        height: 91,
        marginRight: 15
    },
    text: {
        flexDirection: "column"
    },
    title: {
        color: "white",
        fontSize: 42,
        fontFamily: "Nunito-Bold"
    },
    subTitle: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 18,
        fontFamily: "Nunito",
    },
    // Authentication Options
    authOptions: {
        marginBottom: 50
    },
    primary: {
        width: 300,
        marginBottom: 25
    },
    primaryText: {
        color: colors.primary.MAIN,
    },
    secondary: {
        width: 300
    },
});

export default WelcomeScreen;