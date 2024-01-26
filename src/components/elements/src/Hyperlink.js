import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";
// Constants
import { colors } from "@Junto/constants";

const Hyperlink = (props) => {
    const {
        children,
        style
    } = props;

    return(
        <TouchableOpacity {...props}>
            <Text style={{...styles.hyperlink, ...style}} >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hyperlink: {
        color: colors.primary.MAIN
    }
});

export default Hyperlink;
