export const queries = `#graphql
getIsCreator(email:String):[creator]
getChannelLogo:[Channellogo]
getCourseName(email:String):[courseName]
getAllVideoUrl:[videoUrl]
getVideoUrl(email:String,videoID:String):[url]
getSearchBarDetails(email:String):[search]
getSearchQueryDetails(query:String):[searchQuery]
`;