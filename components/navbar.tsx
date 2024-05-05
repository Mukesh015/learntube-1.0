"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    useAuthState,
    useSignOut,
    useUpdateProfile,
    useUpdatePassword,
} from "react-firebase-hooks/auth";
import { useDarkMode } from "@/components/hooks/theme"
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Switch, Badge } from "@nextui-org/react";
import { MoonIcon } from "@/components/MoonIcon";
import { SunIcon } from "@/components/SunIcon";
import { auth } from "@/configurations/firebase/config";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import { gql, useQuery } from "@apollo/client";
import NextTopLoader from "nextjs-toploader";

const VERIFY_CREATOR = gql`
query Exam($email:String){
    getIsCreator(email: $email) {
        isCreator
      }
      getSearchBarDetails(email: $email) {
        searchHistory
        videoDescription
        videoTags
        videoTitle
      }
      getNotifications(email: $email) {
        email
        avatar
        channelLogo
        isRead
        message
        notificationId
        timeStamp
        videoId
        videoThumbnail
      }
  }
`

const Navbar: React.FC<{ query: string }> = ({ query }) => {

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [avatar, setavatar] = useState<string>("");
    const [headerText, setHeaderText] = useState<string>("");
    const [newInfo, setnewInfo] = useState<string>("");
    const [toUpdate, settoUpdate] = useState<string>("");
    const [isCreator, setIsCreator] = useState<string>("");
    const [searchItem, setSearchItem] = useState<boolean>(false);
    const [toggleVoiceSearches, settoggleVoiceSearches] = useState<boolean>(false);
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [showAllClear, setShowAllClear] = useState<boolean>(false);
    const [unreadMessages, setUnreadMessages] = useState<number>(0);

    const [spinnerButton, setspinnerButton] = useState<boolean>(false);
    const [searchString, setsearchString] = useState<string>("");
    const [searchbarDetails, setSearchBarDetails] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);

    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [searchitem, setSearchitem] = useState<string>('');

    const router = useRouter();
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [updatePassword] = useUpdatePassword(auth);


    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const toggleTheme = useCallback(() => {
        toggleDarkMode();
    }, [toggleDarkMode])

    const { loading, error, data, refetch } = useQuery(VERIFY_CREATOR, {
        variables: { email: email },
    });


    const handleInputClick = () => {
        toggleSearchDiv();

    };

    const toggleSearchDiv = () => {
        setSearchItem(!searchItem);
    }


    const handleCreateVideo = useCallback(async () => {
        if (isCreator) {
            router.push("/creator/upload")
        } else {
            router.push("/creator/register")
        }
    }, [isCreator])


    const handleUpdateProfile = useCallback(async () => {
        if (!newInfo) {
            console.log("Input field cannot be empty");
            return "Blank input";
        }
        if (toUpdate === "name") {
            try {
                const res = await updateProfile({ displayName: newInfo });
                console.log(res);
                if (res) {
                    setspinnerButton(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error: any) {
                console.log("Firebase error", error)
            }
        } else if (toUpdate === "avatar") {
            try {
                const res = await updateProfile({ photoURL: newInfo });
                console.log(res);
                if (res) {
                    setspinnerButton(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error: any) {
                console.log("Firebase error", error)
            }
        } else if (toUpdate === "password") {
            try {
                const res = await updatePassword(newInfo);
                console.log(res);
                if (res) {
                    setspinnerButton(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error: any) {
                console.log("Firebase error", error)
            }
        } else {
            return "No profile found";
        }

    }, [newInfo, toUpdate])


    const handleModelOpen = useCallback(async (modelName: string) => {
        if (modelName === "nameChange") {
            settoUpdate("name");
            setHeaderText("Change your name");
            onOpen();

        } else if (modelName === "passwordChange") {
            settoUpdate("password");
            setHeaderText("Change your password");
            onOpen();

        } else if (modelName === "avatarChange") {
            settoUpdate("avatar");
            setHeaderText("Change your avatar");
            onOpen();
        }
    }, [headerText, toUpdate])

    const handleLogout = useCallback(async () => {
        try {
            const res = await signOut();
            console.log(res);
            if (res) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.log("firebase error", error);
        }
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch(searchString);
        }
    };

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


    const handleSearch = useCallback(async (recommendedSearchString: string | null) => {

        if (!recommendedSearchString) {
            return "Blank input";
        }
        try {
            const searchstring = recommendedSearchString || searchString;

            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtosearchhistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    searchString: searchstring
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Search string saved successfully");
            }

            const url = `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/search/${searchstring}`;
            router.push(url);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }, [email, searchString]);

    const deleteSearchString = useCallback(async (history: any) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/removefromsearchHistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    searchString: history
                })
            });
            const data = await response.json();
            console.log(data);
            refetch()

            if (response.ok) {
                console.log("search String deleted successfully")
                refetch();
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }, [email]);

    const handleShowNotifications = async () => {
        setShowNotifications(!showNotifications);
    }

    const startListening = async () => {
        setText("");
        setIsListening(true);
        if (recognition) {
            await recognition.start();
        }
    };

    const stopListening = async () => {
        setIsListening(false);
        handleSearch(text)
        if (recognition) {
            await recognition.stop();
        }
        settoggleVoiceSearches(false);
    };

    const handleOpenVoiceSearchModel = useCallback(async () => {
        handleSearch(text)
        settoggleVoiceSearches(!toggleVoiceSearches);
        if (isListening) {
            stopListening();
        }
        startListening();
    }, [isListening, text, handleSearch, startListening, settoggleVoiceSearches, stopListening]);

    const handleClearAllNotification = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/clearallnotification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const data = await response.json();
            console.log(data);
            refetch()
            if (response.ok) {
                setShowAllClear(true);
                setTimeout(() => {
                    setShowAllClear(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Failed to clear all notifications", error);
        }
    }, [email, setShowAllClear]);

    const handleMarkAsRead = useCallback(async (notificationId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/markasread`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    notificationId: notificationId
                })
            });
            const data = await response.json();
            console.log(data);
            refetch()

        } catch (error) {
            console.error("Failed to clear all notifications", error);
        }
    }, [email]);

    useEffect(() => {
        const handleClickOutside = () => {
            setSearchItem(false);
            settoggleVoiceSearches(false);
        };

        if (searchItem || toggleVoiceSearches) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchItem, toggleVoiceSearches, settoggleVoiceSearches, setSearchItem])


    useEffect(() => {
        if (user) {
            setuserName(user.displayName || "");
            setavatar(user.photoURL || "");
            setEmail(user.email || "");
            refetch()
        }
        if (data && email !== "") {
            const verifyIsCreator = data.getIsCreator[0].isCreator
            setIsCreator(verifyIsCreator);
            setSearchBarDetails(data.getSearchBarDetails)
            setNotifications(data.getNotifications)
            refetch()

        }
        if (notifications) {
            const unreadCount = notifications.filter(notification => !notification.isRead).length;
            setUnreadMessages(unreadCount);
            refetch()

        }
    }, [user, setIsCreator, setUnreadMessages, data, setSearchBarDetails, notifications, setNotifications]);

    useEffect(() => {
        const handleSearchChange = (e: Event) => {
            const input = e.target as HTMLInputElement;
            const value = input.value.toLowerCase();
            setsearchString(value);
        };

        const searchInput = document.querySelector<HTMLInputElement>("[data-search-content]");
        if (searchInput) {
            searchInput.addEventListener("input", handleSearchChange);

            return () => {
                searchInput.removeEventListener("input", handleSearchChange);
            };
        }
    }, [setsearchString]);



    useEffect(() => {
        if (!recognition) {
            if ("webkitSpeechRecognition" in window) {
                const recognitionInstance = new window.webkitSpeechRecognition();
                recognitionInstance.continuous = true;
                recognitionInstance.lang = "en-US";
                setRecognition(recognitionInstance);
            } else {
                console.error("Speech recognition is not supported in this browser.");
            }
        }

        if (recognition) {
            recognition.onresult = (event: SpeechRecognitionEvent) => {
                console.log("onresult:", event);

                recognition.stop();
                setTimeout(() => {
                    handleSearch(event.results[0][0].transcript);
                }, 1000)
                setText(event.results[0][0].transcript);
                setIsListening(false);

            };
        }
    }, [recognition, setText, setIsListening, handleSearch]);


    return (
        <>
            <NextTopLoader />
            <nav
                id="navbar"
                className={`p-3 ${isDarkMode ? 'bg-white' : ''} z-50 shadow-md shadow-gray-700 fixed top-0 backdrop-blur-md backdrop-brightness-0 w-full`}
            >
                <ul className="flex gap-6 items-center">
                    <li className={`ml-5 ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"} rounded-full p-1 cursor-pointer`}>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Menu">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill={isDarkMode ? '#000000' : '#FFFFFF'}
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            </svg>
                        </Tooltip>
                    </li>
                    <li className="flex justify-center items-center gap-3 ml-8">
                        <img
                            height={50}
                            width={50}
                            src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930"
                            alt=""

                        />
                        <p className={`font-bold ${isDarkMode ? "text-black" : ""} text-xl`}>LearnTube</p>
                    </li>
                    <li className="flex ml-32 mr-20">
                        <svg
                            className="absolute mt-2.5 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill={isDarkMode ? '#000000' : '#FFFFFF'}
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Search with voice">
                            <svg
                                onClick={() => handleOpenVoiceSearchModel()}
                                className={`absolute mt-2.5 ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"} rounded-full hover:p-1`}
                                style={{ marginLeft: "560px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill={isDarkMode ? '#000000' : '#FFFFFF'}
                            >

                                <g>
                                    <rect fill="none" height="24" width="24" />
                                    <rect fill="none" height="24" width="24" />
                                    <rect fill="none" height="24" width="24" />
                                </g>
                                <g>
                                    <g />
                                    <g>
                                        <path d="M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z" />
                                        <path d="M17,11c0,2.76-2.24,5-5,5s-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92H17z" />
                                    </g>
                                </g>
                            </svg>

                        </Tooltip>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Search a content">
                            <input
                                style={{ width: "600px" }}
                                type="search"
                                id="search-content"
                                value={query}
                                onChange={(e) => setSearchitem(e.target.value)}

                                placeholder="Search here... or [ctrl+k]"
                                className={`bg-inherit border ${isDarkMode ? "text-black" : "text-white"} border-gray-700 rounded-medium p-2 px-10 w-96`}
                                onClick={handleInputClick}
                                data-search-content
                                onKeyPress={handleKeyPress}
                            />
                        </Tooltip>

                        <Tooltip color="warning" delay={700} showArrow={true} content="Click to search">
                            <Button className="font-semibold text-white ml-4" color="success" onClick={() => handleSearch(searchString)}>
                                Search
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Toggle theme">
                            <button>
                                <Switch
                                    onClick={toggleTheme}
                                    defaultSelected
                                    size="lg"
                                    color="success"
                                    startContent={<SunIcon />}
                                    endContent={<MoonIcon />}
                                ></Switch>
                            </button>
                        </Tooltip>
                    </li>
                    <li onClick={() => handleCreateVideo()} className={`rounded-full ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"} p-1 cursor-pointer`}>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Create video">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="36px"
                                viewBox="0 0 24 24"
                                width="36px"
                                fill={isDarkMode ? '#000000' : '#FFFFFF'}
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z" />
                            </svg>
                        </Tooltip>
                    </li>
                    <li onClick={handleShowNotifications} className={`rounded-full px-1 ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"}  p-0.5 cursor-pointer`}>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Notifications">
                            <Badge content={unreadMessages} shape="circle" color="danger">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="28px"
                                    viewBox="0 0 24 24"
                                    width="28px"
                                    fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                                </svg>
                            </Badge>
                        </Tooltip>
                    </li>
                    <li className="cursor-pointer">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    variant="light"
                                >
                                    {avatar ? (
                                        <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
                                    ) : (
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                                            alt=""
                                        />
                                    )}
                                </Button>
                            </DropdownTrigger>
                            {user ? (
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as: {userName}</p>
                                        <p className="font-semibold">{email}</p>
                                    </DropdownItem>
                                    <DropdownItem onPress={() => handleModelOpen("nameChange")} key="userName">
                                        Change username
                                    </DropdownItem>
                                    <DropdownItem onPress={() => handleModelOpen("passwordChange")} key="password">
                                        Change password
                                    </DropdownItem>
                                    <DropdownItem onPress={() => handleModelOpen("avatarChange")} key="avatar">
                                        Change avatar
                                    </DropdownItem>
                                    <DropdownItem key="Switch-account">Switch account</DropdownItem>
                                    <DropdownItem onPress={() => handleLogout()} key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            ) : (
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">You are not signed in</p>
                                        <p className="font-semibold text-gray-500 text-small">for better experience please click on below button</p>
                                    </DropdownItem>
                                    <DropdownItem onPress={(e) => { router.push("/login") }} className="text-center font-extrabold" key="login" color="primary">
                                        Login
                                    </DropdownItem>
                                </DropdownMenu>
                            )}
                        </Dropdown>
                    </li>
                </ul>
            </nav >
            <Modal
                backdrop="opaque"
                size="3xl"
                isOpen={isOpen}
                onClose={onClose}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader id="model-header" className="flex flex-col gap-1">{headerText}</ModalHeader>
                            <ModalBody>
                                <Input
                                    onChange={(e) => setnewInfo(e.target.value)}
                                    classNames={{
                                        base: "max-w-full h-10",
                                        mainWrapper: "h-full",
                                        input: "text-small",
                                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                    placeholder="Enter something here..."
                                    size="sm"
                                    type="search"
                                />
                                <p className="text-red-500">
                                    This operation have to performs page reload.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {!spinnerButton ? (
                                    <Button color="primary" onPress={() => handleUpdateProfile()}>
                                        Change
                                    </Button>
                                ) : (
                                    <Button isLoading color="primary" onPress={() => handleUpdateProfile()}>
                                        Changing...
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {searchItem && searchbarDetails && (
                <div className={`z-50 top-20 rounded-md fixed shadow-lg shadow-gray-500 ${isDarkMode ? "bg-white" : "bg-gray-700"}`} style={{ marginLeft: "440px", marginRight: "480px", width: "700px" }}>
                    <div className="flex cursor-pointer">
                        <div className="flex flex-col">
                            {searchString === '' ? (
                                Array.from(new Set(searchbarDetails.flatMap(item => item.searchHistory))).map((history, idx) => (
                                    <div className="flex " key={idx}>
                                        <div className={`flex ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 ml-2" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                            ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" /></svg>
                                            <p className={`p-2 ${isDarkMode ? "text-black" : "text-white"}`} style={{ width: "630px" }} onClick={() => handleSearch(history)}>{history}</p>
                                        </div>
                                        <svg onClick={() => deleteSearchString(history)} className="ml-20 mt-1 hover:bg-red-500  p-1 rounded-full absolute right-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                        ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                                    </div>
                                ))
                            ) : (
                                searchbarDetails
                                    .filter(item =>
                                        item.videoTitle.toLowerCase().includes(searchString.toLowerCase()) ||
                                        item.videoDescription.toLowerCase().includes(searchString.toLowerCase()) ||
                                        item.videoTags.some((tag: string) => tag.toLowerCase().includes(searchString.toLowerCase()))
                                    )
                                    .map((item, idx) => (
                                        <div key={idx}>
                                            <div className={`flex ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"}`}>
                                                <svg className="mt-2 ml-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                                <p className={`p-2 ${isDarkMode ? "text-black" : "text-white"}`} onClick={() => handleSearch(item.videoTitle)}>{item.videoTitle}</p>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            )
            }

            {toggleVoiceSearches && recognition && (
                <div id="voicesearch-container">
                    {/* Backdrop */}
                    <div
                        style={{
                            width: "100vw",
                            height: "100vh",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                            backdropFilter: "blur(5px)", // Add blur effect
                            zIndex: 9998, // Ensure it's behind the modal (9999)
                        }}
                    ></div>

                    {/* Modal */}
                    <div
                        id="hs-custom-backdrop-modal"
                        style={{
                            width: "900px",
                            height: "500px",
                            marginLeft: "400px",
                            zIndex: 9999, // Ensure it's on top
                        }}
                        className={`hs-overlay z-50 ${isDarkMode ? "text-black bg-white" : "text-white bg-gray-700"} fixed top-32 overflow-x-hidden overflow-y-auto pointer-events-auto rounded-xl`}
                    >
                        {/* Close button */}
                        <svg
                            onClick={stopListening}
                            className={`right-2 top-2 absolute p-2 ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-800"} cursor-pointer rounded-full`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="48px"
                            viewBox="0 0 24 24"
                            width="48px"
                            fill={isDarkMode ? '#000000' : '#FFFFFF'}
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>

                        {/* Content */}
                        <div className="flex mr-10 mt-28 ml-10">
                            {isListening ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="240" fill="#eb4034" viewBox="0 -960 960 960" width="240"><path d="M480.12-400q-51.04 0-86.58-35.46Q358-470.91 358-522v-242q0-51.09 35.42-86.54Q428.84-886 479.88-886q51.04 0 86.58 35.46Q602-815.09 602-764v242q0 51.09-35.42 86.54Q531.16-400 480.12-400ZM436-96v-128.85q-113-13.31-185.5-98.42Q178-408.39 178-522h86q0 90 63.18 152T480-308q89.64 0 152.82-62Q696-432 696-522h86q0 114.39-73.5 199.12Q635-238.16 522-224.85V-96h-86Z" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" height="240" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                    viewBox="0 -960 960 960" width="240"><path d="M480.12-400q-51.04 0-86.58-35.46Q358-470.91 358-522v-242q0-51.09 35.42-86.54Q428.84-886 479.88-886q51.04 0 86.58 35.46Q602-815.09 602-764v242q0 51.09-35.42 86.54Q531.16-400 480.12-400ZM436-96v-128.85q-113-13.31-185.5-98.42Q178-408.39 178-522h86q0 90 63.18 152T480-308q89.64 0 152.82-62Q696-432 696-522h86q0 114.39-73.5 199.12Q635-238.16 522-224.85V-96h-86Z" /></svg>
                            )}
                            {recognition ? (
                                <p className="text-4xl mt-20 ml-20">{text ? text : "Listening ..."}</p>
                            ) : (
                                <p className="text-4xl mt-20 ml-20">
                                    Your browser does not support speech recognition or allow recognition
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div id="notification-container" className="">
                {showNotifications &&
                    <div
                        className={`z-50 ${isDarkMode ? "text-black bg-white shadow-gray-500 shadow-md" : "text-white bg-gray-800"} scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-bg-gray-300 scrollbar-thumb-bg-gray-500 scrollbar-track-rounded-full overflow-y-auto top-20 fixed rounded-md right-10`}
                        style={{
                            width: "30rem",
                            height: "40rem",
                        }}
                    >
                        {notifications.map((item, index) => (
                            <div key={index} id="notification" className={` cursor-pointer ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"} pb-5 p-1`}>
                                <div onClick={() => handleMarkAsRead(item.notificationId)} className="flex ml-3 mr-3 mt-3">
                                    <img className="h-10 rounded-full mt-5" src={item.avatar} alt="" />
                                    <div>
                                        <h1 className="text-sm ml-3 max-w-64 mt-5">{item.message}</h1>
                                        <span className="flex">
                                            <span className="ml-3 text-sm text-gray-500">{formatTime(item.timeStamp)}</span>
                                            {!item.isRead &&
                                                <Tooltip color="warning" delay={700} showArrow={true} content="unread massage">
                                                    <svg className="ml-3 animate-ping mt-1.5 fill-red-600" xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 -960 960 960" width="11"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z" /></svg>
                                                </Tooltip>
                                            }
                                        </span>
                                    </div>
                                    <img className="h-20 absolute right-2 rounded-lg" src={item.videoThumbnail} alt="" />
                                </div>
                            </div>
                        ))}
                        <Tooltip color="warning" delay={700} showArrow={true} content="clear all">
                            {showAllClear ? (
                                <svg className={`p-2 rounded-full ${isDarkMode ? "bg-gray-300" : "bg-gray-700"}  fixed bottom-20 ml-52`} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
                            ) : (
                                <svg onClick={handleClearAllNotification} className={`p-2 rounded-full ${isDarkMode ? "bg-gray-300" : "bg-gray-700"}  fixed bottom-20 ml-52`} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                            )}
                        </Tooltip>
                    </div>
                }
            </div>

        </>
    )
}

export default Navbar;