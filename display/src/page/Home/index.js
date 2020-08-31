import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import Register from '../../page/Register'
import AppStylizedButton from '../../components/AppStylizedButton/'
import {LogoEditor, Descricao, HomeContainer } from './styles.js'
import logo from '../../medias/logo.png'

export default function Home() {
    return (
        <HomeContainer>
            aaaaaaaaa
            <LogoEditor src={logo} alt="logo"/> 
        </HomeContainer>
    )
}
