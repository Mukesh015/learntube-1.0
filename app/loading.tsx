import React from "react";

const LoadingEffect: React.FC = () => {
    return (
        <div className="flex space-x-2 justify-center items-center mt-80 dark:invert ">
            <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce"></div>
            <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
    )
}

export default LoadingEffect;