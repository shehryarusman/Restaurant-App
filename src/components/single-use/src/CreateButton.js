import React from "react";
// Components
import { TouchableWithoutFeedback } from "react-native";
import { TouchableIcon } from "@Junto/elements";
// Icons
import { CreateIcon } from "@Junto/icons";
// Navigation
import { navigate } from "@Junto/navigation-ref";
// Constants
import { colors } from "@Junto/constants";

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