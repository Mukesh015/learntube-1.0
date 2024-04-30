"use client"
import React, { useCallback, useEffect, useState } from "react";
import {
    useAuthState,
    useSignOut,
    useUpdateProfile,
    useUpdatePassword,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "@/components/MoonIcon";
import { SunIcon } from "@/components/SunIcon";
import { auth } from "@/configurations/firebase/config";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import { gql, useQuery } from "@apollo/client";


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
  }
`

const Navbar: React.FC = () => {

    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [avatar, setavatar] = useState<string>("");
    const [headerText, setHeaderText] = useState<string>("");
    const [newInfo, setnewInfo] = useState<string>("");
    const [toUpdate, settoUpdate] = useState<string>("");
    const [isCreator, setIsCreator] = useState<string>("");
    const [searchItem, setSearchItem] = useState<boolean>(false);

    const [spinnerButton, setspinnerButton] = useState<boolean>(false);
    const [searchString, setsearchString] = useState<string>("");
    const [searchbarDetails, setSearchBarDetails] = useState<any[]>([]);

    const router = useRouter();
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [updatePassword] = useUpdatePassword(auth);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const { loading, error, data } = useQuery(VERIFY_CREATOR, {
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

    const handleSearch = useCallback(async (recommendedSearchString: string | null) => {
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
            window.location.href = url;
    
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }, [email,searchString]);

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

            if (response.ok) {
                console.log("search String deleted successfully")
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }, [email]);

    useEffect(() => {
        if (user) {
            setuserName(user.displayName || "");
            setavatar(user.photoURL || "");
            setEmail(user.email || "");
        }
        if (data && email !== "") {
            const verifyIsCreator = data.getIsCreator[0].isCreator
            setIsCreator(verifyIsCreator);
            setSearchBarDetails(data.getSearchBarDetails)
        }
    }, [user, setIsCreator, data, setSearchBarDetails]);

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


    return (
        <>
            <nav
                id="navbar"
                className="p-3 shadow-md shadow-gray-700 fixed top-0 backdrop-blur-md backdrop-brightness-0 w-full"
            >
                <ul className="flex gap-6 items-center">
                    <li className="ml-5 hover:bg-gray-500 rounded-full p-1 cursor-pointer">
                        <Tooltip color="warning" delay={700} showArrow={true} content="Menu">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
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
                        <p className="font-semibold text-xl">LearnTube</p>
                    </li>
                    <li className="flex ml-32 mr-20">
                        <svg
                            className="absolute mt-2.5 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#FFFFFF"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        <Tooltip color="warning" delay={700} showArrow={true} content="Search with voice">
                            <svg
                                className="absolute mt-2.5 hover:bg-gray-500 rounded-full hover:p-1"
                                style={{ marginLeft: "560px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
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
                                placeholder="Search here... or [ctrl+k]"
                                className="bg-inherit border border-gray-700 rounded-medium p-2 px-10 w-96"
                                onClick={handleInputClick}
                                data-search-content
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
                                    defaultSelected
                                    size="lg"
                                    color="success"
                                    startContent={<SunIcon />}
                                    endContent={<MoonIcon />}
                                ></Switch>
                            </button>
                        </Tooltip>

                    </li>
                    <li onClick={() => handleCreateVideo()} className="hover:bg-gray-700 rounded-full p-1 cursor-pointer">
                        <Tooltip color="warning" delay={700} showArrow={true} content="Create video">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="36px"
                                viewBox="0 0 24 24"
                                width="36px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z" />
                            </svg>
                        </Tooltip>
                    </li>
                    <li className="hover:bg-gray-700 rounded-full p-1 cursor-pointer">
                        <Tooltip color="warning" delay={700} showArrow={true} content="Notifications">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="36px"
                                viewBox="0 0 24 24"
                                width="36px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                            </svg>
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
            {searchItem && searchbarDetails && (
                <div className="mt-20 bg-gray-800 rounded-md" style={{ marginLeft: "440px", marginRight: "480px" }}>
                    <div className="flex cursor-pointer">
                        <div className="flex flex-col">
                            {searchString === '' ? (
                                Array.from(new Set(searchbarDetails.flatMap(item => item.searchHistory))).map((history, idx) => (
                                    <div className="flex" key={idx}>
                                        <p className="p-2 hover:bg-gray-600 rounded-xl" onClick={() => handleSearch(history)}>{history}</p>
                                        <svg onClick={() => deleteSearchString(history)} className="ml-20 mt-1 hover:bg-gray-600 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
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
                                            <div className="flex">
                                                <p className="p-2 hover:bg-gray-600 rounded-xl" onClick={() => handleSearch(item.videoTitle)}>{item.videoTitle}</p>
                                            </div>
                                            <hr className="border-gray-600" />
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            )}
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
        </>
    )
}

export default Navbar;