/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ChatComposer from "./ChatComposer";
import ChatWindow from "./ChatWindow";
import ChatHeader from "./ChatHeader";
import funfacts from "./facts.js";
// import axios from "axios";
import "../style/chatbot.css";
// import { findAllByDisplayValue } from "@testing-library/react";
// import { Router, Navigate } from 'react-router-dom';

let suggValue = ["None", "None"];

/*If a user selects a suggested question this function is called, setting the question and answer values to be sent in the chat box*/
export const suggested = (sugg, suggAns) => { 
    suggValue = [sugg, suggAns]
}

export function Chatbot(props) {
    console.log("Sugg", props)
    const SENDER_USER = "user";
    const SENDER_BOT = "bot";
    const AI_NO_ANS = "Sorry, I cannot answer that question at the moment! Please contact Jeanine Scaramozzino at swantonpoppycp@gmail.com to give feedback. Thank you for helping Poppy grow!";
    const FUN_FACT_STR = "Here is a fun fact about SPR: ";
    const FUN_FACT_COUNT = 5;
     
    const [query, setQuery] = useState("");
    const [conversation, setConversation] = useState([]);
    const [responseCount, setResponseCount] = useState(0); // AI mocking
    // const [initialResponse, setInitialResponse] = useState(0);
    const [feedbackReceived, setFeedbackReceived] = useState(0);
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);

    /**
     * Toggles the suggestions
     */
    let onSuggestionClick = () => {
        setSuggestionsOpen((s) => !s);
    };

    /**
     * Every time the user sends a new question, get the answer from the API and
     * add it to the conversation.
     */
    useEffect(() => {
        console.log("Effect triggered")
        /*If the user selected a suggested question on the Learn More Page the sendSuggMessageAndAns function is called*/
        if (suggValue[0] !== "None"){
            sendSuggMessageAndAns(suggValue[0], suggValue[1]);
        }

        function sendSuggMessageAndAns(sugg, suggAns){
            /*Add the question to the conversation*/
            let manualQuery = [{ text: sugg}] 
            const conversation =  manualQuery.map(({ text }) => ({
                text,
                sender: SENDER_USER,
                timestamp: Date.now(),
            }));
            /*Add the answer to the message*/
            let manualAns = [{ text: suggAns}] 
            const answerMessages =  manualAns.map(({ text }, i) => ({
                text,
                sender: SENDER_BOT,
                timestamp: Date.now() + i,
                responseType: i === 0 ? "answer" : "followUp"
            }));
            
            setConversation([...conversation, ...answerMessages]); 
            suggValue = ["None", "None"];
        }
    
        /* Runs on page refresh
        if (initialResponse === 0) {

            if ((sessionStorage.getItem("responseCount")) != null) {
                var messageCount = parseInt(sessionStorage.getItem("responseCount"));
            }
            else {
                messageCount = 0;
            }

            if (messageCount === responseCount) {
                setInitialResponse(1);
            }
            else {
                var data = sessionStorage.getItem("user");
                const myArray = data.split("%<data-break>%");
                setConversation([
                    ...conversation,
                    { text: myArray[responseCount], sender: SENDER_USER, timestamp: Date.now() },
                ]);
                setQuery(myArray[responseCount]);
            }
        }
        */
        if (query === "") return;


        //let payload = { message: query };

        /* --------------------------------------------------------*/
        /* AI mock */
        // function mockResponse() {
        //     let resp = "Placeholder response " + responseCount;
        //     //sessionStorage.setItem("responseCount", responseCount + 1);
        //     setResponseCount(responseCount + 1);
        //     return [{ text: resp }];
        // }
        /* --------------------------------------------------------*/

        async function AIResponse(question){

            console.log("Before Fetch", question)
            let response = await fetch("/api_call", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(question)
            })
            // Data is the AI response from Matthew.
            let data = await response.json()
            let fact = Math.floor(Math.random() * FUN_FACT_COUNT)
            // assuming data evaluates to false if empty string
            // let resp = (data.sentences[0]) ? (data.sentences + responseCount) : [AI_NO_ANS, funfacts[fact]]
            if (data.sentences[0]) {
                setResponseCount(responseCount + 1);
                return [{ text: data.sentences}]
            }
            else {
                return [{ text: AI_NO_ANS}, { text: FUN_FACT_STR + funfacts[fact]}]
            }
            //sessionStorage.setItem("responseCount", responseCount + 1);
            // return [{ text: resp }]

        }

        // function sleep(ms) {
        //      return new Promise(resolve => setTimeout(resolve, ms));
        // }

        async function postMessage() {
            try {

                console.log("-1")

                const AIAns = await AIResponse(query);
                console.log("0")

                const answerMessages =  AIAns.map(({ text }, i) => ({
                    text,
                    sender: SENDER_BOT,
                    timestamp: Date.now() + i,
                    responseType: i === 0 ? "answer" : "followUp"
                }));

                console.log("1")

                setConversation([...conversation, ...answerMessages]); //
                console.log("2")

            } catch (err) {
                console.log("THIS IS BAD")
                console.error(err);
                return;
            }
        }
        console.log("Call post")
        postMessage();
    }, [query]);

    /**
     * Adds the user's message to the conversation, passes message to the bot
     */
    let sendMessage = (message) => {
        setConversation([
            ...conversation,
            { text: message, sender: SENDER_USER, timestamp: Date.now() },
        ]);
        setQuery(message);
        /* Launches on chat refresh
        // if (sessionStorage.getItem("user") == null) {
        //     sessionStorage.setItem("user", message);
        // }
        // else {
        //     var temp = sessionStorage.getItem("user");
        //     sessionStorage.setItem("user", temp + "%<data-break>%" + message);
        // }
        // sessionStorage.setItem("responseCount", responseCount + 1);
        */
    };

    /**
     * Handles user feedback about chatbot answer accuracy.
     */
    function onFeedbackGiven(id, isPositive) {
        // We're gonna need a real endpoint, but for testing purposes:
        let answerIndex = conversation.findIndex(
            (message) => message.timestamp === id
        );

        conversation[answerIndex].feedback = isPositive;
        setFeedbackReceived(feedbackReceived + 1);

        if (answerIndex === -1) return;
        // const payload = {
        //     sentiment: isPositive ? "positive" : "negative",
        //     question: conversation[answerIndex - 1].text,
        //     answer: conversation[answerIndex].text,
        // };
        // axios.post("log/query", payload);

        // useEffect(() => {}, []);
    }

    return (
        <main className="Chatbot chatbotStyle">
            <ChatHeader
                onSuggestionClick={onSuggestionClick}
                suggestionsOpen={suggestionsOpen}
            />
            <ChatWindow
                conversation={conversation}
                suggestionsOpen={suggestionsOpen}
                onSend={sendMessage}
                onSuggestionClick={onSuggestionClick}
                onFeedbackGiven={onFeedbackGiven}
            />
            
            {!suggestionsOpen && <ChatComposer onSend={sendMessage} />}
        </main>
    );
}

