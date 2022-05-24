import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Support from "./components/Support";
import Customer from "./components/Customer";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";

const App = (props) => {


    return (
        <>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/Chat'><Customer /></Route>
                        <Route exact path='/'><Login /></Route>
                        <Route exact path='/Admin'><Support /></Route>
                    </Switch>
                </Router>
            </Provider>
        </>
    );

};



export default App;
