import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@RestaurantApp/constants";

const LikenessBar = (props) => {
    const {
        show,
        like_count,
        dislike_count,
        style
    } = props;
    
    const styles = StyleSheet.create({
        bar: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            height: 5,
            backgroundColor: colors.light.SECOND,
            flexDirection: "row",
            overflow: "hidden"
        },
        like: {
            backgroundColor: colors.GREEN,
            flex: like_count,
        },
        dislike: {
            backgroundColor: colors.DISLIKE_RED,
            flex: dislike_count,
        }
    });

    return show ? (
        <View style={[styles.bar, style]}>
            <View style={styles.like} />
            <View style={styles.dislike} />
        </View>
    ): null;
};

export default LikenessBar;