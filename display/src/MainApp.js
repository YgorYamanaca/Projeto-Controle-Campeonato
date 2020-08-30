import React from 'react'
import Home from './page/Home'
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
  } from "react-router-dom";
  
import GlobalStyle from './styles/global';
import { Provider } from 'react-redux';
import store from './store'
export default function MainApp() {
    return (
            <>
                <GlobalStyle /> 
                <Provider store={store}> 
                    <Router>
                        <Switch>
                            <Route path="/" exact     component={ Home } />
                            {/* <Route path="/register"      component={ Home } />
                            <Route path="/seeTable"      component={ Home } /> */}
                        </Switch>
                    </Router>
                </Provider>
            </>
    )
}
