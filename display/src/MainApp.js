import React from 'react'
import PlayerRegister from './components/PlayerRegister/'
import PlayerTable from './components/PlayerTable/'
import TeamRegister from './components/TeamRegister/'
import GlobalStyle from './styles/global';
import { Provider } from 'react-redux';
import store from './store'
export default function MainApp() {
    return (
            <>
                <GlobalStyle /> 
                
                <Provider store={store}> 
                    <TeamRegister/>
                    <PlayerRegister />
                    <PlayerTable />

                </Provider>
            </>
    )
}
