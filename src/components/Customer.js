import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import socketIoClient from "socket.io-client";
import { Message } from './Message';
import Login from "./Login";
import { MessageBox } from './MessageBox'
const socket = socketIoClient("http://localhost:8463", { autoConnect: false });

const mapStateToProps = (state) => {
    return { ...state, user: state.chatReducer.user || [] }
}

const Customer = withRouter((props)=> {

    const { history } = props;
    const [messages, setMessages] = useState([]);
    const [logout, setLogout] = useState(false);

    let user;
    const currentUser = (props) => {
        props.user.map((singleUser, index) => {
            user = (singleUser.email ? singleUser : 'something')
        })
        return user;
    }

    const addMessage = (msg) => {
        setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
    };

    function endChat() {
        history.push('/');
    }
    const back = '<<<'

    useEffect(() => {
        socket.emit("login", user)
        socket.emit("allUsers")
        socket.on("login", (conver) => {
            addMessage(conver)
        });


        socket.on("message", (msg) => {
            addMessage(msg);
        });

        socket.connect();

    }, []);

    return (
        <>
            <div>
                <div id="msgBox">
                    <div id="header">
                        <button className="endChat" onClick={() => endChat()} >
                            X {logout && <Login />}
                        </button>
                        <button id="btnHistory" >{back}</button>
                        Contact Support
                    </div>
                    <div style={{ marginTop: "80px" }}></div>
                    {messages.map((msg, index) => { return (msg.customer == user.email) ? <Message msg={msg} /> : '' }
                    )}
                </div>
                <MessageBox isAgent={false} cust={user.email} conversation={user.conversation} />
            </div>
        </>
    );
});
export default connect(
    mapStateToProps,
    null
)(Customer);



