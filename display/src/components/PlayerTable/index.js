import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton/'
import api from '../../services/api'
import { useDispatch} from 'react-redux'
import { addPlayerData, removePlayerDataRequest } from '../../store/modules/playerData/actions';
import {PlayerTableContainer, PlayerTableTitle, PlayerTableContent, PlayerHeader, PlayerCell,
    PlayerTableRowSty, PlayerTableFooter, PlayerRowEmpety, PlayerTableHeader, DialogSty, DialogBoxSty, ContentSty, FooterSty} from './styles.js'

export default function PlayerTable() {
    const [renderDialog, setDialog] = useState({player:'', status:false});
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
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDialog({player:'', status:false});
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const excludePlayer = (idJogar) =>
    {
        dispatch(removePlayerDataRequest(idJogar));
        setDialog({player:'', status:false});
    }

    const renderDialogComponent = (player) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={wrapperRef}>
                    <ContentSty>
                        {`Deseja exluir ou editar ${player.nome}?`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" />
                        <AppStylizedButton contentText="Excluir" onClick={() => excludePlayer(player.id_jogador)}/>
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

    const generateDataAge = (date) =>
    {
        let auxDate = new Date(date);
        var ageDifMs = Date.now() - auxDate.getTime();
        var ageDate = new Date(ageDifMs);
        ageDate = Math.abs(ageDate.getUTCFullYear() - 1970);
        return `${auxDate.getDate()}/${(auxDate.getMonth() + 1)}/${auxDate.getFullYear()} (${ageDate} Anos)`
    }

    return (
        <PlayerTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.player) : null}
            <PlayerTableTitle>Jogadores Cadastrados</PlayerTableTitle>
            <PlayerTableContent>
                <PlayerTableHeader>
                    <PlayerHeader key={"name"}>
                        Nome
                    </PlayerHeader>
                    <PlayerHeader key={"nick"}>
                        Apelido
                    </PlayerHeader>
                    <PlayerHeader key={"age"}>
                        Data de Nascimento
                    </PlayerHeader>
                    <PlayerHeader key={"tel"}>
                        Telefone
                    </PlayerHeader>
                    <PlayerHeader key={"team"}>
                        Time
                    </PlayerHeader>
                    <PlayerHeader key={"position"}>
                        Posição
                    </PlayerHeader>  
                </PlayerTableHeader>
                {
                    playersData.map((player, index) => 
                    <PlayerTableRowSty key={index} onClick={() => setDialog({player:player, status:true})}>  
                        <PlayerCell key={player.name + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.nome}
                        </PlayerCell>
                        <PlayerCell key={player.apelido + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.apelido}
                        </PlayerCell>
                        <PlayerCell key={player.data_nasc + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateDataAge(player.data_nasc)}
                        </PlayerCell>
                        <PlayerCell key={player.telefone + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.telefone}
                        </PlayerCell>
                        <PlayerCell key={player.id_time + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.id_time}
                        </PlayerCell>
                        <PlayerCell key={player.posicao + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.posicao}
                        </PlayerCell>
                    </PlayerTableRowSty>)
                }
                </PlayerTableContent>
            {playersData.length > 0? null:<PlayerRowEmpety> Não há nenhum dado cadastrado</PlayerRowEmpety>}
            <PlayerTableFooter />
        </PlayerTableContainer>
    )
}
