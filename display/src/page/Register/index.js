import React from 'react'
import PlayerRegister from '../../components/PlayerRegister'
import TeamRegister from '../../components/TeamRegister'
import ChampionshipRegister from '../../components/ChampionshipRegister'

export default function Register() {
    return (
        <>
            <TeamRegister/>
            <PlayerRegister/>   
            <ChampionshipRegister/>
        </>
    )
}
