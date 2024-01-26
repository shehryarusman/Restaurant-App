import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
// Screens
import PostFeedScreen from "../../screens/post/PostFeedScreen";
import SwipeScreen from "../../screens/swipe/SwipeScreen";
import AccountViewScreen from "../../screens/account/AccountViewScreen"
// Navigators
import searchNavigator from "./searchNavigator";
// Icons
import { CardsIcon, HomeIcon, SearchIcon, PersonIcon } from "@Junto/icons";
// Constants
import { colors, sizes } from "@Junto/constants";


const IconRender = ({ Icon, focused, tintColor }) => {

    return (
        <Icon
            color={focused ? colors.primary.MAIN : tintColor}
            height={sizes.TAB_ICON}
            width={sizes.TAB_ICON*2}
        />
    );
};



const screens = {
    Feed: {
        screen: PostFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                    <IconRender
                        Icon={HomeIcon}
                        focused={focused}
                        tintColor={tintColor}
                    />
                ))
        }
    },
    Search: {
        screen: searchNavigator,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={SearchIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    },
    Swipe: {
        screen: SwipeScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={CardsIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    },
	Account: {
        screen: AccountViewScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={PersonIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    }
};

// This navigator organizes the bottom tab bar
const tabNavigator = createBottomTabNavigator(screens, {
    tabBarOptions: {
        showLabel: false,
        style: {
            height: 60
        }
    },
    initialRouteName: "Feed"
});

export default tabNavigator;
