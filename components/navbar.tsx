import React from "react";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "@/components/MoonIcon";
import { SunIcon } from "@/components/SunIcon";

const Navbar: React.FC = () => {
    return (
        <nav
            id="navbar"
            className="p-3 shadow-md shadow-gray-700 fixed top-0 backdrop-blur-md backdrop-brightness-0"
        >
            <ul className="flex gap-6 items-center">
                <li className="ml-5 hover:bg-gray-500 rounded-full p-1 cursor-pointer">
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
                <li className="flex ml-40 mr-20">
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
                    <input
                        style={{ width: "600px" }}
                        type="text"
                        placeholder="Search here... or [ctrl+k]"
                        className="bg-inherit border border-gray-700 rounded-medium p-2 px-10 w-96"
                    />
                    <Button className="font-semibold text-white ml-4" color="success">
                        Search
                    </Button>
                </li>
                <li>
                    <Switch
                        defaultSelected
                        size="lg"
                        color="success"
                        startContent={<SunIcon />}
                        endContent={<MoonIcon />}
                    ></Switch>
                </li>
                <li className="hover:bg-gray-700 rounded-full p-1 cursor-pointer">
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
                </li>
                <li className="hover:bg-gray-700 rounded-full p-1 cursor-pointer">
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
                </li>
                <li>
                    <img
                        className="h-10 rounded-full"
                        src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                        alt=""
                    />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;