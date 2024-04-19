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
    channelLogo:String
}
`;