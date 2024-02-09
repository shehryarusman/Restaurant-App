import React, { useState } from "react";
import { Appearance, View, Image, StyleSheet } from "react-native";
import Swiper from 'react-native-deck-swiper';
// Constants
import { colors } from "@Junto/constants";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { Text } from "@Junto/elements";

const SwipeScreen = () => {
    const theme = Appearance.getColorScheme();
    const cuisines = [
        { name: "American", source: require("../../../assets/quisine-stock-photos/american.jpeg") },
        { name: "Chinese", source: require("../../../assets/quisine-stock-photos/chinese.jpeg") },
        { name: "French", source: require("../../../assets/quisine-stock-photos/french.jpeg") },
        { name: "Greek", source: require("../../../assets/quisine-stock-photos/greek.jpeg") },
        { name: "Indian", source: require("../../../assets/quisine-stock-photos/indian.jpeg") },
        { name: "Italian", source: require("../../../assets/quisine-stock-photos/italian.jpeg") },
        { name: "Japanese", source: require("../../../assets/quisine-stock-photos/japanese.jpeg") },
        { name: "Korean", source: require("../../../assets/quisine-stock-photos/korean.jpeg") },
        { name: "Mexican", source: require("../../../assets/quisine-stock-photos/mexican.jpeg") },
        { name: "Thai", source: require("../../../assets/quisine-stock-photos/thai.jpeg") },
        { name: "Vietnamese", source: require("../../../assets/quisine-stock-photos/vietnamese.jpeg") }
    ];
    const [preferredQuisines, setPreferredQuisines] = useState([]);

    const addPreferredCuisine = (cuisine) => {
        setPreferredQuisines([
            ...preferredQuisines,
            cuisine
        ]);
    };

    const getReccomendedRestaurants = () => {
        console.log("Getting reccomended restaurants for");
        console.log(preferredQuisines.join(", "));
    };

    return (
        <ScreenContainer>
            <Header
                title="Meal Match"
                hideLeftIcon
            />
            <View style={styles.container}>
                <Swiper
                    cards={cuisines}
                    renderCard={({ name, source }) => {
                        return (
                            <View>
                                <Text style={styles.text}>{name}</Text>
                                <Image
                                    source={source}
                                    style={styles.image}
                                ></Image>
                            </View>
                        )
                    }}
                    onSwipedRight={(index, name) => addPreferredCuisine(name)}
                    onSwipedAll={getReccomendedRestaurants}
                    cardIndex={0}
                    stackSize={3}
                    cardVerticalMargin={20}
                    cardStyle={{...styles.card, ...themeStyles[theme].card}}
                    backgroundColor="transparent"
                    horizontalSwipe
                    verticalSwipe={false}
                >
                </Swiper>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 15,
        borderWidth: 2,
        alignItems: "center",
        backgroundColor: "green",
        height: "90%",
        overflow: "hidden"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      margin: 15
    },
    image: {
        flex: 1
    }
  });

const themeStyles = {
    light: StyleSheet.create({
        card: {
            backgroundColor: colors.WHITE,
            borderColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        card: {
            backgroundColor: colors.dark.SECOND,
            borderColor: colors.dark.FOURTH
        }
    })
};

export default SwipeScreen;