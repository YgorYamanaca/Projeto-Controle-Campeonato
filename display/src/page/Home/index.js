import React from 'react'
import {LogoEditor, Descricao, HomeContainer } from './styles.js'
import logo from '../../medias/logo.png'

export default function Home() {
    return (
        <HomeContainer>
            <LogoEditor src={logo} alt="logo"/> 
            <Descricao>Gerenciador de Campeonatos</Descricao>
        </HomeContainer>
    )
}
