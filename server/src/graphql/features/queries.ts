export const queries = `#graphql
getFeatures(email:String,videoID:String,channelId:String):[features]
getPlaylist( email:String ):[playlist]
getWatchLater(email:String):[watchLater]
getLikedVideos(email:String):[likedVideo]
getHistory(email:String):[history]
getComments(videoID:String):[comments]
getchannelDetails(email:String):[channelDetails]
getYourVideo(email:String):[yourVideo]
getCreatorCard(email:String):[creatorCard]
`