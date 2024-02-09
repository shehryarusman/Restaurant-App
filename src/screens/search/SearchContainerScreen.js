import React from "react";
import { StyleSheet, Appearance } from "react-native";
// Components
// import { MaterialTopTabBar } from "react-navigation-tabs";
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { SearchBar } from "@Junto/bars";
// Constants
// import { colors } from "@Junto/constants";

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
                styles.container
            ]}
        >
            <Header
                title="Search"
                hideLeftIcon
            />
            <SearchBar
                onSearch={onSearch}
                style={styles.searchBar}
            />
            {/* <MaterialTopTabBar
                {...props}
                activeTintColor={colors.primary.MAIN}
                indicatorStyle={{
                    backgroundColor: colors.primary.MAIN
                }}
            /> */}
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

export default SearchContainerScreen;