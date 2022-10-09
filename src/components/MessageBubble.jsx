/** @jsxImportSource @emotion/react */
import React from "react";
import '../style/chatMsg.css';
import '../style/colors.css';
import { speechOut } from "./Speech";

export default function MessageBubble({
    text,
    /* senderID: SENDER_USER when false, SENDER_BOT when true */
    senderID,
    showFeedback,
    onFeedbackGiven,
    feedback,
    timestamp,
    }) {

    return (
        /* wrapper div for messages */
        <div className={`msgWrapper ${senderID ? "msgWrapperBot" : "msgWrapperUser"} `}>
            {/* actual message text */}
            <p className={` msg ${senderID ? "msgBot" : "msgUser"} `}>
                {text}
            </p>
            <br></br>

            <div className={` msgBtn ${!senderID ? "msgBtnUser" : ""} `}>
                {/* play message */}
                <button type="button" className="feedbackIcon" onClick={() => speechOut(text)}>
                    <i class="bi bi-megaphone"></i>
                </button>

                {/* extra bot buttons (feedback) */}
                {senderID && showFeedback && (
                    <div>
                        <button type="button"
                        className={` feedbackIcon ${typeof feedback !== "undefined" && feedback ? "feedbackIconPos" : ""} `}
                        onClick={() => onFeedbackGiven(timestamp, true)}>
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                        <button type="button"
                            className={` feedbackIcon ${typeof feedback !== "undefined" && !feedback ? "feedbackIconNeg" : ""} `}
                            onClick={() => onFeedbackGiven(timestamp, false)}>
                            <i class="bi bi-hand-thumbs-down"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
