import React from "react";
// Components
import { ScreenContainer, Header } from "@Junto/fundamentals";
import { MeetupList } from "@Junto/lists";

const SwipeScreen = () => {
    return (
        <ScreenContainer>
            <Header
                title="Meal Match"
                hideLeftIcon
            />
            <MeetupList
                data={[]}
                emptyMessage="No one in your network's hosting a meetup at the moment"
            />
        </ScreenContainer>
    );
};

export default SwipeScreen;