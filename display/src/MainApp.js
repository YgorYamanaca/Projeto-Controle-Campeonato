import React from 'react'
import Home from './page/Home'
import Register from './page/Register'
import PlayerTablePage from './page/PlayerTablePage'
import GlobalStyle from './styles/global';
import { HomePageSty, HomeTopSty, HomeContentSty} from './MainAppStyles.js';
import { Provider } from 'react-redux';
import store from './store'
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
  } from "react-router-dom";

export default function MainApp() {
    return (    
            <Router>
                <GlobalStyle /> 
                <Provider store={store}>
                    <HomePageSty>
                        <HomeTopSty>
                            <Link to="/">Home</Link>
                            <Link to="/register">Cadastrar</Link>
                            <Link to="/register">Times</Link>
                            <Link to="/playerTable">Jogadores</Link>
                        </HomeTopSty>

                    <HomeContentSty>
                        <Switch>
                            <Route path="/" exact component={ Home } />
                            
                            <Route path="/playerTable" component={ PlayerTablePage } />
                            <Route path="/register" component={ Register } />
                        </Switch>
                    </HomeContentSty>
                    </HomePageSty>
                </Provider>
            
            </Router>
    )
}
