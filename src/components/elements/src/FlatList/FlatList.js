import React, { useState, forwardRef } from "react";
// Components
import {
    Appearance,
    StyleSheet,
    RefreshControl,
    FlatList as DefaultFlatList
} from "react-native";
import { LoadingAnimation } from "@RestaurantApp/animations";
import EmptySign from "./EmptySign";
// Constants
import { colors } from "@RestaurantApp/constants";

const FlatList = (props, ref) => {
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // State
    const [refreshing, setRefreshing] = useState(false);
    
    const {
        style,
        emptyMessage,
        loading,
        keyExtractor=(
            (item) => item.id
        ),
        RenderComponent,
        onRefresh,
        refreshable,
        ...restOfProps
    } = props;

    return (
        <DefaultFlatList
            style={[
                themeStyles[theme].list,
                style
            ]}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
                <RenderComponent
                    data={item}
                />
            )}
            refreshControl={
                refreshable ? (
                    <RefreshControl
                        tintColor={colors.primary.MAIN}
                        colors={[colors.primary.MAIN]}
                        progressBackgroundColor={darkModeEnabled ? colors.light.FOURTH : colors.WHITE}
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true);
                            await onRefresh();
                            setRefreshing(false);
                        }}
                    />
                ) : null
            }
            ListEmptyComponent={() => (
                loading ? (
                    <LoadingAnimation
                        style={styles.emptyComponent}
                    />
                ) : (
                    <EmptySign
                        style={styles.emptyComponent}
                        text={emptyMessage}
                    />
                )
            )}
            ref={ref}
            {...restOfProps}
        />
    );
};

const styles = StyleSheet.create({
    emptyComponent: {
        alignSelf: "center",
        marginTop: 35,
        marginBottom: 35
    }
});

const themeStyles = {
    light: StyleSheet.create({
        list: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        list: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default forwardRef(FlatList);