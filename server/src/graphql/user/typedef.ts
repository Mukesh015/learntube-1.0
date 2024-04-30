export const typeDefs = `#graphql
type creator{
    isCreator: Boolean
}
type Channellogo{
    channelLogo: String
    email: String
}
type courseName{
    courseNames: String
}

type videoUrl{
    allVideoUrls: String
    allThumbnailUrls: String
    allVideoTitles: String
    allEmail: String
    uploadAt: String
    videoId: String
    views:String
    channelLogo:String
    channelName:String
    courseFees:String
    courseId:String
}
type url{
    videoURl: String
    videoTitle:String
    videoDescription: String
    channelLogo:String
    channelName:String
    channelId:String
    creatorEmail:String
    videoViews:String
    videoPublishedAt:String
    videoTags:[String]


}

type search{
    videoTitle: String
    videoDescription: String
    videoTags: [String]
    searchHistory:[String]
}
type searchQuery{
    videoUrl: String
    courseID: String
    courseFees: String
    videoID: String
    videoDescription: String
    videoTags :[String]
    videoTitle: String
    channelName: String
    channelLogo: String
    videoPublishedAt: String
    videoViews: String
    videoThumbnail: String
}
`;