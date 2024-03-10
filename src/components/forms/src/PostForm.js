import React, { useState } from "react";
// Components
import {
    StyleSheet,
    Keyboard,
    View,
    Alert
} from "react-native";
import { NavigationEvents } from "react-navigation";
import {
    TextInput,
    TouchableIcon,
    Button
} from "@Junto/elements";
import { ImageUpload } from "@Junto/single-use";
// Constants
import { colors, API_ENDPOINT } from "@Junto/constants";
// Icons
import { SendIcon } from "@Junto/icons";
// Context
import { useContent } from "@Junto/content-context";

const PostForm = (props) => {
    // Context
    const {
        createContent,
        updateContent
    } = useContent();

    // Props
    const {
        navigation,
        data,
        type,
        submitText
    } = props;
    const {
        review: passedReview,
        dish: passedDish,
        restaurant: passedRestaurant,
        images: unformatedPassedImages
    } = data;

    const passedImages = unformatedPassedImages
        ? unformatedPassedImages.map(img => `${API_ENDPOINT}/images/${img}`)
        : null

    // State
    const [review, setReview] = useState(passedReview);
    const [dish, setDish] = useState(passedDish);
    const [restaurant, setRestaurant] = useState(passedRestaurant);
    const [images, setImages] = useState(passedImages || []);
    const [loading, setLoading] = useState(false);

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            switch(type){
                case "create":
                    await createContent("post", { review, dish, restaurant, images });
                    break;
                case "edit":
                    await updateContent("post", data.id, { review, dish, restaurant, images });
                    break;
            }  
            // Clear form data
            setReview("");
            setImages([]);
            navigation.pop();
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Image events
    const onImageSelect = (image) => {
        setImages([...images, image]);
    }

    const onImageDelete = (index) => {
        setImages([
            ...images.slice(0, index),
            ...images.slice(index + 1)
        ]);
    };


    return (
        <View>
            <NavigationEvents/>
            <TextInput
                style={{...styles.formItem, ...styles.textbox}}
                placeholder="Dish Name"
                value={dish}
                onChangeText={setDish}
            />
            <TextInput
                style={{...styles.formItem, ...styles.textbox}}
                placeholder="Restaurant Name"
                value={restaurant}
                onChangeText={setRestaurant}
            />
            <TextInput
                style={{...styles.formItem, ...styles.textbox, ...styles.multiline}}
                multiline
                placeholder="Review..."
                value={review}
                onChangeText={setReview}
            />
            <ImageUpload
                style={styles.formItem}
                images={images}
                onImageSelect={onImageSelect}
                onDelete={onImageDelete}
            />
            <Button
                title={submitText}
                onPress={handleSubmit}
                loading={loading}
                style={styles.formItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formItem: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    // Text input
    textbox: {
        fontSize: 22
    },
    multiline: {
        maxHeight: 250
    },
});

PostForm.defaultProps = {
    data: {
        dish: "",
        restaurant: "",
        review: "",
        images: null
    }
};

export default PostForm;