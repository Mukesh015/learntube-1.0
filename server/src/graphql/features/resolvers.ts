import { VideoModel, VideoDocument } from "../../models/video";
import { UserModel, UserDocument } from "../../models/user";


const queries = {
    getFeatures: async (_: any, { email, videoID,channelId }: { email: string, videoID: string,channelId:string }) => {
        const user: UserDocument | null = await UserModel.findOne({ email });
        if (!user) {
            return "USer not found";
        }
        const playlist = user.features?.playlists || [];
        const hasValuePlayList = playlist.includes(videoID);


        const history = user.features?.history || [];
        const hasValueHistory = history.includes(videoID);

        const myVideos = user.features?.myVideos || [];
        const hasValueMyVideos = myVideos.includes(videoID);


        const watchLater = user.features?.watchLater || [];
        const hasValueWatchLater = watchLater.includes(videoID);

        const likedVideos = user.features?.likedVideos || [];
        const hasValueLikedVideos = likedVideos.includes(videoID);

        const dislikedVideos = user.features?.disLikedVideo || [];
        const hasValueDislikedVideos = dislikedVideos.includes(videoID);

        const subsCribed=user.subscribedChnannels?.channelId || [];
        const hasValueSubscribed=subsCribed.includes(channelId);


        return [{
            haveInPlaylist: hasValuePlayList, hasInHistory: hasValueHistory,haveInMyVideos: hasValueMyVideos, 
            haveInWatchLater: hasValueWatchLater, isLiked: hasValueLikedVideos,  dislikedVideos: hasValueDislikedVideos,
            subscribedchannel:hasValueSubscribed
        }];
    },
}
export const resolvers = { queries };