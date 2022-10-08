import React, { useState, useEffect, useCallback } from "react";

/* implemented with Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API */
const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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

export function SpeechIn(setInput, userSpeaking) {
    const recog = new SpeechRecognition();

    /* check that Web Speech API for STT is supported */
    if (!recog)  {
        console.log("Sorry, your browser doesn't support speech-to-text through Web Speech API");
        return;
    }

    recog.continuous = true; // ????
    recog.interimResults = true;

    recog.onerror = (error) => {
        console.log(error.message);
        return;
    }

    recog.onspeechend = () => {
        recog.stop();
        console.log("Poppy has stopped listening.")
    }

    const useResult = (e) => {
        const newResult = (e) => {
            console.log(e);
        }

        window.addEventListener("result", newResult);
        
        return() => {
            window.removeEventListener("result", newResult);
        }
    }

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

    userSpeaking ? recog.start() : recog.stop();
}