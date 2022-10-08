import React, { useState, useEffect, useCallback } from "react";

/* implemented with Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API */
const synth = window.speechSynthesis;

/******* TEXT TO SPEECH *******/

/* borrowed from Victor Novais: https://dev.to/vicnovais/creating-a-speech-synthesizer-using-web-speech-api-and-react-4iii */

export const speechOut = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    // const voice = <SelectVoice />

    /* check that Web Speech API is supported */
    if (!synth) {
        console.log("Sorry, your browser doesn't support Web Speech API.")
        return;
    }

    synth.speak(utter);
    console.log("Poppy is speaking:", text);
}





/******* SPEECH TO TEXT *******/

export const speechIn = () => {
}