import Constants from "expo-constants";

const { manifest } = Constants;

const generalColors = {
    // Black, Grey, & White
    WHITE: "#FFFFFF",
    LIGHT_GRAY: "#F2F2F2",
    GRAY: "#C0C0C0",
    DARK_GRAY: "#707070",
    LIGHT_BLACK: "#2b2b2b",
    BLACK: "#000000",
    // Greens
    DARKER_GREEN: "#0F8158",
    DARK_GREEN: "#4AA786",
    GREEN: "#41CA99",
    LIGHT_GREEN: "#80DCBB",
    LIGHTER_GREEN: "#BEEADA",
    // Blues
    BLUE_1: "#A9D6E5",
    BLUE_2: "#89C2D9",
    BLUE_3: "#61A5C2",
    BLUE_4: "#468FAF",
    BLUE_5: "#2C7DA0",
    BLUE_6: "#2A6F97",
    BLUE_7: "#014F86",
    BLUE_8: "#01497C",
    BLUE_9: "#013A63",
    BLUE_10: "#012A4A",
    // Reds
    DISLIKE_RED: "#CA5A41",
};

const themeColors = {
    light: {
        FIRST: generalColors.LIGHT_GRAY,
        SECOND: generalColors.GRAY,
        THIRD: generalColors.DARK_GRAY,
        FOURTH: generalColors.LIGHT_BLACK,
        RED: "#E86245"
    },
    dark: {
        FIRST: "#363636",
        SECOND: "#222222",
        THIRD: "#1B1B1B",
        FOURTH: "#151515",
        RED: "#CA7664"
    }
};

const primaryColors = {
    DARKER: generalColors.BLUE_10,
    DARK: generalColors.BLUE_9,
    MAIN: generalColors.BLUE_5,
    LIGHT: generalColors.BLUE_2,
    LIGHTER: generalColors.BLUE_1
};

const constants = {
    colors: {
        light: themeColors.light,
        dark: themeColors.dark,
        primary: primaryColors,
        ...generalColors
    },
    sizes: {
        HEADER_ICON_SIZE: 35,
        // Width & height for like, dislike, comment, and share icons
        ACTION_ICON: 27.5,
        ACTION_ICON_SMALL: 25,
        ACTION_ICON_SMALLER: 22.5,
        // Width & height for icons in the more options menu
        OPTIONS_ICON: 20,
        // Icons for bottom tab bar
        TAB_ICON: 35,
    },
    API_ENDPOINT: (__DEV__
        ? `http://${manifest.debuggerHost.split(':').shift()}:80`
        : "http://restaurant-app-api.eba-rfa5cpjs.us-east-1.elasticbeanstalk.com"
    )
};

console.log(`API Endpoint: ${constants.API_ENDPOINT}`);

module.exports = constants;