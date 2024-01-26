import React from "react";
import { StyleSheet, Appearance } from "react-native";
// Components
import { MaterialTopTabBar } from "react-navigation-tabs";
import { ScreenContainer } from "@RestaurantApp/fundamentals";
import { SearchBar } from "@RestaurantApp/bars";
// Constants
import { colors } from "@RestaurantApp/constants";

const SearchContainerScreen = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        navigation
    } = props;

    const onSearch = (searchQuery) => {
        navigation.navigate("SearchUsers", { searchQuery })
        navigation.navigate("SearchPosts", { searchQuery })
    };

    return (
        <ScreenContainer
            style={[
                styles.container,
                themeStyles[theme].container
            ]}
        >
            <SearchBar
                onSearch={onSearch}
                style={styles.searchBar}
            />
            <MaterialTopTabBar
                {...props}
                activeTintColor={colors.primary.MAIN}
                indicatorStyle={{
                    backgroundColor: colors.primary.MAIN
                }}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0
    },
    searchBar: {
        margin: 25
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default SearchContainerScreen;