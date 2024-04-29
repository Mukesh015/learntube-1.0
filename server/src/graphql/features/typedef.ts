export const typeDefs = `#graphql
type features{
    haveInPlaylist: Boolean
    hasInHistory: Boolean
    haveInMyVideos: Boolean
    haveInWatchLater: Boolean
    isLiked: Boolean
    dislikedVideos: Boolean
    subscribedchannel: Boolean
}
type playlist{
    courseID:String
    courseFees:String
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    videoThumbnail : String
}
type history{
    courseID:String
    courseFees:String
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    videoThumbnail : String
}
type watchLater{
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    videoThumbnail : String
}
type likedVideo{
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    videoThumbnail : String
}
type comments{
    comment: String
    logo: String
    timestamp: String
    users:String
}
type channelDetails{
    Name: String
    email: String
    phoneNumber: String
    Gender: String
    addressLine: String
    city: String
    state: String
    country:String
    PinCode:String
    channelName: String
    RecoveryEmail:String
    channelDescription: String
    websiteURL: String
    Facebook: String
    Instagram: String
    Twitter: String
    Github: String
    LinkedIn: String
    Discord: String
    coverPhotoURL:String
    channelLogo:String
    channelId:String
}
type yourVideo{
    videoId: String
    videoTitle: String
    viewsCount: String
    videoPublishedAt: String
    videoThumbnail:  String
}
type creatorCard{
    subscriber:String
    watchTime: String
    totalComments:String
}
`;