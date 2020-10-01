import React from 'react'
import Home from './page/Home'
import Register from './page/Register'
import PlayerTablePage from './page/PlayerTablePage'
import ChampionshipTablePage from './page/ChampionshipTablePage'
import TeamTablePage from './page/TeamTablePage'
import GlobalStyle from './styles/global';
import { HomePageSty, HomeTopSty, HomeContentSty} from './MainAppStyles.js';
import { Provider } from 'react-redux';
import store from './store'
import {
    HashRouter as Router,
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
                            <Link to="/" replace >Home</Link>
                            <Link to="/register" replace >Cadastrar</Link>
                            <Link to="/teamTable" replace >Times</Link>
                            <Link to="/playerTable" replace >Jogadores</Link>
                            <Link to="/championshipTable" replace >Campeonatos</Link>
                        </HomeTopSty>
                    <HomeContentSty>
                        <Switch>
                            <Route exact path="/" component={ Home }/>
                            <Route path="/teamTable" component={ TeamTablePage }/>
                            <Route path="/teamTable" component={ TeamTablePage }/>
                            <Route path="/playerTable" component={ PlayerTablePage }/>
                            <Route path="/register" component={ Register }/>    
                            <Route path="/championshipTable" component={ ChampionshipTablePage }/>

                        </Switch>
                    </HomeContentSty>
                    </HomePageSty>
                </Provider>
            </Router>
    )
}
