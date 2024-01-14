import React from "react";
// Components
import {
    StyleSheet,
    Appearance,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { Text, TouchableIcon } from "@RestaurantApp/elements";
// Context
import { useSettings } from "@RestaurantApp/settings-context";
import { useUser } from "@RestaurantApp/user-context";
// Icons
import {
    PlusCircleIcon,
    CloseCircleIcon,
    guestProfilePicture,
    awsBucketImage
} from "@RestaurantApp/icons";
// Constants
import { colors } from "@RestaurantApp/constants";
// Navigation
import { navigate } from "@RestaurantApp/navigation-ref";

const UserPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Context
    const { state: { flavor } } = useSettings();
    const { state: { user: signedInUser } } = useUser();

    // Props
    const {
        user,
        style,
        selectable,
        selected,
        onToggleUser
    } = props;

    // User info
    const {
        id,
        first_name,
        last_name,
        profile_picture_bucket_key
    } = user;
    
    // Conditional rendering
    const profilePictureSource = (
        profile_picture_bucket_key
        ? awsBucketImage(profile_picture_bucket_key)
        : guestProfilePicture(flavor)
    );

    // Event handlers
    const onPress = () => {
        navigate("AccountView", { user });
    };

    const onToggleSelection = () => {
        onToggleUser(id);
    };

    return (
        <View
            style={[
                styles.container,
                themeStyles[theme].container,
                style
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <Text>
                    <Image
                        source={profilePictureSource}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.name}>
                        {first_name} {last_name}
                    </Text>
                </Text>
            </TouchableOpacity>
            <View style={styles.action}>
                {
                    (selectable && id !== signedInUser.id) && (
                        <View>
                            {
                                !selected ? (
                                    <TouchableIcon
                                        Icon={PlusCircleIcon}
                                        color={colors.GREEN}
                                        onPress={onToggleSelection}
                                        size={30}
                                    />
                                ) : (
                                    <TouchableIcon
                                        Icon={CloseCircleIcon}
                                        color={colors.DISLIKE_RED}
                                        onPress={onToggleSelection}
                                        size={30}
                                    />
                                )
                            }
                        </View>
                    )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    name: {
        marginLeft: 10,
        fontSize: 20
    },
    action: {
        flexDirection: "row",
        alignItems: "center"
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST,
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

export default UserPreview;