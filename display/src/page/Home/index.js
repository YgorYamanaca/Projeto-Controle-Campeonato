import React from 'react'
import AppStylizedButton from '../../components/AppStylizedButton/'
import { HomePageSty, HomeTopSty, HomeContentSty, TopTextStyle } from './styles.js'

export default function Home() {
    return (
        <HomePageSty>
            <HomeTopSty>
                <TopTextStyle>
                    Cadastrar
                </TopTextStyle>
                <TopTextStyle>
                    Times
                </TopTextStyle>
                <TopTextStyle>
                    Jogadores
                </TopTextStyle>

            </HomeTopSty>
            <HomeContentSty>

            </HomeContentSty>
        </HomePageSty>
    )
}
