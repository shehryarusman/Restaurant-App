import React from "react";
import { ScreenContainer, Header } from "@RestaurantApp/fundamentals";
import { MaterialTopTabBar } from "react-navigation-tabs";
// Constants
import { colors } from "@RestaurantApp/constants";

const ConnectionsContainer = (props) => {
    return (
        <ScreenContainer style={{ flex: 0 }}>
            <Header
                title="Connections"
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

export default ConnectionsContainer;