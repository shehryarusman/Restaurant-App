import React, { useState } from "react";
// Componenets
import {
    Appearance,
    FlatList,
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Text, ImageSelect } from "@RestaurantApp/elements";
// Constants
import { colors } from "@RestaurantApp/constants";
// Icons
import { PlusIcon, CloseIcon } from "@RestaurantApp/icons";

const ImageUpload = (props) => {
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark";

    // Props
    const {
        style,
        images,
        onImageSelect,
        onDelete
    } = props;

    return (
        <View style={[style, styles.container]}>
            <FlatList
                data={images.length < 10 ? [...images, null] : images}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index }) => (
                    <ImageSelect
                        style={[
                            styles.imageUpload,
                            themeStyles[theme].imageUpload
                        ]}
                        uploadedStyle={styles.imageUploaded}
                        UploadedComponent={(img) => (
                            <ImageBackground
                                source={{ uri: img }}
                                style={styles.image}
                            >
                                <TouchableOpacity onPress={() => {
                                    onDelete(index)
                                }}>
                                    <View style={styles.close}>
                                        <CloseIcon
                                            width={15}
                                            height={15}
                                            color={colors.WHITE}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        )}
                        image={images[index]}
                        allowsEditing={false}
                        setImage={onImageSelect}
                        onDelete={() => onDelete(index)}
                    >
                        <View style={styles.placeholder}>
                            <PlusIcon
                                color={darkModeEnabled ? colors.light.SECOND : colors.dark.SECOND}
                            />
                            <Text style={styles.placeholderText}>
                                Add an image
                            </Text>
                        </View>
                    </ImageSelect>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    // Image upload
    imageUpload: {
        height: 100,
        borderRadius: 15,
    },
    imageUploaded: {
        height: 300,
        marginBottom: 25,
        borderWidth: 0,
        borderRadius: 5
    },
    // Placeholder
    placeholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        marginTop: 5
    },
    // Image upload
    image: {
        flex: 1
    },
    close: {
        alignSelf: "flex-end",
        marginTop: 15,
        marginRight: 15,
        opacity: 0.5,
        backgroundColor: colors.LIGHT_BLACK,
        padding: 10,
        borderRadius: 25,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        imageUpload: {
            backgroundColor: colors.light.FIRST,
        }
    }),
    dark: StyleSheet.create({
        imageUpload: {
            backgroundColor: colors.dark.FIRST,
        }
    })
};

export default ImageUpload;
