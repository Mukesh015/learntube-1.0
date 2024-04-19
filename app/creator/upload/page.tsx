"use client"
import { getDownloadLink, uploadVideo } from "@/configurations/firebase/config";
import React, { useCallback, useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { useQuery, gql } from '@apollo/client';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
import { toast, ToastContainer } from "react-toastify";


const GET_COURSENAME = gql`
query Exam($email:String){
    getCourseName(email:$email) {
      courseNames
    } 
  }
`

const VideoUploadForm: React.FC = () => {

    const [isExistingCourse, setIsExistingCourse] = useState<boolean>(false);
    const [isPaidCourse, setIsPaidCourse] = useState<boolean>(false);
    const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [value, setValue] = React.useState(0);
    const [courseThumbnailFile, setCourseThumbnailFile] = useState<File | null>(null);
    const [allFileUploaded, setAllFileUploaded] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    const [email, setEmail] = useState<string>("");
    const [price, setPrice] = useState<string>('');
    const [videoDescription, setVideoDescription] = useState<string>('');
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [videotags, setVideoTags] = useState<string>('');
    const [videourl, setVideoUrl] = useState<string>('');
    const [courseList, setCourseList] = useState<{ label: string; value: string }[]>([]);
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const { loading, error, data } = useQuery(GET_COURSENAME, {
        variables: { email: email },
    });

    const handleSubmitForm = useCallback(async () => {
        console.log("url is:", videourl)
        try {
            const VideoUploadForm = new FormData();
            VideoUploadForm.append('email', email);
            VideoUploadForm.append('courseName', courseName);
            VideoUploadForm.append('courseDescription', courseDescription);
            VideoUploadForm.append(`${isPaidCourse}`, price);
            VideoUploadForm.append('videoTitle', videoTitle);
            VideoUploadForm.append('videoDescription', videoDescription);
            VideoUploadForm.append('videoUrl', videourl);
            VideoUploadForm.append('videoTags', videotags);
            if (thumbnailFile && courseThumbnailFile) {
                VideoUploadForm.append('video', thumbnailFile);
                VideoUploadForm.append('video', courseThumbnailFile);
            }
            try {
                const response = await fetch("http://localhost:9063/video/uploadvideo", {
                    method: "POST",
                    body: VideoUploadForm
                })
                console.log(response);
                if (response.ok) {
                    toast.success("Video uploaded", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                } else {
                    toast.error("Video upload failed", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            catch (error: any) {
                console.log("Internal server error", error);
            }

        } catch (error: any) {
            throw new Error('Form operation failed', error);
        }
    }, [email, courseName, courseDescription, videoTitle, videoDescription, price, videourl, videotags, thumbnailFile, courseThumbnailFile]);


    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setVideoFile(file);
    };
    const handlecourseThumbnail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setCourseThumbnailFile(file);
    };
    const upload = useCallback(async () => {
        setShowSpinner(true);
        const result = await uploadVideo(videoFile);
        const path = result.ref.fullPath
        const link: any = await getDownloadLink(path);
        setVideoUrl(link);
        console.log(link);
        setShowSpinner(false);
        setAllFileUploaded(true)
    }, [videoFile, videourl, setVideoUrl, setShowSpinner]);

    const handlethumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setThumbnailFile(file);
    };

    useEffect(() => {

        if (user) {
            setEmail(user.email || "");
        }
        if (data && email !== "") {
            const updatedCourseList = data.getCourseName.map((course: { courseNames: any }) => ({
                label: course.courseNames,
                value: course.courseNames,
            }));
            setCourseList(updatedCourseList);
        }
    }, [user, data, email]);
    return (
        <>
            <ToastContainer />
            <div className="flex">
                <div className='ml-10' style={{ maxWidth: "600px" }}>
                    <h1 className='text-3xl font-bold mt-20 text-orange-500'>Upload You video</h1>
                    <p className='mt-10 text-lg text-orange-200'>You need to export the video content as a vertical over-under of equidistant projection before you upload it to YouTube. The aspect ratio should be at 1:1, and the resolution should be from 5120×5120 to 8192×8192. Use square pixels. The video should have a horizontal layout and fill out the whole player window.</p>
                    <p className='mt-10 text-lg text-orange-200'>
                        By default, you can upload videos that are up to 15 minutes long. Verified accounts can upload videos longer than 15 minutes.
                    </p>
                    <p className='mt-10 text-lg text-orange-200'>
                        The simplest way to avoid YouTube copyright claims is to soundtrack your content with copyright-free music that you know you have permission to use. Check out Uppbeat, a free music platform for creators, and download the best free music for YouTube. It's safe, free and you won't get any copyright claims!
                    </p>
                </div>
                <div className='border shadow-lg shadow-orange-400 border-gray-700 p-7 rounded-lg absolute' style={{ marginTop: "40px", width: "550px", marginLeft: "800px" }}>
                    {!showUploadForm ? (
                        <div>
                            <Input className="mb-5" type="text" variant="underlined" value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)} label="Video title" />
                            <Input className="mb-5" type="text" variant="underlined" label="Video description"
                                value={videoDescription}
                                onChange={(e) => setVideoDescription(e.target.value)} />
                            <RadioGroup
                                className="mb-5"
                                label="Upload on your existing course"
                                orientation="horizontal"
                            >
                                <Radio onClick={(e) => setIsExistingCourse(true)} value="yes">Yes</Radio>
                                <Radio onClick={(e) => setIsExistingCourse(false)} value="no">No</Radio>
                            </RadioGroup>
                            {isExistingCourse ? (
                                <div>
                                    <div className="flex mb-5 w-full flex-wrap md:flex-nowrap">
                                        <Select
                                            variant="underlined"
                                            label="Select a course"
                                            className="max-w-xs"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                        >
                                            {courseList.map((course) => (
                                                <SelectItem key={course.value} value={course.value}>
                                                    {course.label}

                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <Textarea
                                        variant="underlined"
                                        label="Tags"
                                        labelPlacement="outside"
                                        placeholder="Enter your desired tags"
                                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Input className="mb-5" type="text" value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        variant="underlined" label="Course name" />

                                    <Input className="mb-5" type="text"
                                        onChange={(e) => setCourseDescription(e.target.value)}
                                        variant="underlined" label="Course description" />

                                    <div className="max-w-xs mb-5">
                                        <label className="mb-1 block dark:text-neutral-400 text-sm font-medium text-neutral-500">Upload course thumbnail</label>
                                        <input id="example1"
                                            onChange={handlecourseThumbnail}
                                            type="file"
                                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold text-neutral-500 hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                        />
                                    </div>

                                    <RadioGroup
                                        className="mb-5"
                                        label="Is this a paid course"
                                        orientation="horizontal"
                                    >
                                        <Radio onClick={(e) => setIsPaidCourse(true)} value="paid">Yes</Radio>
                                        <Radio onClick={(e) => setIsPaidCourse(false)} value="free">No</Radio>
                                    </RadioGroup>
                                    {isPaidCourse &&
                                        <Input className="mb-5"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            type="text" variant="underlined" label="Course price" />
                                    }
                                    <Textarea
                                        variant="underlined"
                                        label="Tags"
                                        labelPlacement="outside"
                                        placeholder="Enter your desired tags, separated by commas"
                                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                        value={videotags}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            const tagsArray = value.split(',').map(tag => tag.trim());
                                            const newValue = tagsArray.join(', ');
                                            setVideoTags(newValue);
                                        }}
                                    />
                                </div>

                            )}
                            <Button onPress={() => setShowUploadForm(true)} className='mt-10 ml-48 flex' color="danger">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 12l-4-4v3H3v2h15v3l4-4z" /></svg>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className="py-5 px-2">
                                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                    <div className="md:flex">
                                        <div className="w-full p-3">
                                            <div className="relative h-36 rounded-lg border-dashed border-2 border-orange-600 flex justify-center items-center">
                                                <div className="absolute">
                                                    <div className="flex flex-col items-center">
                                                        <i className="fa fa-folder-open fa-4x text-blue-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="90px" viewBox="0 0 24 24" width="90px" fill="#fc6203"><g><rect fill="none" height="24" width="24" /></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" /></g></svg>
                                                        </i>
                                                        <span className="block text-gray-400 font-normal">Upload video thumbnail</span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="h-full w-full opacity-0"
                                                    name=""
                                                    onChange={handlethumbnailFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-3 flex">
                                        {showSpinner &&
                                            <Progress
                                                color="warning"
                                                size="sm"
                                                isIndeterminate
                                                aria-label="Loading..."
                                                className="max-w-40 mt-3 mr-5"
                                            />
                                        }

                                        {thumbnailFile && (
                                            <div className="text-center flex ml-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 mr-2" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" /></svg>
                                                <p className="text-gray-500 mr-2 text-sm mt-1">{thumbnailFile.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="py-5 px-2">
                                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                    <div className="md:flex">
                                        <div className="w-full p-3">
                                            <div className="relative h-36 rounded-lg border-dashed border-2 border-orange-600 flex justify-center items-center">
                                                <div className="absolute">
                                                    <div className="flex flex-col items-center">
                                                        <i className="fa fa-folder-open fa-4x text-blue-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="90px" viewBox="0 0 24 24" width="90px" fill="#fc6203"><g><rect fill="none" height="24" width="24" /></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" /></g></svg>
                                                        </i>
                                                        <span className="block text-gray-400 font-normal">Upload your video</span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="h-full w-full opacity-0"
                                                    name=""
                                                    onChange={handleVideoFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-3 flex">
                                        {showSpinner &&
                                            <Progress
                                                color="warning"
                                                size="sm"
                                                isIndeterminate
                                                aria-label="Loading..."
                                                className="max-w-40 mt-3 mr-5"
                                            />
                                        }
                                        {videoFile && (
                                            <div className="text-center flex">
                                                <svg className="mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z" /></svg>

                                                <p className="text-gray-500 text-sm mt-1">{videoFile.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            {allFileUploaded ? (
                                <Button className='mt-5 ml-48 flex font-semibold' color="danger" onClick={handleSubmitForm}>
                                    Submit
                                </Button>
                            ) : (
                                <Button className='mt-5 ml-48 flex text-white font-semibold' color="warning" onClick={upload}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" /></svg>
                                    Upload
                                    {showSpinner &&
                                        <Spinner color="danger" size="sm" />
                                    }
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default VideoUploadForm;