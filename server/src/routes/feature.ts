import express from 'express';
import { addToPlaylist, addSubscription, addToHistory, addToLikedVideo, addToMyVideos, addToWatchLater,makepayment } from '../controllers/feature';
const FeatureRouter = express.Router();

FeatureRouter.post("/addtoplaylist", addToPlaylist)
FeatureRouter.post("/addtosubscriptions", addSubscription)
FeatureRouter.post("/addtomyvideos", addToMyVideos)
FeatureRouter.post("/addtowatchlater", addToWatchLater)
FeatureRouter.post("/addtolikedvideos", addToLikedVideo)
FeatureRouter.post("/addtohistory", addToHistory)
FeatureRouter.post("/payment",makepayment)

export default FeatureRouter;