import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { actions } from '../redux/actions/actions'
import React from "react";
import socketIoClient from "socket.io-client";


const socket = socketIoClient("http://localhost:8463", { autoConnect: false });

const mapDispatchToProps = (dispatch) => ({
    setUser: (loggedUser) => dispatch(actions.setUser(loggedUser))
})

const Login = withRouter((props) =>{

    const { history } = props;
    const [value, setValue] = useState('');

    useEffect(() => {
        socket.on("latestConversationNum", (user) => {
            const trialUser = { email: user.cust, conversation: ++user.num }
            props.setUser(trialUser)
            history.push('/Chat');
        })
        socket.connect();
    }, [])


    const email = e => {
        e.preventDefault();
        if (!value) return;
    }

    async function chat(e) {
        e.preventDefault();
        socket.emit("latestConversationNum", value)
    }

    return (
<>
            <div id="msgBox">

            </div>
            <label>Login to Chat</label>
            <form onSubmit={email}>
                <input type="text" onChange={e => setValue(e.target.value)} className="input" placeholder="email" name="email" />
                <button type="button" onClick={chat} style={{ fontSize: "24px", position: 'absolute', left: '400', bottom: '5px' }}>
                    start chat
                </button>
            </form>
        </>
    )


});

export default connect(
    null,
    mapDispatchToProps
)(Login);