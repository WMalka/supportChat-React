import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Support from "./components/Support";
import Customer from "./components/Customer";

import Login from "./components/Login";

const App = () => {


    return (
                <Router>
                    <Switch>
                        <Route exact path='/Chat'><Customer /></Route>
                        <Route exact path='/'><Login /></Route>
                        <Route exact path='/Admin'><Support /></Route>
                    </Switch>
                </Router>
    );

};



export default App;
