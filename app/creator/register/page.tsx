"use client"
import React, { useCallback, useState } from 'react';
import { RadioGroup, Radio } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";

const CreatorRegisterForm: React.FC = () => {

    const [personalInfoNext, setPersonalInfoNext] = useState<boolean>(false);
    const [otpForm, setOtpForm] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [channelName, setChannelName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [contactNumber, setContactNumber] = useState<string>();
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [pinCode, setPincode] = useState<string>();
    const [recoveryEmail, setRecoveryEmail] = useState<string>("");
    const [logo, setLogo] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [platform, setPlatform] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [mediaLinks, setMediaLinks] = useState<{ [key: string]: string } | null>(null);

    const platforms = [
        { label: "Your domain", value: "any" },
        { label: "Facebook", value: "Facebook" },
        { label: "Instagram", value: "Instagram" },
        { label: "Github", value: "Github" },
        { label: "LinkedIn", value: "LinkedIn" },
        { label: "Twitter", value: "Twitter" },
        { label: "Discord", value: "Discord" }
    ];


    const handlePersonalInfoForm = useCallback(async () => {
        setPersonalInfoNext(true);
    }, [setPersonalInfoNext])

    const handleChannelInfoForm = useCallback(async () => {
        setOtpForm(true);
    }, [setOtpForm]);
    const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlatform(event.target.value);
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const handleAddButtonClick = () => {
        if (platform && link) {
            setMediaLinks((prevLinks) => ({
                ...prevLinks,
                [platform]: link,
            }));
            setPlatform('');
            setLink('');
        }
    };
    const handleOtpForm = useCallback(async () => {
        try {
            console.log(email);
            const creatorForm = new FormData();
            creatorForm.append('email', email);
            creatorForm.append('channelName', channelName);
            creatorForm.append('firstName', firstName);
            creatorForm.append('gender', gender);
            creatorForm.append('city', city);
            creatorForm.append('state', state);
            creatorForm.append('country', country);
            creatorForm.append('recoveryEmail', recoveryEmail);
            if (pinCode && contactNumber) {
                creatorForm.append('contactNumber', contactNumber);
                creatorForm.append('pinCode', pinCode);
            }
            if (logo && cover) {
                creatorForm.append('image', logo);
                creatorForm.append('image', cover);
            }
            if (mediaLinks) {
                for (const [key, value] of Object.entries(mediaLinks)) {
                    creatorForm.append(`${key}`, value);
                    console.log(`${key}: ${value}`);
                }
            }
            try {
                const response = await fetch("http://localhost:9063/api/createchannel", {
                    method: "POST",
                    body: creatorForm
                })
                console.log(response);
                if (response.ok) {
                    toast.success("Registration success", {
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
                    toast.error("Registration failed", {
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
        }
        catch (error: any) {
            console.log("Internal server error", error);
        }
    }, [])
    const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const file = fileInput.files && fileInput.files[0];
        if (file) {
            setLogo(file);
        }
    }
    const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const file = fileInput.files && fileInput.files[0];
        if (file) {
            setCover(file);
        }
    }
    return (
        <>
            <ToastContainer />
            {otpForm ? (
                <div className='flex'>
                    <div className='ml-10' style={{ maxWidth: "600px" }}>
                        <div className='max-w-2xl mt-10'>
                            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                    </span>
                                </li>
                                <li className="text-blue-600 dark:text-blue-500 flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        Channel <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <span className="me-2">3</span>
                                    Confirmation
                                </li>
                            </ol>
                        </div>
                        <h1 className='text-3xl font-bold mt-40 text-orange-500'>Verify your details</h1>
                        <p className='mt-10 text-lg text-orange-200'>Email: An otp is sent to your given email address please verify the email to continue this process.</p>
                        <p className='mt-10 text-lg text-orange-200'>
                            Phone Number: A otp is sent to your given phone number please verify the phone number to continue this process otherwise the process will terminate immediately.
                        </p>
                    </div>
                    <div className='border shadow-lg shadow-orange-400 border-gray-700 p-7 rounded-lg absolute' style={{ marginTop: "150px", width: "550px", marginLeft: "800px" }}>
                        <div>
                            <svg onClick={(e) => setOtpForm(false)} className='mb-10 hover:bg-gray-700 rounded-full' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" /></svg>
                            <div className="relative mb-3">
                                <input
                                    required
                                    type="number"
                                    className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                    id="floatingInput"
                                    placeholder="Enter your first name"
                                />
                                <label
                                    htmlFor="floatingInput"
                                    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                >Enter email otp</label>
                            </div>

                            <div className="relative mb-3">
                                <input
                                    required
                                    type="number"
                                    className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                    id="floatingInput"
                                    placeholder="Enter your first name"
                                />
                                <label
                                    htmlFor="floatingInput"
                                    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                >Enter mobile otp</label>
                            </div>

                            <Button onPress={(e) => handleOtpForm()} className='mt-16 ml-48 flex' color="danger">
                                submit
                            </Button>
                        </div>
                    </div >
                </div >
            ) : (
                <div className='flex'>
                    {personalInfoNext ? (
                        <div className='ml-10' style={{ maxWidth: "600px" }}>
                            <div className='mt-10'>
                                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                        </span>
                                    </li>
                                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span className="me-2">2</span>
                                            Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="me-2">3</span>
                                        Confirmation
                                    </li>
                                </ol>
                            </div>
                            <h1 className='text-3xl font-bold mt-40 text-orange-500'>Create your channel settings</h1>
                            <p className='mt-10 text-lg text-orange-200'>Content creation is a key part of content marketing, which is a long-term strategy that involves developing and sharing content across channels to reach and engage your target audience. Content creation is important for many reasons.</p>
                            <p className='mt-10 text-lg text-orange-200'>
                                Your content educates your readers, engages your audience and establishes you as an authoritative subject matter source. If you're not already set up for content success, here are some ways to give your brand the content makeover it needs.
                            </p>
                        </div>
                    ) : (
                        <div className='ml-10' style={{ maxWidth: "600px" }}>
                            <div className='mt-10'>
                                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                    <li className="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                        </span>
                                    </li>
                                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span className="me-2">2</span>
                                            Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="me-2">3</span>
                                        Confirmation
                                    </li>
                                </ol>
                            </div>
                            <h1 className='text-3xl font-bold mt-40 text-orange-500'>Update your personal informations</h1>
                            <p className='mt-10 text-lg text-orange-200'>There is nothing more important than keeping your personal information secure so that you can prevent identity theft. This information is the gateway to your financial institutions, medical records, credit score and other important personal records.</p>
                            <p className='mt-10 text-lg text-orange-200'>
                                And you have to protect it. This is because if personal data falls into the wrong hands, people could be harmed. Depending on the situation, they could become victims of identity theft, discrimination or even physical harm.
                            </p>
                        </div>
                    )}
                    <div className='border shadow-lg shadow-orange-400 border-gray-700 p-7 rounded-lg absolute' style={{ marginTop: "15px", width: "550px", marginLeft: "800px" }}>
                        {personalInfoNext ? (
                            <div>
                                <svg onClick={(e) => setPersonalInfoNext(false)} className='mb-10 hover:bg-gray-700 rounded-full' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" /></svg>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="name"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your first name"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Channel name</label>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="name"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your first name"
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Channel admin name</label>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="name"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your first name"
                                        value={recoveryEmail}
                                        onChange={(e) => setRecoveryEmail(e.target.value)}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Add recovery email</label>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="name"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your first name"
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Channel description</label>
                                </div>
                                <div className="w-full flex flex-col gap-4 mb-5">
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Select
                                            radius='sm'
                                            variant="bordered"
                                            label="Select a platform"
                                            className="max-w-xs"
                                            value={platform}
                                            onChange={handlePlatformChange}
                                        >
                                            {/* Assuming platforms is an array of objects with label and value */}
                                            {platforms.map((platform) => (
                                                <SelectItem key={platform.value} value={platform.value}>
                                                    {platform.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Link"
                                            value={link}
                                            onChange={handleLinkChange}
                                        />
                                        <Button color='primary' className='mt-2' radius="sm" onClick={handleAddButtonClick}>
                                            Add
                                        </Button>
                                    </div>
                                    {mediaLinks &&
                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='flex bg-gray-700 p-1 rounded-xl text-gray-200 px-2'>
                                                {Object.entries(mediaLinks).map(([platform, link]) => (
                                                    <p className='text-sm underline text-blue-500' key={platform}>{link}</p>
                                                ))}
                                                <svg className='bg-gray-500 rounded-full absolute ml-52' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className="relative ml-3 flex mb-3">
                                    <div className="max-w-xs">
                                        <label className="mb-1 block dark:text-neutral-400 text-sm font-medium text-neutral-500">Upload channel logo</label>
                                        <input
                                            id="example1"
                                            type="file"
                                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold text-neutral-500 hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                            onChange={handleLogo}
                                        />
                                    </div>
                                    <div className="max-w-xs">
                                        <label className="mb-1 block dark:text-neutral-400 text-sm font-medium text-neutral-500">Upload cover photo</label>
                                        <input id="example1"
                                            type="file"
                                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold text-neutral-500 hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                            onChange={handleCover}
                                        />
                                    </div>
                                </div>
                                <Button onPress={(e) => handleChannelInfoForm()} className='mt-10 ml-48 flex' color="danger">
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 12l-4-4v3H3v2h15v3l4-4z" /></svg>
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="name"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your first name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Your name</label>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your email"
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Email address</label>
                                </div>
                                <div className="relative mb-3">
                                    <RadioGroup
                                        orientation="horizontal"
                                        label="Select your gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>

                                    </RadioGroup>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="phone"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your last name"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Contact number</label>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="address"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your adddress"

                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Address line</label>
                                </div>
                                <div className='flex'>
                                    <div className="relative mb-3">
                                        <input
                                            required
                                            type="address"
                                            className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                            id="floatingInput"
                                            placeholder="Enter your adddress"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floatingInput"
                                            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                        >City</label>
                                    </div>
                                    <div className="relative mb-3 ml-2">
                                        <input
                                            required
                                            type="number"
                                            className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                            id="floatingInput"
                                            placeholder="Enter your adddress"
                                            value={pinCode}
                                            onChange={(e) => setPincode(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floatingInput"
                                            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                        >Pincode</label>
                                    </div>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        required
                                        type="address"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your adddress"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >State</label>
                                </div>
                                <div className="relative">
                                    <input
                                        required
                                        type="address"
                                        className="peer m-0 block h-[58px] w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="Enter your adddress"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >country</label>
                                </div>
                                <Button className='mt-4 ml-52 flex' onPress={(e) => handlePersonalInfoForm()} color="danger">
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 12l-4-4v3H3v2h15v3l4-4z" /></svg>
                                </Button>
                            </div>
                        )}
                    </div >
                </div >

            )}
        </>
    );
}

export default CreatorRegisterForm;