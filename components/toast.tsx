import React from "react";

const Toast: React.FC<{ message: string, position: string }> = ({ message, position }) => {
    return (
        <>
            <div className={`fixed z-50 opacity-100 ${position} bottom-60 delay-300 ml-[400px] translate-y-10 transition-all scale-100 duration-300 ease-in-out text-center`}>
                <div className="bg-yellow-600 pl-5 pr-5 pt-1 pb-1 rounded-2xl">
                    <p className="font-semibold">{message}</p>
                </div>
            </div>
        </>
    )
}

export default Toast;