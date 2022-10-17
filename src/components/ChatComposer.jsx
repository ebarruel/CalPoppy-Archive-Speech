/* chat tab: bottom bar */

/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import "../style/chatComposer.css";
import "../style/text.css";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { SpeechIn } from "./Speech";
import { useEffect } from "react";

export default function ChatComposer({ onSend }) {
    const [input, setInput] = useState("");

    // keyboard variables
    const [onscreenKey, setOnscreenKey] = useState(false);
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    // speech variables
    const [userSpeaking, setUserSpeaking] = useState(false);

    // keyboard functionality
    const onChangeKey = input => {
        setInput(input);
        // console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button, e) => {
        // console.log("Button pressed", button);

        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") sendMessage(e);
    };

    const onChange = ({target}) => {
        console.log(target);
        setInput(target.value);
        console.log("set input to", input)
        keyboard.current.setInput(input);
    };

    // speech functionality
    const handleUserSpeaking = () => {
        setUserSpeaking(!userSpeaking);
    }

    const onChangeSpeech = input => {
        setInput(input);
    }

    // Takes the message from the content editable field and sends it out
    function sendMessage(e) {
        e.preventDefault();

        if (input) {
            onSend(input);
            setInput("");
            if (onscreenKey) {
                keyboard.current.clearInput();
            }
            
        }
        return;
    }

    return (
        <div>
            <div className="menuBarStyle">
                <form className="contentStyle" onSubmit={sendMessage}>
                    {/* text field */}
                    <input
                        className="scrollableY txtFieldStyle"
                        value={input}
                        onChange={onChange}
                        placeholder="Chat with Poppy!"
                    />
                    {/* toggle keyboard */}
                    <button type="button" className={ `chatOptStyle ${onscreenKey ? "chatOptActive" : ""}` } onClick={() => {setOnscreenKey(!onscreenKey)}}>
                        <i class="bi bi-keyboard"></i>
                    </button>
                    {/* toggle speech to text */}
                    <button type="button" onClick={handleUserSpeaking}className={`chatOptStyle ${userSpeaking ? "chatOptActive" : ""}`}>
                        <i class="bi bi-mic"></i>
                        <SpeechIn
                            onChange={onChangeSpeech}
                            userSpeaking={userSpeaking}
                            setUserSpeaking={setUserSpeaking}
                        />
                    </button>
                    {/* send button */}
                    <button type="submit" className="chatOptStyle">
                        <i class="bi bi-send"></i>
                    </button>
                </form>
            </div>

            <div className={` ${ !onscreenKey ? "hidden" : "" }`}>
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={layout}
                    onChange={onChangeKey}
                    onKeyPress={onKeyPress}
                />
            </div>
        </div>
    );
}