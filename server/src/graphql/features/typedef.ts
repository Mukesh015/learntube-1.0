export const typeDefs = `#graphql
type features{
    haveInPlaylist: Boolean
    hasInHistory: Boolean
    haveInMyVideos: Boolean
    haveInWatchLater: Boolean
    isLiked: Boolean
    dislikedVideos: Boolean
    subscribedchannel: Boolean
    totalSubscriber: String
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
    viewedAt: String
}
type watchLater{
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    courseFees:String
    courseID : String
    videoThumbnail : String
}
type likedVideo{
    videoId : String
    videoTitle : String
    videoViews : String
    videoPublishedAt : String
    channelLogo : String
    courseId:String
    courseFees:String
    videoThumbnail : String
}
type comments{
    comments: String
    count: String

    timeStamp: String
    user: String
    channelLogo: String
    channelId: String
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
    channelCreatedDate:String
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
    totalLike:String
}
type Video {
    videoUrl: String
    videoThumbnail: String
    videoId: String
    videoTitle: String
    videoViews: Int
    videoPublishedAt: String
    videoDescription :String
  }
  
  type yourCourse {
    courseId: String
    courseName: String
    courseThumbUrl: String
    courseDescription: String
    channelLogo: String
    channelName : String
    videos: [Video]
    totalNoOfVideos: Int
  }
  type subscribedChannels{
    channelId:String
    channelName:String
    channelLogo:String
  }
  type creatorCourses{
    courseId: String
    courseName: String
    courseThumb: String
    courseDescription: String
    videos: [Video]
  }

  type videoThumbnail{
    videoThumnail: String
  }
 type notifications{
    isRead: Boolean
    notificationId: String
    timeStamp: String
    videoId: String
    email: String
    message: String
    videoThumbnail: String
    corseFees: String
    courseId: String
    avatar: String
    channelLogo: String
 }
 type SocialMediaLinks {
    any: String
    Facebook: String
    Instagram: String
    Discord: String
    Github: String
    LinkedIn: String
    Twitter: String
  }
 type detailsByChanneld{
    channelId: String
    channelName: String
    channelDescription: String
    channelLogo: String
    coverPhoto: String
    link: SocialMediaLinks
    subscribers: String
    noOfVideos: String
    creatorEmail: String
  
 }
 type coursebyChannelId{
    courseId: String
    courseName: String
    courseThumb: String
    courseDescription: String
    videos: [Video]
 }
 type videoByChannelId{
    videoId: String
    videoTitle: String
    viewsCount: String
    videoPublishedAt: String
    videoThumbnail:  String
 }
 type paymentDetails{
    email: String
    courseName: String
    courseFees: String
    courseDescription: String
    courseId: String
    courseThumbnail: String
 }
`;