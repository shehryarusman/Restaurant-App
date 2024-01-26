import React from "react";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { MeetupList } from "@Junto/lists";
// Context
import { useUser } from "@Junto/user-context";
// Icons
import {
    PlusIcon,
    guestProfilePicture,
    awsBucketImage
} from "@Junto/icons";

const MeetupFeedScreen = ({ navigation }) => {
    // Context
    const { state: { user } } = useUser();

    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? awsBucketImage(user.profile_picture_bucket_key)
        : guestProfilePicture
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate("AccountView");
    };

    const onCreateMeetup = () => {
        //navigation.navigate("MeetupCreate");
        Alert.alert(
            "Coming soon",
            null,
            [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ],
            {
                cancelable: true
            }
        );
    };

    const DUMMY_MEETUPS = [
        {
            id: 1,
            title: "Bowlin' with the bois",
            members: Array(4),
            author: user,
            joined: true
        },
        {
            id: 2,
            title: "Movie night @ 8 🍿",
            description: "It's morbin' time. Be there or be square",
            location: "Race Lawn",
            members: Array(8),
            author: {
                id: 2,
                first_name: "John",
                last_name: "Doe",
            }
        },
    ];

    return (
        <ScreenContainer>
            <Header
                title="Meetups"
                hideLeftIcon={true}
                LeftIconImage={profilePictureSource}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                RightIcon={PlusIcon}
                RightIconProps={{
                    onPress: onCreateMeetup
                }}
            />
            <MeetupList
                data={[]}
                emptyMessage="No one in your network's hosting a meetup at the moment"
            />
        </ScreenContainer>
    );
};

export default MeetupFeedScreen;