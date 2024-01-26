import React, { useState, useEffect } from "react";
import { Appearance, View, StyleSheet } from "react-native";
import Swiper from 'react-native-deck-swiper';
// Constants
import { colors } from "@Junto/constants";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { Text } from "@Junto/elements";

const SwipeScreen = () => {
    const theme = Appearance.getColorScheme();
    const cuisines = [
        "American",
        "Chinese",
        "French",
        "Greek",
        "Indian",
        "Italian",
        "Japanese",
        "Korean",
        "Mexican",
        "Thai",
        "Vietnamese"
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
                    renderCard={(card) => {
                        return (
                            <View>
                                <Text style={styles.text}>{card}</Text>
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
        height: "50%"
    },
    card: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    text: {
      textAlign: "center",
      fontSize: 50
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