import React from "react";
import { View, } from "react-native";
import { TouchableIcon } from "@Junto/elements";
import OptionsMenu from "react-native-option-menu";
// Navigation
import { navigate } from "@Junto/navigation-ref";
// Helper functions
import { confirmAlert } from "@Junto/helpers";
// Contexts
import { useUser } from "@Junto/user-context";
import { useContent } from "@Junto/content-context";
// Icons
import { MoreOptionsIcon } from "@Junto/icons";

// Constants
import {
    colors,
    sizes
} from "@Junto/constants";

const MoreOptions = (props) => {
    const { state: { user } } = useUser();
    const { deleteContent } = useContent();
    const {
        content,
        onDelete
    } = props;
    const contentType = !content.parent_id ? "Post" : "Comment";

    // Default functions for edit button
    const onEdit = () => {
        navigate(`${contentType}Edit`, {
            data: content
        });
    };
    
    // Show delete confirmation, and delete if confirmed
    const onDeletePrompt = async () => {
        confirmAlert(
            {
                title: `Are you sure you want to delete this ${contentType.toLowerCase()}?`
            }, async () => {
                await deleteContent(contentType, content.id);
                onDelete();
            }
        );
    };

    // More options menu items
    const options = [
        // Only show these options if it's your own content
        ...(content.author.id === user.id ? [
            {
                label: "Edit",
                onSelect: onEdit,
            },
            {
                label: "Delete",
                onSelect: onDeletePrompt,
            }
        ]: []),
        // The rest of the options go below
        {
            label: "Cancel",
        }
    ];

    const optionLabels = options.map(option => option.label);
    const optionHandlers = options.map(option => option.onSelect);

    const MoreIcon = (
        <TouchableIcon
            Icon={MoreOptionsIcon}
            size={sizes.ACTION_ICON_SMALLER}
            TouchableComponent={View}
        />
    );

    return (
        options.length > 1 ? (
            <OptionsMenu
                customButton={MoreIcon}
                destructiveIndex={optionLabels.indexOf("Delete")}
                options={optionLabels}
                actions={optionHandlers}
            />
        ) : MoreIcon
    );
};

export default MoreOptions;
