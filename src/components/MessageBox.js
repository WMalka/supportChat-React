import React, { useState } from 'react';
import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://localhost:8463", { autoConnect: false });

export const MessageBox = (props) => {

    const [value, setValue] = useState("");
    const postMessage = e => {
        e.preventDefault();
        if (!value) return;
        /**
         * sending the new msg to db
         */
        const obj = {
            content: value, customer: props.cust, isAgent: props.isAgent, conversation: props.conversation
        }
        socket.emit("message", obj);
        setValue("");
        socket.connect();
    };

    return (
        <form onSubmit={postMessage}>
            <input type="text" className="input" placeholder="message"
                value={value} onChange={e => setValue(e.target.value)}
            />
        </form>
    );

};

