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
}
type url{
    videoURl: String
    videoDescription: String
    channelLogo:String
    channelName:String
    videoViews:String
    videoPublishedAt:String
    videoTags:[String]
}
type features{
    haveInPlaylist: Boolean
}
`;