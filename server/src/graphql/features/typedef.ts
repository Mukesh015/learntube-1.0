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
`;