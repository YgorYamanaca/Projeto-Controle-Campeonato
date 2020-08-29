import React, {useEffect} from 'react'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { addPlayerData } from '../../store/modules/playerData/actions';
import {PlayerTableContainer, PlayerTableTitle, PlayerTableContent, PlayerHeader, PlayerCell,
    PlayerTableSty, PlayerTableFooter, PlayerRowEmpety} from './styles.js'

export default function PlayerTable() {
    const playersData = useSelector(state => state.playerData);
    const dispatch = useDispatch();
    useEffect(() => {
        api.get("/jogador")
        .then(res => {
            dispatch(addPlayerData(res.data));
        })
        .catch(error => {
            console.log(error);
        })
    }, [dispatch]);

    return (
        <PlayerTableContainer>
            <PlayerTableTitle>Jogadores Cadastrados</PlayerTableTitle>
            <PlayerTableContent>
                <PlayerTableSty>
                    <PlayerHeader>
                        Nome
                    </PlayerHeader>
                    <PlayerHeader>
                        Apelido
                    </PlayerHeader>
                    <PlayerHeader>
                        Idade
                    </PlayerHeader>
                    <PlayerHeader>
                        Telefone
                    </PlayerHeader>
                    <PlayerHeader>
                        Time
                    </PlayerHeader>
                    <PlayerHeader>
                        Posição
                    </PlayerHeader>

                    {
                        playersData.map((player, index) => 
                        <>
                            <PlayerCell key={player.name + index}>
                                {player.nome}
                            </PlayerCell>
                            <PlayerCell key={player.apelido + index}>
                                {player.apelido}
                            </PlayerCell>
                            <PlayerCell key={player.idade + index}>
                                {player.idade}
                            </PlayerCell>
                            <PlayerCell key={player.telefone + index}>
                                {player.telefone}
                            </PlayerCell>
                            <PlayerCell key={player.time + index}>
                                {player.time}
                            </PlayerCell>
                            <PlayerCell key={player.posicao + index}>
                                {player.posicao}
                            </PlayerCell>
                        </>)
                    }
                </PlayerTableSty>
            </PlayerTableContent>
            {playersData.length > 0? null:<PlayerRowEmpety> Não há nenhum dado cadastrado</PlayerRowEmpety>}
            <PlayerTableFooter />
        </PlayerTableContainer>
    )
}
