import React, {useEffect, useState, useRef} from 'react'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { addPlayerData } from '../../store/modules/playerData/actions';
import {PlayerTableContainer, PlayerTableTitle, PlayerTableContent, PlayerHeader, PlayerCell,
    PlayerTableRowSty, PlayerTableFooter, PlayerRowEmpety, PlayerTableHeader, DialogSty, DialogBoxSty, ContentSty, FooterSty} from './styles.js'

export default function PlayerTable() {
    const [renderDialog, setDialog] = useState({playerID:'', status:false});
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
                    setDialog({playerID:'', status:false});
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

    const renderDialogComponent = (playerID) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={wrapperRef}>
                    <ContentSty>
                        Deseja exluir ou editar esse jogador.
                    </ContentSty>
                    <FooterSty>
                        <div>
                            Botão 1
                        </div>
                        <div>
                            Botão 2 
                        </div> 
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

    return (
        <PlayerTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.playerID) : null}
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
                    <PlayerTableRowSty key={index} onClick={() => setDialog({playerID:player.id_jogador, status:true})}>  
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
                    </PlayerTableRowSty>)
                }
                </PlayerTableContent>
            {playersData.length > 0? null:<PlayerRowEmpety> Não há nenhum dado cadastrado</PlayerRowEmpety>}
            <PlayerTableFooter />
        </PlayerTableContainer>
    )
}
