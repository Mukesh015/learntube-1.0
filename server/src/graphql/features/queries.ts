export const queries = `#graphql
getFeatures(email:String,videoID:String,channelId:String):[features]
getPlaylist( email:String ):[playlist]
getWatchLater(email:String):[watchLater]
getLikedVideos(email:String):[likedVideo]
`