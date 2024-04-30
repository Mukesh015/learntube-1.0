"use client"
import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

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
                setText(event.results[0][0].transcript);
                setIsListening(false);
            };
        }
    }, [recognition, setText, setIsListening]);

    const startListening = () => {
        setText("");
        setIsListening(true);
        if (recognition) {
            recognition.start();
        }
    };

    const stopListening = () => {
        setIsListening(false);
        if (recognition) {
            recognition.stop();
        }
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    };
};

export default useSpeechRecognition;
