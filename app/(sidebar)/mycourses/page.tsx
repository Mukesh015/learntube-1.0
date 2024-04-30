"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Tooltip } from "@nextui-org/react";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";

const yourCourses = gql`
  query yourCourses($email: String) {
    getYourCourse(email: $email) {
      courseDescription
      courseId
      courseName
      courseThumbUrl
      totalNoOfVideos
      videos {
        videoId
        videoPublishedAt
        videoThumbnail
        videoTitle
        videoUrl
        videoViews
      }
    }
  }
`;

const MyCourses: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [coursesDetails, setCoursesDetails] = useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [user] = useAuthState(auth);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleShowDropdown = (courseId: string) => {
        setSelectedCourseId(courseId);
        setShowDropdown(!showDropdown);
    };

    const { loading, error, data } = useQuery(yourCourses, {
        variables: { email: email },
    });

    const formatTime = (timestampString: string) => {
        // Convert the string timestamp to a number
        const timestamp = parseInt(timestampString, 10);

        // Check if the converted timestamp is a valid number
        if (isNaN(timestamp)) {
            return "Invalid timestamp";
        }

        const currentDate = new Date();
        const publishedDate = new Date(timestamp);
        const diffInMs = currentDate.getTime() - publishedDate.getTime();
        const diffInSec = Math.floor(diffInMs / 1000);

        // Handle case where timestamp is in the future
        if (diffInSec < 0) {
            return "Future timestamp";
        }

        // Convert timestamp to readable format
        if (diffInSec < 60) {
            return `${diffInSec} seconds ago`;
        } else if (diffInSec < 3600) {
            return `${Math.floor(diffInSec / 60)} minutes ago`;
        } else if (diffInSec < 86400) {
            return `${Math.floor(diffInSec / 3600)} hours ago`;
        } else {
            return `${Math.floor(diffInSec / 86400)} days ago`;
        }
    };

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setCoursesDetails(data.getYourCourse);
        }
    }, [data, email, user]);

    return (
        <>
            <Navbar />
            <Sidebar />
            <nav className="mt-24 mr-20">
                <ul className="flex flex-row-reverse gap-10">
                    <Tooltip color="warning" delay={700} showArrow={true} content="Filter playlist">
                        <li className="flex ext-blue-500 text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            <svg
                                className="mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#2e4bc9"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                            </svg>
                            Filter
                        </li>
                    </Tooltip>
                    <Tooltip color="warning" delay={700} showArrow={true} content="Manage your playlist">
                        <li className="text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            Manage
                        </li>
                    </Tooltip>
                    <li className="text-3xl font-bold text-amber-600" style={{ marginRight: "560px" }}>
                        Your purchased playlist
                    </li>
                </ul>
            </nav>
            <div className="ml-80 ">
                {coursesDetails.map((course) => (
                    <Tooltip key={course.courseId} color="warning" delay={700} showArrow={true} content="Click to show playlist">
                        <div
                            onClick={() => handleShowDropdown(course.courseId)}
                            id="description-container"
                            className="cursor-pointer"
                            style={{ marginTop: "40px" }}
                        >
                            <div>
                                <div id="video-content" className="flex mb-10">
                                    {/* Video thumbnail */}
                                    <img
                                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                        height={200}
                                        width={200}
                                        src={course.courseThumbUrl}
                                        alt=""
                                    />
                                    <div className="flex mt-10 ml-5 justify-center mr-10">
                                        <div>
                                            {/* Profile picture */}
                                            <img
                                                height={30}
                                                width={30}
                                                className="rounded-full m-1"
                                                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            {/* Course title */}
                                            <h1 className="">{course.courseName}</h1>
                                            <p className="text-gray-500">
                                                {course.totalNoOfVideos} videos - {/* Course description */}
                                                {course.courseDescription}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Show videos only if dropdown is open and for the selected course */}
                                {showDropdown && selectedCourseId === course.courseId && (
                                    <div className="ml-20 mb-10">
                                        {course.videos.map((video: any) => (
                                            <div className="flex mb-10" key={video.videoId}>
                                                {/* Video thumbnail */}
                                                <img
                                                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                                    height={200}
                                                    width={200}
                                                    src={video.videoThumbnail}
                                                    alt=""
                                                />
                                                <div className="flex mt-10 ml-5 justify-center mr-10">
                                                    <div>
                                                        {/* Profile picture */}
                                                        <img
                                                            height={30}
                                                            width={30}
                                                            className="rounded-full m-1"
                                                            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        {/* Video title */}
                                                        <h1 className="">{video.videoTitle}</h1>
                                                        <p className="text-gray-500">
                                                            {video.videoViews} views - {/* Video description */}
                                                            {formatTime(video.videoPublishedAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </>
    );
};

export default MyCourses;
