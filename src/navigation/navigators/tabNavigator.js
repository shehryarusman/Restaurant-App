import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
// Screens
import PostFeedScreen from "../../screens/post/PostFeedScreen";
import MeetupFeedScreen from "../../screens/meetup/MeetupFeedScreen";
import AccountViewScreen from "../../screens/account/AccountViewScreen"
// Navigators
import searchNavigator from "./searchNavigator";
// Icons
import { MeetupIcon, HomeIcon, SearchIcon, GearIcon, guestProfilePicture,
    awsBucketImage } from "@RestaurantApp/icons";
// Constants
import { sizes } from "@RestaurantApp/constants";
import { useSettings } from "@RestaurantApp/settings-context";
import { useUser } from "@RestaurantApp/user-context";


const IconRender = ({ Icon, focused, tintColor }) => {
	
	const { state: { primaryColors } } = useSettings();

    return (
        <Icon
            color={focused ? primaryColors.MAIN : tintColor}
            height={sizes.TAB_ICON}
            width={sizes.TAB_ICON*2}
        />
    );
};



const screens = {
    MeetupFeed: {
        screen: MeetupFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={MeetupIcon}
                    tintColor={tintColor}
                    focused={focused}
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
	Account: {
        screen: AccountViewScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={GearIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    }
};

// This navigator organizes the bottom tab bar
const tabNavigator = (hideFeed) => createBottomTabNavigator(hideFeed ? screens : {
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
    ...screens
}, {
    tabBarOptions: {
        showLabel: false,
        style: {
            height: 60
        }
    },
    initialRouteName: "MeetupFeed"
});

export default tabNavigator;
