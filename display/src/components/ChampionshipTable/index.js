import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {ChampionshipTableContainer, ChampionshipTableTitle, ChampionshipTableContent, ChampionshipHeader, ChampionshipCell,
    ChampionshipTeamTableRowSty, ChampionshipTableFooter, ChampionshipTeamRowEmpety, ChampionshipTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, GamesTableGroupHeader,
    ChampionshipEditTableRowSty, ChampionshipEditCell, EditContent, InputBox, GroupchampionshipTableContent, 
    GroupChampionshipEditTableRowSty, GroupchampionshipTablename, GamesTable, GamesTableHeader, GamesTableRow} from './styles.js'
import UserMessage from '../UserMessage/'
import { addPlayerData } from '../../store/modules/playerData/actions';
import { editChampionShipRequest, addMultiChampionship, removeChampionshipDataRequest } from '../../store/modules/championshipData/actions';
import api from '../../services/api'
import { useDispatch } from 'react-redux' 
import getGroupIDRequest from '../../services/getGroupIDRequest';
import getGamesbyGroup from '../../services/getGamesbyGroup';
import "react-datepicker/dist/react-datepicker.css";
import AppStylizedSelect from '../AppStylizedSelect/'

export default function ChampionshipTable() {
    const [players, setPlayers] = useState(false);
    const [expandGames,  setExpandGames] = useState(false);
    const [expand, setGamesDetail] = useState(false);
    const [expandTeam,  setExpand] = useState(false);
    const [renderDialog, setDialog] = useState({championShip:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9]+$/);
    //const regexDate = (/([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/);
    const dispatch = useDispatch();
    const championships = useSelector(state=>state.championshipData.data)
    const playersData = useSelector(state => state.playerData.data);
    const userMessage = useSelector(state => state.championshipData.userMessage)
    useEffect(() => {
        api.get("/jogador")
        .then(res => {
            dispatch(addPlayerData(res.data));
        })
        .catch(error => {
            setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
        })
    }, [dispatch, setMessage]);

    const generateDataAge = (date) =>
    {
        let auxDate = new Date(date);
        return `${auxDate.getDate()}/${(auxDate.getMonth() + 1)}/${auxDate.getFullYear()}`
    }
    useEffect(() => {
        setMessage(userMessage)
    }, [userMessage])
    
    useEffect(() => {
        api.get("/campeonato")
        .then(res => {
            dispatch(addMultiChampionship(res.data));
        })
        .catch(error => {
            setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
        })
    }, [dispatch]);

    const wrapperRef = useRef(null);
    const wrapperRef2 = useRef(null);
    const wrapperRef3 = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDialog({championShip:'', status:false});
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
    
    useOutsideAlerter2(wrapperRef2);
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

    useOutsideAlerter3(wrapperRef3);
    function useOutsideAlerter3(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                     setGamesDetail(false)
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
        
    const excludeChamp = (idChamp) =>
    {
        dispatch(removeChampionshipDataRequest(idChamp));
        setDialog({championShip:'', status:false});
     }
    // const validaData = (inicio, fim)=>{ 
    //     let [dayInicio, monthInicio, yearInicio] = inicio.split("/")
    //     let [dayFim, monthFim, yearFim] = fim.split("/") 
    //     let newDataInicio = new Date(yearInicio, monthInicio-1, dayInicio );
    //     let newDataFim = new Date(yearFim, monthFim-1, dayFim);
    //     if(newDataInicio > new Date() && newDataInicio<newDataFim && regexDate.test(inicio) && regexDate.test(fim)){
    //         return true
    //     }
    //    else{
    //         return false
    //    }   
    // }
    const generateEditContent = (row) => 
    {
        switch(row)
        {
            case 'nome':
            return (
                <div>
                    <InputBox>
                        <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do Campeonato..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexName.test(name)? false : true}/>
                </div>             
            );
            
            // case 'dt_inicio':
            // return (
            //     <div>
            //         <InputBox>
            //             <label>Data de início:</label>
            //             <DatePicker
            //                 dateFormat="dd/MM/yyy"
            //                 selected={fim}
            //                 onChange={date => setFim(date)}
            //                 minDate={new Date()}
            //                 showDisabledMonthNavigation
            //                 placeholderText="Clique para começar..."
            //             />
            //         </InputBox>
            //         <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexDate.test(inicio)? false : true}/>
            //     </div>
            //     );

            // case 'dt_fim':
            //     return (
            //         <div>
            //             <InputBox>
            //                 <label>Data de Encerramento:</label>
            //                 <DatePicker
            //                 dateFormat="dd/MM/yyy"
            //                 selected={fim}
            //                 onChange={date => setFim(date)}
            //                 minDate={new Date()}
            //                 showDisabledMonthNavigation
            //                 placeholderText="Clique para começar..."
            //             />
            //             </InputBox>
            //             <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexDate.test(fim) && validaData(inicio,fim)? false : true}/>
            //         </div>
            //         );

            default:
                return '';
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }
    
    const handleEditChampionShip = () =>
    {
        dispatch(editChampionShipRequest(rowEdit.row, name, inicio, fim))
        
        setDialog({championShip:'', status:false});
        setRowEdit({row:'', rowType:'', status:false})
    }

    const clearEdit = () =>
    {
        setName("");
        setInicio("");
        setFim("");
    }
       
    async function expandGroup(championShip) {
        const groups = await getGroupIDRequest(championShip.id_campeonato);
        const jogos = await getGamesbyGroup(championShip.id_campeonato);
        setExpandGames(jogos)
        setExpand(groups)
    }

    const generateGames = () => {
        return (
                expandGames? expandGames.map((grupo, index) => {
                    return(
                    <div style={{margin:'10px 0'}} key={'div' + index}>
                        <GamesTableGroupHeader key={'text' + index}>   
                            Jogos do {grupo.nome}
                        </GamesTableGroupHeader>
                        <GamesTable key={'table' + index}>
                            <GamesTableHeader key={'date' + index}>Datas</GamesTableHeader>
                            <GamesTableHeader key={'games' + index}>Jogos</GamesTableHeader>
                            {grupo? grupo.jogos.map((games, index) => {
                            return(
                                <React.Fragment key={index}>
                                    <GamesTableRow key={'gameDate' + index}>
                                        {formatDate(games.data)}
                                    </GamesTableRow>

                                    <GamesTableRow key={'gameTeam' + index} onClick={() => setGamesDetail(games)}>
                                        {games.time1.nome} - {games.time2.nome}
                                    </GamesTableRow>
                                </React.Fragment>    )})
                                : null}
                        </GamesTable>
                    </div>)})
                : null)
    }
    const generateTeamState = () => {
        return(
            <div style={{display:'flex'}}>
                {expandTeam? expandTeam.map((grup, index) => {
                    return(
                        <GroupchampionshipTableContent key={grup.nome + index}>
                            <GroupchampionshipTablename key={grup.nome + index}>{grup.nome}</GroupchampionshipTablename>
                                {grup.times.map(time => {
                                    return(
                                        <GroupChampionshipEditTableRowSty key={time.nome + index} style={{color:'black'}}>
                                            {time.nome}
                                        </GroupChampionshipEditTableRowSty>
                                    )
                                })}
                        </GroupchampionshipTableContent>
                    )
                })
                    :null}
            </div>
        )
    }

    const renderDialogComponent = (championShip) => {
        return(
            <DialogSty>
                {editEnable?
                <EditBox>
                    <Edit ref={editEnable? wrapperRef2 : null}>
                        <ChampionshipTableTitle>{`Editando ${championShip.nome}`}</ChampionshipTableTitle>
                        <ChampionshipTableContent>
                        <ChampionshipTableHeader>
                            <ChampionshipHeader key={"championName"}>
                                Nome do Campeonato
                            </ChampionshipHeader>
                            <ChampionshipHeader key={"championIniData"}>
                                Data de inicio
                            </ChampionshipHeader> 
                            <ChampionshipHeader key={"championFimData"}>
                                Data de Fim
                            </ChampionshipHeader> 
                        </ChampionshipTableHeader>
                        <ChampionshipEditTableRowSty>
                            <ChampionshipEditCell key={championShip.nome} onClick={() => setRowEdit({rowType:"nome", row:championShip, status:true})}>
                                {championShip.nome}
                            </ChampionshipEditCell>
                            <ChampionshipEditCell key={championShip.dt_inicio} onClick={() => setRowEdit({rowType:"dt_inicio", row:championShip, status:true})}>
                                {generateDataAge(championShip.dt_inicio)}
                            </ChampionshipEditCell>
                            <ChampionshipEditCell key={championShip.dt_fim} onClick={() => setRowEdit({rowType:"dt_fim", row:championShip, status:true})}>
                                {generateDataAge(championShip.dt_fim)}
                            </ChampionshipEditCell>
                        </ChampionshipEditTableRowSty>
                        </ChampionshipTableContent>
                        <EditContent>
                            {rowEdit.status?
                            <div>
                                 Editar:
                                {generateEditContent(rowEdit.rowType)}

                            </div> : null}
                        </EditContent>
                        <ChampionshipTableFooter>
                            <AppStylizedButton contentText="Cancelar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); setEdit(false)}}/>
                        </ChampionshipTableFooter>
                    </Edit>
                </EditBox> : null}

                <DialogBoxSty ref={!editEnable? wrapperRef : null}>
                    <ContentSty>
                        {`Deseja exluir ou editar ${championShip.nome}.`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" onClick={() => setEdit(true)}/>
                        <AppStylizedButton contentText="Excluir" onClick={() => excludeChamp(championShip.id_campeonato)}/>
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

    const generatePlayerTable = (player) => {
        let newPlayer = player;
        newPlayer = newPlayer.filter(element => {return (element.Time.id_time === expand.time1.id_time || element.Time.id_time === expand.time2.id_time)})
        return newPlayer.map(element => {return({value:element.id_jogador, label:element.nome})})
    }

    const sendData = (data, type) => {
        switch(type)
        {
            case 'gol':
                return(
                    api.post(`/jogo/${data.id_jogo}/gol`, {id_jogador:data.id_jogador})
                    .then(res => {
                    })
                    .catch(error => {
                        setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
                    })
                )
            case 'cardYellow':
                return(
                    api.post(`/jogo/${data.id_jogo}/cartao`, {id_jogador:data.id_jogador, tipo:'Amarelo'})
                    .then(res => {
                    })
                    .catch(error => {
                        setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
                    })
                )
            case 'cardRed':
                return(
                    api.post(`/jogo/${data.id_jogo}/cartao`, {id_jogador:data.id_jogador, tipo:'Vermelho'})
                    .then(res => {
                    })
                    .catch(error => {
                        setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
                    })
                )
            default:    
        }   
    }

    const renderDialogComponentGames = () => {
        return(
            <DialogSty>
                <DialogBoxSty ref={expand? wrapperRef3 : null}>
                    <ContentSty>
                        {`Selecione o jogador para atribuir um cartão ou gol.`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedSelect
                        id="Player" 
                        title="Jogador"
                        placeholder="Selecione o time..."
                        handleFunction = {setPlayers}
                        options = {generatePlayerTable(playersData)}                
                        />

                        <AppStylizedButton contentText="Inserir Gol" onClick={() => sendData({id_jogador:players.value, id_jogo:expand.id_jogo}, 'gol')} disabled={players? false:true}/>
                        <AppStylizedButton contentText="Inserir Cartão Amarelo" onClick={() => sendData({id_jogador:players.value, id_jogo:expand.id_jogo, tipo:'Amarelo'}, 'cardYellow')} disabled={players? false:true}/>
                        <AppStylizedButton contentText="Inserir Cartão Vermelho" onClick={() => sendData({id_jogador:players.value, id_jogo:expand.id_jogo, tipo:'Vermelho'}, 'cardRed')} disabled={players? false:true}/>
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

    return (
        <ChampionshipTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.championship) : null}
            {expand? renderDialogComponentGames() : null}
            <ChampionshipTableTitle>Campeonatos Cadastrados</ChampionshipTableTitle>
            <ChampionshipTableContent>
                <ChampionshipTableHeader>
                    <ChampionshipHeader key={"championShip"}>
                        Nome do Campeonato
                    </ChampionshipHeader>
                    <ChampionshipHeader key={"championShipdata1"}>
                        Data de Inicio
                    </ChampionshipHeader> 
                    <ChampionshipHeader key={"championShipdata2"}>
                        Data de Final
                    </ChampionshipHeader> 
                </ChampionshipTableHeader>
                {championships?
                    championships.map((championship, index) => 
                    <ChampionshipTeamTableRowSty key={index} onClick={() => setDialog({championship:championship, status:true})} onMouseOver={() => expandGroup(championship)}>  
                        <ChampionshipCell key={championship.nome + index} styless={index % 2 === 0? 'Par' : ''}>
                            {championship.nome}
                        </ChampionshipCell>
                        <ChampionshipCell key={championship.dt_inicio + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateDataAge(championship.dt_inicio)}
                        </ChampionshipCell>
                        <ChampionshipCell key={championship.dt_fim + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateDataAge(championship.dt_fim)}
                        </ChampionshipCell>
                    </ChampionshipTeamTableRowSty>)
                :null}
            {championships && championships.length > 0? null:<ChampionshipTeamRowEmpety> Não há nenhum dado cadastrado</ChampionshipTeamRowEmpety>}
            {expandTeam.length > 0? 
            generateTeamState()
            : null}
            {expandGames.length > 0?
            generateGames()
            :null}
            </ChampionshipTableContent>
            
            <ChampionshipTableFooter>
                {message.message? <UserMessage message={message} /> : null}
            </ChampionshipTableFooter>
        </ChampionshipTableContainer>
    )
}
