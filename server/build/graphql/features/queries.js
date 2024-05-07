"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
getFeatures(email:String,videoID:String,channelId:String):[features]
getPlaylist( email:String ):[playlist]
getWatchLater(email:String):[watchLater]
getLikedVideos(email:String):[likedVideo]
getHistory(email:String):[history]
getComments(videoID:String):[comments]
getchannelDetails(email:String):[channelDetails]
getYourVideo(email:String):[yourVideo]
getCreatorCard(email:String):[creatorCard]
getYourCourse(email:String):[yourCourse]
getSubscribedChannels(email:String):[subscribedChannels]
getCreatorCourses(email:String):[creatorCourses]
getvideoThumbnail(videoId:String):[videoThumbnail]
getNotifications(email:String):[notifications]
getdetailsByChanneld(channelId:String):[detailsByChanneld]
getCoursesbyChannelID(channelId:String):[coursebyChannelId]
getvideoByChannelId(channelId:String):[videoByChannelId]

`;
