"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";



const searchQuery = gql`
query searchQuery( $query: String){
    getSearchQueryDetails(query: $query) {
        videoDescription
        videoID
        videoTags
        videoUrl
        videoTitle
        videoPublishedAt
        videoThumbnail
        videoViews
        channelName
        channelLogo
      }
}`;
interface Props {
    params: {
        query: string;
    };
}
const SerachResult: React.FC<Props> = ({ params }) => {


    const [searQuery, setSearchQuery] = useState<any[]>([]);


    const query: any = decodeURIComponent(params.query)

    const { loading, error, data } = useQuery(searchQuery, {
        variables: { query: query },
    });


    console.log(searQuery)

    useEffect(() => {
        if (data) {
            setSearchQuery(data.getSearchQueryDetails);
            console.log(data.getSearchQueryDetails)

        }
    }, [setSearchQuery, data]);
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="mt-28 ml-72 ">
                <h1 className="mb-10 text-medium">Based on your search</h1>
                {/* Map over searchResults instead of searchQuery */}
                {searQuery.map((video, index) => (
                    <div key={index} className="flex cursor-pointer mb-10">
                        {/* Thumbnail */}
                        <img
                            height={250}
                            width={350}
                            className="rounded-lg"
                            src={video.videoThumbnail}
                            alt=""
                        />
                        <div className="ml-6">
                            {/* Video title */}
                            <p className="text-xl">{video.videoTitle}</p>
                            {/* details */}
                            <p className="text-sm text-gray-600 mt-3">
                                {video.videoViews} views - 9 months ago
                            </p>
                            <div className="mt-5 flex">
                                {/* channel info */}
                                <img
                                    className="h-8 rounded-full"
                                    src={video.channelLogo}
                                    alt=""
                                />
                                <p className="font-semibold ml-3">{video.channelName}</p>
                            </div>
                            {/* video description */}
                            <p className="text-sm text-gray-600">{video.videoDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SerachResult;