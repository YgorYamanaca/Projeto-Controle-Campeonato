import React from 'react'
import Home from './page/Home'
import Register from './page/Register'
import PlayerTablePage from './page/PlayerTablePage'
import TeamTablePage from './page/TeamTablePage'
import GlobalStyle from './styles/global';
import { HomePageSty, HomeTopSty, HomeContentSty} from './MainAppStyles.js';
import { Provider } from 'react-redux';
import store from './store'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
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
                            <Link to="/teamTable">Times</Link>
                            <Link to="/playerTable">Jogadores</Link>
                        </HomeTopSty>

                    <HomeContentSty>
                        <Switch>
                            <Route path="/" component={ Home } />
                            <Route path="/teamTable" component={ TeamTablePage }/>
                            <Route path="/playerTable" component={ PlayerTablePage }/>
                            <Route path="/register" component={ Register }/>       
                        </Switch>
                    </HomeContentSty>
                    </HomePageSty>
                </Provider>
            </Router>
    )
}
