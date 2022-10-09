import React, { useState, useEffect, useCallback } from "react";

/* implemented with Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API */
const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new SpeechRecognition();
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

if (recog) {
    // recog.continuous = true; // ????
    recog.interimResults = true;
}

/******* TEXT TO SPEECH *******/

/* borrowed from Victor Novais: https://dev.to/vicnovais/creating-a-speech-synthesizer-using-web-speech-api-and-react-4iii */

export const speechOut = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    // const voice = <SelectVoice />

    /* check that Web Speech API for TTS is supported */
    if (!synth) {
        console.log("Sorry, your browser doesn't support text-to-speech through Web Speech API.");
        return;
    }

    synth.speak(utter);
    console.log("Poppy is speaking:", text);
}





/******* SPEECH TO TEXT *******/

/* borrowed from Mohan Raj: https://www.section.io/engineering-education/speech-recognition-in-javascript/ */

export function SpeechIn({setInput, userSpeaking, setUserSpeaking}) {
    const [listening, setListening] = useState(false);

    /* check that Web Speech API for STT is supported */
    if (!recog)  {
        console.log("Sorry, your browser doesn't support speech-to-text through Web Speech API.");
    }

    // useEffect(() => {
    //     console.log("Is Poppy listening?", listening);
    // }, [listening])

    recog.onerror = ({error}) => {
        console.log(error.message);
        return;
    }

    recog.onaudiostart = () => {
        setListening(true);
        console.log("Poppy is listening");
    }

    recog.onaudioend = () => {
        setListening(false);
        setUserSpeaking(false);
        console.log("Poppy is not listening")
    }

    // const useEffect = (e) => {
    //     const newResult = (e) => {
    //         console.log(e);
    //     }

    //     window.addEventListener("result", newResult);
        
    //     return() => {
    //         window.removeEventListener("result", newResult);
    //     }
    // }

    // useResult(() => 
    //     recog.onresult = (e) => {
    //         const [interIn, setInterIn] = useState("");

    //         recog.SpeechRecognitionResultList.item.forEach(result => {
    //             if (result.isFinal) {
    //                 /* add interim results to final input */
    //                 setInput(interIn);
    //                 setInput(result);
    //             }
    //             else {
    //                 setInterIn(result);
    //             }
    //         } )
    //     }
    // )

    // if (userSpeaking) {
    //     recog.start();
    //     console.log("Poppy is listening");
    // }
    // else {
    //     recog.stop();
    //     console.log("Poppy has stopped listening.");
    // }

    useEffect(() => {
        console.log("userSpeaking:", userSpeaking);
        if (userSpeaking && !listening) {
            recog.start();
        }
        else {
            recog.stop();
        }
    }, [userSpeaking]);

    return null;
}