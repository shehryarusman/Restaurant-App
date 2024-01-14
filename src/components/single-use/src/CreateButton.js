import React from "react";
// Components
import { TouchableWithoutFeedback } from "react-native";
import { TouchableIcon } from "@RestaurantApp/elements";
// Icons
import { CreateIcon } from "@RestaurantApp/icons";
// Context
import { useSettings } from "@RestaurantApp/settings-context";
// Navigation
import { navigate } from "@RestaurantApp/navigation-ref";

const CreateButton = (props) => {
    // Context
    const {
        state: {
            primaryColors
        }
    } = useSettings();

    // Props
    const {
        style,
    } = props;

    const onPress = () => {
        navigate("PostCreate");
    };

    return (
        <TouchableIcon
            Icon={CreateIcon}
            TouchableComponent={TouchableWithoutFeedback}
            onPress={onPress}
            size={75}
            style={style}
            color={primaryColors.MAIN}
        />
    );
};

export default CreateButton;