import React from "react";
import * as ImagePicker from "expo-image-picker";
// Components
import {
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
  
const ImageUpload = (props) => {

    // Props
    const {
        image,
        setImage,
        style,
        uploadedStyle,
        aspectRatio,
        UploadedComponent,
        children,
        imageQuality,
        allowsEditing=true
    } = props;

    const pickImage = async () => {
        let imageConfig = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: imageQuality,
        };
        if (aspectRatio) {
            imageConfig = {
                ...imageConfig,
                allowsEditing: allowsEditing,
                aspect: aspectRatio,
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync(imageConfig);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={[
                styles.container,
                style,
                image ? uploadedStyle : null
            ]}>
                {
                    image && UploadedComponent
                        ? UploadedComponent(image)
                        : children
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
    }
});

export default ImageUpload;

