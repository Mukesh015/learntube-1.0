export const queries = `#graphql
getIsCreator(email:String):[creator]
getChannelLogo:[Channellogo]
getCourseName(email:String):[courseName]
getAllVideoUrl:[videoUrl]
getVideoUrl(email:String,videoID:String):[url]
getFeatures(email:String,videoID:String):[features]

`;