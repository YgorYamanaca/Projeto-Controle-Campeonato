import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton/'
import AppStylizedSelect from '../AppStylizedSelect/'
import MaskedInput from 'react-input-mask'
import api from '../../services/api'
import { useDispatch} from 'react-redux'
import { addTeamsData } from '../../store/modules/teamsData/actions';
import  UserMessage  from '../UserMessage/'
import { addPlayerData, removePlayerDataRequest, editDataPlayerRequest } from '../../store/modules/playerData/actions';
import {PlayerTableContainer, PlayerTableTitle, PlayerTableContent, PlayerHeader, PlayerCell,
    PlayerTableRowSty, PlayerTableFooter, PlayerRowEmpety, PlayerTableHeader, DialogSty,
     DialogBoxSty, ContentSty, FooterSty, EditBox, Edit, EditTitle, PlayerEditTableRowSty, PlayerEditCell,
     EditContent, InputBox} from './styles.js'

export default function PlayerTable() {
    const dispatch = useDispatch();
    const [renderDialog, setDialog] = useState({player:'', status:false});
    const playersData = useSelector(state => state.playerData.data);
    const playerRequestMessage = useSelector(state => state.playerData.userMessage);
    const [message, setMessage] = useState({message:'', status:''});
    const [editEnable, setEdit] = useState(false);
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const [name, setName] = useState("");
    const [nick, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [tel, setTel] = useState("");
    const [level, setLevel] = useState("");
    const [position, setPosition] = useState();
    const birthRegex = (/([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/);
    const telRegex = (/^\([0-9]{2}(?:\))\s?[0-9]{4}(?:-)[0-9]{4}$/);
    const regexName = (/^[a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
    const futebolPositionOptions = [
        { label: 'Goleiro'},
        { label: 'Zagueiro'},
        { label: 'Lateral Direito'},
        { label: 'Lateral Esquerdo'},
        { label: 'Volante'},
        { label: 'Meia'},
        { label: 'Atacante'},
    ]
    const teamsOption = useSelector(state => state.teamsData.data);

    useEffect(() => {
        api.get("/time")
        .then(res => {
            dispatch(addTeamsData(res.data));
        })
        .catch(error => {
            setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
        })
    }, [dispatch, setMessage]);

    useEffect(() => {
        api.get("/jogador")
        .then(res => {
            dispatch(addPlayerData(res.data));
        })
        .catch(error => {
            setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
        })
    }, [dispatch, setMessage]);

    useEffect(() => {
        setMessage(playerRequestMessage)
    }, [playerRequestMessage])
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const wrapperRef2 = useRef(null);
    useOutsideAlerter2(wrapperRef2);
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

    function useOutsideAlerter2(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                     setEdit(false)
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

    const generateTeamLabel = (teamValue) => {
        var aux = teamValue.map(team => ({
            label: team.nome,
            value: team.id_time
        }))
        return aux;
    }

    const generateEditContent = (row) => 
    {
        switch(row)
        {
            case 'name':
            return(          
                 <div>
                    <InputBox>
                    <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do time..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={regexName.test(name)?false : true}/>
                </div>

            );
            case 'nick':
            return(
                <div>
                    <InputBox>
                    <label>Apelido:</label> <input id="NameInput" placeholder="Insira o nome do time..." type="text"  maxLength={50} value={nick} onChange={event => setNickName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={regexName.test(nick)?false : true}/>
                </div>

            );
            case 'birth':
            return(
                <div>
                    <InputBox>
                        <label>Data de Nascimento:</label>
                        <MaskedInput
                            mask="99/99/9999"
                            className="TextInput"
                            placeholder="Insira a data..."
                            value={birth}
                            id="AgeInput"
                            maskChar={null}
                            onChange={(event) => setBirth(event.target.value)}
                            style={{width: '100px'}}
                            />
                    </InputBox>
                     <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={birthRegex.test(birth)?false : true}/>
                </div>
            );
            case 'tel':
            return(
                <div>
                    <InputBox>
                        <label>Telefone:</label> 
                        <MaskedInput
                            mask="(99) 9999-9999"
                            className="TextInput"
                            placeholder="Insira o telefone..."
                            value={tel}
                            id="TelInput"
                            maskChar={null}
                            onChange={(event) => setTel(event.target.value)}
                            />
                    </InputBox>
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={telRegex.test(tel)?false : true}/>
                </div>
            );
            case 'time':
            return(
                <div>
                    <AppStylizedSelect
                        id="Team" 
                        title="Time:"
                        placeholder="Selecione o time..."
                        handleFunction = {setLevel}
                        options = {generateTeamLabel(teamsOption)}                
                        />
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={level ?false : true}/>
                </div>
            );
            case 'posicao':
            return(
                <div>
                    <AppStylizedSelect
                        id="Postion" 
                        title="Posição:"
                        placeholder="Selecione a posição..."
                        options = {futebolPositionOptions} 
                        handleFunction = {setPosition}
                        defaultSelectedLabel={position}  
                    />
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditPlayer(); clearEdit()}} disabled={position ?false : true}/>
                </div>
            );
            default:
            return '';
        }
    }

    const handleEditPlayer = () =>
    {
        dispatch(editDataPlayerRequest(rowEdit.row, name, tel, teamsOption[teamsOption.findIndex(element => element.id_time === level.value)], position, nick, birth))
        
        setDialog({team:'', status:false});
        setRowEdit({row:'', rowType:'', status:false})
    }

    const clearEdit = () =>
    {
        setName("");
        setBirth("");
        setNickName("");
        setPosition("");
        setTel("");
        setLevel("");
    }
    const renderDialogComponent = (player) => {
        return(
            <DialogSty>
                {editEnable?
                <EditBox>
                    <Edit ref={editEnable? wrapperRef2 : null}>
                        <EditTitle>{`Editando ${player.nome}`}</EditTitle>
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
                            <PlayerHeader key={"Player"}>
                                Time
                            </PlayerHeader>
                            <PlayerHeader key={"position"}>
                                Posição
                            </PlayerHeader> 
                            </PlayerTableHeader>
                                <PlayerEditTableRowSty >  
                                    <PlayerEditCell key={player.nome + 'nome'} onClick={() => setRowEdit({rowType:'name', row:player, status:true})}>
                                        {player.nome}
                                    </PlayerEditCell>
                                    <PlayerEditCell key={player.apelido + 'nick'} onClick={() => setRowEdit({rowType:'nick', row:player, status:true})}>
                                        {player.apelido}
                                    </PlayerEditCell>
                                    <PlayerEditCell key={player.data_nasc} onClick={() => setRowEdit({rowType:'birth', row:player, status:true})}>
                                        {generateDataAge(player.data_nasc)}
                                    </PlayerEditCell>
                                    <PlayerEditCell key={player.telefone} onClick={() => setRowEdit({rowType:'tel', row:player, status:true})}>
                                        {player.telefone}
                                    </PlayerEditCell>
                                    <PlayerEditCell key={player.Time?  player.Time.nome + player.nome : null} onClick={() => setRowEdit({rowType:'time', row:player, status:true})}>
                                        {player.Time? player.Time.nome : null}
                                    </PlayerEditCell>
                                    <PlayerEditCell key={player.posicao + player.nome} onClick={() => setRowEdit({rowType:'posicao', row:player, status:true})}>
                                        {player.posicao}
                                    </PlayerEditCell>
                                </PlayerEditTableRowSty>
                        </PlayerTableContent>
                        <EditContent>
                            {rowEdit.status?
                            <div>
                                 Editar:
                                {generateEditContent(rowEdit.rowType)}
                            </div> : null}
                        </EditContent>
                        <PlayerTableFooter>
                            <AppStylizedButton contentText="Cancelar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); setEdit(false)}}/>
                        </PlayerTableFooter>
                    </Edit>
                </EditBox> : null}
                <DialogBoxSty ref={!editEnable? wrapperRef : null}>
                    <ContentSty>
                        {`Deseja exluir ou editar ${player.nome}?`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" onClick={() => setEdit(true)}/>
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
                    <PlayerHeader key={"Player"}>
                        Time
                    </PlayerHeader>
                    <PlayerHeader key={"position"}>
                        Posição
                    </PlayerHeader>  
                </PlayerTableHeader>
                {
                    playersData.length > 0?
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
                        <PlayerCell key={player.Time? player.Time.nome + index + player.name : null} styless={index % 2 === 0? 'Par' : ''}>
                            {player.Time? player.Time.nome : null}
                        </PlayerCell>
                        <PlayerCell key={player.posicao + index} styless={index % 2 === 0? 'Par' : ''}>
                            {player.posicao}
                        </PlayerCell>
                    </PlayerTableRowSty>) : null
                }
                </PlayerTableContent>
            {playersData.length > 0? null:<PlayerRowEmpety> Não há nenhum dado cadastrado</PlayerRowEmpety>}
            <PlayerTableFooter> 
                {message? <UserMessage message={message} /> : null}
            </PlayerTableFooter>
        </PlayerTableContainer>
    )
}
