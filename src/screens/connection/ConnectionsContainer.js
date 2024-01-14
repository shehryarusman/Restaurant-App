import React from "react";
import { ScreenContainer, Header } from "@RestaurantApp/fundamentals";
import { MaterialTopTabBar } from "react-navigation-tabs";
// Context
import { useSettings } from "@RestaurantApp/settings-context";

const ConnectionsContainer = (props) => {
    const { state: { primaryColors } } = useSettings();

    return (
        <ScreenContainer style={{ flex: 0 }}>
            <Header
                title="Connections"
            />
            <MaterialTopTabBar
                {...props}
                activeTintColor={primaryColors.MAIN}
                indicatorStyle={{
                    backgroundColor: primaryColors.MAIN
                }}
            />
        </ScreenContainer>
    );
};

export default ConnectionsContainer;