import React, { useEffect, useState } from 'react';
import { Message } from './Message';
import socketIoClient from "socket.io-client";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { MessageBox } from './MessageBox';
const socket = socketIoClient("http://localhost:8463", { autoConnect: false });

const mapStateToProps = (state) => {
    return { ...state, user: state.chatReducer.user || [] }
}

const Support = withRouter((props) =>{

    const addConversations = (msg) => {
        setConversations(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
    };

    function endChat() {
        // setLogout(true);
        setCustomer('');
        setConversations('');

    }

    const [conversations, setConversations] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [customer, setCustomer] = useState();

    useEffect(() => {
        socket.emit("allUsers")
        socket.on("allUsers", async (allUsers) => {
            setActiveUsers(oldArray => [...allUsers])
            socket.on("login", (conver) => {
                //db returns all conver ONCE.
                addConversations(conver)
            });

        })

        socket.connect();

    }, [customer])

    async function startChat(cust) {

        setCustomer(cust);
        //emit to "login" method + listen to 'conversation' + socket.on("messages")+ socket.emit(messages)
        socket.emit("login", cust)//now

        socket.on("message", (msg) => {
            addConversations(msg);//returns new message from db
        });
        socket.connect();
    }
    return (
        <>
            <div id="msgBox">
                Support Customers
                {(activeUsers) ? activeUsers.map((cust, index) => (
                    <div key={index} type="button" className="msg" >
                        <input className="custBtn" type="button" value={cust.email} onClick={() => startChat(cust)}></input>
                    </div>
                )) : <h1>No active customers</h1>
                }
            </div>

            {(customer) ? (<div>
                <div id="msgBox">
                    <div id="header">
                        Chat with {customer.email}
                        <button className="endChat" onClick={() => endChat()} >
                            X
                        </button>
                    </div>
                    <div style={{ marginTop: "80px" }}></div>
                    {(conversations) ? conversations.map((msg, index) => <Message msg={msg} />) : ''}
                </div>
                <MessageBox isAgent={true} cust={customer.email} conversation={customer.conversation} />
            </div>) : ''}

        </>
    );
})
export default connect(
    mapStateToProps,
    null
)(Support);


