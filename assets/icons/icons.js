import { API_ENDPOINT } from "@RestaurantApp/constants";
import RestaurantAppIcon from "./RestaurantApp.svg";
import PlusIcon from "./Plus.svg";
import GearIcon from "./Gear.svg";
import UploadIcon from "./Upload.svg";
import NoWifiIcon from "./NoWifi.svg";
import MeetupIcon from "./Meetup.svg";
import HomeIcon from "./Home.svg";
import SearchIcon from "./Search.svg";
import CloseIcon from "./Close.svg";
import CreateIcon from "./Create.svg";
import LocationIcon from "./Location.svg";
import MoreOptionsIcon from "./MoreOptions.svg";
import LikeIconFill from "./Like-Fill.svg";
import DislikeIconFill from "./Dislike-Fill.svg";
import LikeIconOutline from "./Like-Outline.svg";
import DislikeIconOutline from "./Dislike-Outline.svg";
import CommentIcon from "./Comment.svg";
import ReplyIcon from "./Reply.svg";
import BackIcon from "./Back.svg";
import SendIcon from "./Send.svg";
import PlusCircleIcon from "./Plus-Circle.svg";
import CloseCircleIcon from "./CloseCircle.svg";
import LoadingIcon from "./animation/Loading.svg";

module.exports = {
    RestaurantAppIcon,
    PlusIcon,
    GearIcon,
    UploadIcon,
    NoWifiIcon,
    MeetupIcon,
    HomeIcon,
    SearchIcon,
    CloseIcon,
    CreateIcon,
    LocationIcon,
    MoreOptionsIcon,
    LikeIconFill,
    DislikeIconFill,
    LikeIconOutline,
    DislikeIconOutline,
    CommentIcon,
    ReplyIcon,
    BackIcon,
    SendIcon,
    PlusCircleIcon,
    CloseCircleIcon,
    LoadingIcon,
    guestProfilePicture: require("./defaults/guest/guest-mint.png"),
    groupProfilePicture: require("./defaults/group/group-mint.png"),
    awsBucketImage: (key) => {
        return {
            uri: `${API_ENDPOINT}/images/${key}`
        };
    }
};