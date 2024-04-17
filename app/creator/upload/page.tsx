"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useQuery, gql } from '@apollo/client';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { uploadVideo } from "@/firebase/config";

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
    const [courseThumbnailFile, setCourseThumbnailFile] = useState<File | null>(null);

    const [email, setEmail] = useState<string>("");
    const [price, setPrice] = useState<string>('');
    const [videoDescription, setVideoDescription] = useState<string>('');
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [videotags, setVideoTags] = useState<string[]>(['']);
    const [courseList, setCourseList] = useState<{ label: string; value: string }[]>([]);

    const { loading, error, data } = useQuery(GET_COURSENAME, {
        variables: { email: email },
    });

    const handleSubmitForm = useCallback(async () => {
        try {
            const VideoUploadForm = new FormData();
            VideoUploadForm.append('email', email);
            VideoUploadForm.append('courseName', courseName);
            VideoUploadForm.append('courseDescription', courseDescription);
            VideoUploadForm.append(`${isPaidCourse}`, price);
            VideoUploadForm.append('videoTitle', videoTitle);
            VideoUploadForm.append('videoDescription', videoDescription);
            VideoUploadForm.append('videoTags', videotags.join(','));
            if (thumbnailFile && courseThumbnailFile) {
                VideoUploadForm.append('video', thumbnailFile);
                VideoUploadForm.append('video', courseThumbnailFile);
            }

        } catch (error) {
            console.error('Error fetching isCreator:', error);
            throw new Error('Error fetching isCreator');
        }
    }, []);
    const [user] = useAuthState(auth);
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const linesArray = value.split(',').map(line => line.trim());
        setVideoTags(linesArray);
    };
    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setVideoFile(file);
    };
    const upload = useCallback(async () => {
        const result = await uploadVideo(videoFile);
        console.log(result.ref.fullPath);
      }, [videoFile]);
    const handlethumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setThumbnailFile(file);
    };
    useEffect(() => {
        if (user) {

            setEmail(user.email || "");
        } else {
            console.log("User is not available");
        }
        if (data) {

            const updatedCourseList = data.getCourseName.map(course => ({
                label: course.courseNames,
                value: course.courseNames,
            }));
            setCourseList(updatedCourseList);
        }
    }, [user, data]);
    return (
        <>
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
                            <Input className="mb-5" type="email" variant="underlined" label="Video description"
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
                                    <Input className="mb-5" type="email" value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        variant="underlined" label="Course name" />
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
                                        value={videotags.join(', ')}
                                        onChange={handleInputChange}
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
                                            <div className="relative h-48 rounded-lg border-dashed border-2 border-orange-600 flex justify-center items-center">
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
                                </div>
                                {thumbnailFile && (
                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500">Selected file: {thumbnailFile.name}</p>
                                    </div>
                                )}
                            </div>
                            <div className="py-5 px-2">
                                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                    <div className="md:flex">
                                        <div className="w-full p-3">
                                            <div className="relative h-48 rounded-lg border-dashed border-2 border-orange-600 flex justify-center items-center">
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
                                </div>
                                {videoFile && (
                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500">Selected file: {videoFile.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
                <Button onClick={handleSubmitForm}>Submit</Button>
                <Button onClick={upload}>upload</Button>
            </div>

        </>
    )
}

export default VideoUploadForm;