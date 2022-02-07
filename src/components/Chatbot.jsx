/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ChatComposer from "./ChatComposer";
import ChatWindow from "./ChatWindow";
import HeaderNav from "./HeaderNav";
import axios from "axios";

export default function Chatbot(props) {
    const SENDER_USER = "user";
    const SENDER_BOT = "bot";

    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [conversation, setConversation] = useState([]);
    const [responseCount, setResponseCount] = useState(0); // AI mocking

    /**
     * Toggles the suggestions
     */
    let onSuggestionClick = () => {
        setSuggestionsOpen((s) => !s);
    };


    window.onload = function() {
      var data = sessionStorage.getItem("user");
      if (data != null) {
        const myArray = data.split("    ");
        for (const element of myArray){
          console.log(element);
        }
      }
    }
    /**
     * Every time the user sends a new question, get the answer from the API and
     * add it to the conversation.
     */
    useEffect(() => {
        if (query === "") return;
        // let payload = { message: query };

        /* --------------------------------------------------------*/
        /* AI mock */
        function mockResponse() {
            if (sessionStorage.getItem("responseCount") != null){
                setResponseCount(parseInt(sessionStorage.getItem("responseCount")));
            }
            console.log(responseCount);
            let resp = "Placeholder response " + responseCount;
            sessionStorage.setItem("responseCount", parseInt(responseCount) + 1);
            // setResponseCount(responseCount + 1);
            return [{ text: resp }];
        }
        /* --------------------------------------------------------*/

        async function postMessage() {
            try {
                // const response = await axios.post("api/webhooks/rest/webhook", payload);
                // const answerMessages = response.data.map(({ text }, i) => ({
                const answerMessages = mockResponse().map(({ text }, i) => ({
                    text,
                    sender: SENDER_BOT,
                    timestamp: Date.now() + i,
                    responseType: i === 0 ? "answer" : "followUp",
                }));
                setQuery("");
                setConversation([...conversation, ...answerMessages]);
                console.log(sessionStorage.getItem("responseCount"));
                if (sessionStorage.getItem("bot") == null){
                    sessionStorage.setItem("bot", answerMessages[0].text);
                  }
                  else {
                    var temp = sessionStorage.getItem("bot");
                    sessionStorage.setItem("bot", answerMessages[0].text + "    " + temp);
                  }
            } catch (err) {
                console.error(err);
                return;
            }
        }

        postMessage();
    }, [query, conversation, responseCount]);

    /**
     * Adds the user's message to the conversation, passes message to the bot
     */
    let sendMessage = (message) => {
        setConversation([
            ...conversation,
            { text: message, sender: SENDER_USER, timestamp: Date.now() },
        ]);
        setQuery(message);
        if (sessionStorage.getItem("user") == null){
          sessionStorage.setItem("user", message);
        }
        else {
          var temp = sessionStorage.getItem("user");
          sessionStorage.setItem("user", message + "    " + temp);
        }
    };
    /**
     * Handles user feedback about chatbot answer accuracy.
     */
    function onFeedbackGiven(id, isPositive) {
        // We're gonna need a real endpoint, but for testing purposes:
        let answerIndex = conversation.findIndex(
            (message) => message.timestamp === id
        );
        if (answerIndex === -1) return;
        const payload = {
            sentiment: isPositive ? "positive" : "negative",
            question: conversation[answerIndex - 1].text,
            answer: conversation[answerIndex].text,
        };
        axios.post("log/query", payload);
    }

    const chatbotStyles = css`
    display: grid;
    grid-template-rows: min-content auto min-content;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "chat-window" "composer";
    width: 100%;
    max-width: 700px;
    margin: auto;
    height: 100%;
  `;

    return (
        <main className="Chatbot" css={chatbotStyles}>
            <HeaderNav
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