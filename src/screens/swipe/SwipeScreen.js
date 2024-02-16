import React, { useState } from "react";
import { Appearance, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from 'react-native-deck-swiper';
// Constants
import { colors } from "@Junto/constants";
import { capitalize } from "@Junto/utils";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { Text } from "@Junto/elements";
import { LoadingAnimation } from "@Junto/animations";
// API
import JuntoApi from "../../api/Junto";

const SwipeScreen = () => {
    const theme = Appearance.getColorScheme();
    const [cards, setCards] = useState([
        { text: "american", source: require("../../../assets/cuisine-stock-photos/american.jpeg") },
        { text: "chinese", source: require("../../../assets/cuisine-stock-photos/chinese.jpeg") },
        { text: "french", source: require("../../../assets/cuisine-stock-photos/french.jpeg") },
        { text: "greek", source: require("../../../assets/cuisine-stock-photos/greek.jpeg") },
        { text: "indian", source: require("../../../assets/cuisine-stock-photos/indian.jpeg") },
        { text: "italian", source: require("../../../assets/cuisine-stock-photos/italian.jpeg") },
        { text: "japanese", source: require("../../../assets/cuisine-stock-photos/japanese.jpeg") },
        { text: "korean", source: require("../../../assets/cuisine-stock-photos/korean.jpeg") },
        { text: "mexican", source: require("../../../assets/cuisine-stock-photos/mexican.jpeg") },
        { text: "thai", source: require("../../../assets/cuisine-stock-photos/thai.jpeg") },
        { text: "vietnamese", source: require("../../../assets/cuisine-stock-photos/vietnamese.jpeg") }
    ]);
    /* Selection levels:
        0 -> Selecting cuisines
        1 -> Selecting dishes
        2 -> Show results (no more cards)
    */
    const [selectionLevel, setSelectionLevel] = useState(0);
    const [acceptedCards, setAcceptedCards] = useState([]);
    const [results, setResults] = useState([]);
    const [expandedDish, setExpandedDish] = useState(null);
    const [loading, setLoading] = useState(false);

    const addPreferredCuisine = (card) => {
        setAcceptedCards([
            ...acceptedCards,
            card
        ]);
    };

    const onSwipedAll = async () => {
        setLoading(true);
        switch(selectionLevel){
            case 0:
                const preferredQuisines = acceptedCards.map(({ text }) => text);
                const { data: dishes } = await JuntoApi.post("/recs", { preferredQuisines });
                
                setCards(dishes.map(dish => ({ ...dish, text: dish.name })));
                setSelectionLevel(1);
                
                break;
            case 1:
                setResults(acceptedCards);
                setSelectionLevel(2);
                
            default:
                break;
        }
        setAcceptedCards([]);
        setLoading(false);
    };

    return (
        <ScreenContainer>
            <Header
                title="Meal Match"
                hideLeftIcon
            />
            <View style={styles.container}>
                {
                    !loading ? (
                            selectionLevel === 2 ? (
                                <View style={styles.resultsList}>
                                    {
                                        results.map((dish) => (
                                            <TouchableOpacity
                                                style={styles.resultsListItem}
                                                key={dish.id}
                                                onPress={() => {
                                                    setExpandedDish(expandedDish !== dish.id ? dish.id : null);
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/cuisine-stock-photos/american.jpeg")}
                                                    style={{
                                                        ...styles.resultsListItemImage,
                                                        ...((expandedDish === dish.id) ?  styles.resultsListItemExpandedImage : {})
                                                    }}
                                                ></Image>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            ) : (
                                <Swiper
                                    cards={cards}
                                    renderCard={({ text, source }) => {
                                        return (
                                            <View>
                                                <Text style={styles.text}>{capitalize(text)}</Text>
                                                <Image
                                                    source={source}
                                                    style={styles.image}
                                                ></Image>
                                            </View>
                                        )
                                    }}
                                    onSwipedRight={(index, name) => addPreferredCuisine(name)}
                                    onSwipedAll={onSwipedAll}
                                    cardIndex={0}
                                    stackSize={3}
                                    cardVerticalMargin={20}
                                    cardStyle={{...styles.card, ...themeStyles[theme].card}}
                                    backgroundColor="transparent"
                                    horizontalSwipe
                                    verticalSwipe={false}
                                >
                                </Swiper>
                            )
                    ) : (
                        <LoadingAnimation />
                    )
                }
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
    },
    resultsHeader: {
        fontSize: 30
    },
    resultsList: {
        flexDirection: "row",
        justifyContent: "center"
    },
    resultsListItem: {
        margin: 10
    },
    resultsListItemImage: {
        width: 100,
        height: 100,
        borderRadius: 15
    },
    resultsListItemExpandedImage: {
        width: 200,
        height: 200
    }
  });

const themeStyles = {
    light: StyleSheet.create({
        card: {
            backgroundColor: colors.WHITE,
            borderColor: colors.light.FIRST
        },
        resultsListItem: {
            backgroundColor: colors.WHITE,
            borderColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        card: {
            backgroundColor: colors.dark.SECOND,
            borderColor: colors.dark.FOURTH
        },
        resultsListItem: {
            backgroundColor: colors.dark.SECOND,
            borderColor: colors.dark.FOURTH
        }
    })
};

export default SwipeScreen;