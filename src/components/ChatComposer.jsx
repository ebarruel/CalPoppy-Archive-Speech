/* chat tab: bottom bar */

/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import "../style/chatComposer.css";
import "../style/text.css";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { SpeechIn } from "./Speech";

export default function ChatComposer({ onSend }) {
    const [input, setInput] = useState("");

    // keyboard variables
    const [onscreenKey, setOnscreenKey] = useState(false);
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    // speech variables
    const [userSpeaker, setUserSpeaking] = useState(false);

    // keyboard functionality
    const onChange = input => {
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

    const onChangeInput = ({target}) => {
        setInput(target.value);
        console.log("set input to", input)
        if (onscreenKey) {
            keyboard.current.setInput(input);
        }
    };

    // speech functionality
    const handleUserSpeaking = userSpeaking => {
        setUserSpeaking(userSpeaking => !userSpeaking);
        <SpeechIn setInput={setInput} userSpeaking={userSpeaking} />
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
                    <input
                        className="scrollableY txtFieldStyle"
                        value={input}
                        onChange={onChangeInput}
                    />
                    <button type="button" className="sendButtonStyle" onClick={() => {console.log("input:", input); setOnscreenKey(!onscreenKey)}}>
                        <i class="bi bi-keyboard"></i>
                    </button>
                    <button type="button" className="sendButtonStyle">
                        <i class="bi bi-mic"></i>
                    </button>
                    <button type="submit" className="sendButtonStyle">
                        <i class="bi bi-send"></i>
                    </button>
                </form>
            </div>

            {onscreenKey && (
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={layout}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            )}
        </div>
    );
}