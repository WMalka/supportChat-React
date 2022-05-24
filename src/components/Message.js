import React from 'react';


export const Message = ({ msg }) => {
    let message = '';
    let cls = '';
    if (msg.isAgent) {
        message = 'Support'
        cls = "msg-r"
    }
    else {
        message = msg.customer
        cls = "msg-l"

    }

    return (
        <>
            <div className={cls}>
                <span style={{color:"black",fontWeight:"bold"}}>{message}</span>
                <span > {new Date(msg.date).toLocaleTimeString()} </span>
                <span style={{backgroundColor: "rgb(135, 186, 245)"}}> {msg.content} </span>
            </div>
        </>
    );

};
