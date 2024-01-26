import React from "react";
// Components
import { TouchableWithoutFeedback } from "react-native";
import { TouchableIcon } from "@RestaurantApp/elements";
// Icons
import { CreateIcon } from "@RestaurantApp/icons";
// Navigation
import { navigate } from "@RestaurantApp/navigation-ref";
// Constants
import { colors } from "@RestaurantApp/constants";

const CreateButton = (props) => {
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
            color={colors.primary.MAIN}
        />
    );
};

export default CreateButton;