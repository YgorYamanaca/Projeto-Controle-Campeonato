import React from 'react'
import PlayerRegister from './components/PlayerRegister/'
import PlayerTable from './components/PlayerTable/'
import GlobalStyle from './styles/global';

export default function MainApp() {
    return (
        <>
            <GlobalStyle />
            <PlayerTable />
            <PlayerRegister />
        </>
    )
}
