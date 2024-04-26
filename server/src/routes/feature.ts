import express from 'express';
import { addToPlaylist, addSubscription, addToHistory, addToLikedVideo, addToMyVideos, addToWatchLater,addToDislikedVideo,addSearchHistory,
    removeSearchHistory } from '../controllers/feature';
const FeatureRouter = express.Router();

FeatureRouter.post("/addtoplaylist", addToPlaylist)
FeatureRouter.post("/addtosubscriptions", addSubscription)
FeatureRouter.post("/addtomyvideos", addToMyVideos)
FeatureRouter.post("/addtowatchlater", addToWatchLater)
FeatureRouter.post("/addtolikedvideos", addToLikedVideo)
FeatureRouter.post("/addtohistory", addToHistory)
FeatureRouter.post("/addtodislikevideo",addToDislikedVideo)
FeatureRouter.post("/addtosearchhistory",addSearchHistory)
FeatureRouter.post("/removefromsearchHistory",removeSearchHistory)


export default FeatureRouter;