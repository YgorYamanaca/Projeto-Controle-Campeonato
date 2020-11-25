import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {ChampionshipTableContainer, ChampionshipTableTitle, ChampionshipTableContent, ChampionshipHeader, ChampionshipCell,
    ChampionshipTeamTableRowSty, ChampionshipTableFooter, ChampionshipTeamRowEmpety, ChampionshipTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, GamesTableGroupHeader,
    ChampionshipEditTableRowSty, ChampionshipEditCell, EditContent, InputBox, GroupchampionshipTableContent, 
    GroupChampionshipEditTableRowSty, GroupchampionshipTablename, GamesTable, GamesTableHeader, GamesTableRow, TopScorer} from './styles.js'
import UserMessage from '../UserMessage/'
import { addPlayerData } from '../../store/modules/playerData/actions';
import { editChampionShipRequest, addMultiChampionship, removeChampionshipDataRequest } from '../../store/modules/championshipData/actions';
import api from '../../services/api'
import { useDispatch } from 'react-redux' 
import getGroupIDRequest from '../../services/getGroupIDRequest';
import getGamesbyGroup from '../../services/getGamesbyGroup';
import getPontuationbyGroup from '../../services/getPontuationbyGroup';
import "react-datepicker/dist/react-datepicker.css";
import AppStylizedSelect from '../AppStylizedSelect/'

export default function ChampionshipTable() {
    const [players, setPlayers] = useState(false);
    const [expandGames,  setExpandGames] = useState(false);
    const [expand, setGamesDetail] = useState(false);
    const [expandTeam,  setExpand] = useState(false);
    const [gamesPoints, setPoint] = useState(false);
    const [renderDialog, setDialog] = useState({championShip:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const [expandGols, setGolsDialog] = useState(false);
    const [expandCards, setCardsDialog] = useState(false);
    const [topScorer, setTopScorer] = useState({});
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
    const wrapperRef4 = useRef(null);
    const wrapperRef5 = useRef(null);

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

    useOutsideAlerter4(wrapperRef4);
    function useOutsideAlerter4(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setGolsDialog(false)
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
    useOutsideAlerter5(wrapperRef5);
    function useOutsideAlerter5(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCardsDialog(false)
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
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={name !== ''? false : true}/>
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
    
    const compareDate = (date) =>
    {
        let toDay = new Date().setHours(0,0,0,0);
        return new Date(date).setHours(0,0,0,0) === toDay? true : false
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
        const pontos = await getPontuationbyGroup(championShip.id_campeonato);
        if(championShip.grupos.some(grupo => grupo.jogos.some(jogo => jogo.Gols.length > 0)))
            setTopScorer(findNumberOneGol(championShip))
        setPoint(pontos);
        setExpandGames(jogos);
        setExpand(groups);
    }

    function golsObject (jogos)
    {
        const a = jogos.Gols.reduce((r, o) => {
            r.push(o.id_time);
            return r
        }, []);

        return a;
    }
    
    function countGols (id, gols)
    {
        let count = 0;
        for(let i = 0; i < gols.length; ++i){
            if(gols[i] === id)
                count++;
        }

        return count;
    }
    const generateGames = () => {
        return (
                expandGames? expandGames.map((grupo, indexGrupo) => {
                    return(
                    <div style={{margin:'10px 0'}} key={'div' + indexGrupo}>
                        <GamesTableGroupHeader key={'text' + indexGrupo}>   
                            Jogos do {grupo.nome}
                        </GamesTableGroupHeader>
                        <GamesTable key={'table' + indexGrupo}>
                            <GamesTableHeader key={'date' + indexGrupo}>Datas</GamesTableHeader>
                            <GamesTableHeader key={'games' + indexGrupo}>Jogos</GamesTableHeader>
                            <GamesTableHeader key={'gols' + indexGrupo}>Gols</GamesTableHeader>
                            <GamesTableHeader key={'cards' + indexGrupo}>Cartões</GamesTableHeader>
                            {grupo? grupo.jogos.map((games, index) => {
                                const gols = golsObject(games);
                            return(
                                <React.Fragment key={index + 'ReactFragment'}>
                                    <GamesTableRow toDay={compareDate(games.data)} key={'gameDate' + index}>
                                        {formatDate(games.data)}
                                    </GamesTableRow>

                                    <GamesTableRow toDay={compareDate(games.data)} className='teamGame' key={'gameTeam' + index} onClick={() => {games.grupoIndex = indexGrupo; setGamesDetail(games)}}>
                                        {games.time1.nome} {countGols(games.id_time1, gols)} X {countGols(games.id_time2, gols)} {games.time2.nome}
                                    </GamesTableRow>

                                    <GamesTableRow toDay={compareDate(games.data)} className='teamGols' key={'teamGols' + index} onClick={() => setGolsDialog(games.Gols)}>
                                        {games.Gols.length}
                                    </GamesTableRow>

                                    <GamesTableRow toDay={compareDate(games.data)} className='teamCards' key={'teamCards' + index} onClick={() => setCardsDialog(games.Cartaos)}>
                                        {games.Cartaos.length}
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
                {gamesPoints? gamesPoints.map((grup, index) => {
                    return(
                        <GroupchampionshipTableContent key={grup.grupo + index + 'content'}>
                            <GroupchampionshipTablename key={grup.grupo + index + 'name'}>
                                {grup.grupo}
                            </GroupchampionshipTablename>
                            <GroupchampionshipTablename key={grup.grupo + index + 'name2'}>
                                {'Pontos'}
                            </GroupchampionshipTablename>
                                {grup.times.map((time, index) => {
                                    return(
                                        <React.Fragment  key={index + 'ReactFragment2'}>
                                            <GroupChampionshipEditTableRowSty key={time.nome + index} style={{color:'black'}}>
                                                {time.time}
                                            </GroupChampionshipEditTableRowSty>
                                            <GroupChampionshipEditTableRowSty key={time.pontos + index} style={{color:'black'}}>
                                                {time.pontos + ' pontos'}
                                            </GroupChampionshipEditTableRowSty>
                                        </React.Fragment>
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
        return newPlayer.map(element => {return({value:[element.id_jogador, element.Time.id_time], label:element.nome})})
    }

   const sendData = async (data, type) => {
        switch(type)
        {
            case 'gol':
                return(
                    api.post(`/jogo/${data.id_jogo}/gol`, {id_jogador:data.id_jogador[0], id_time:data.id_jogador[1]})
                    .then(async res => {                     
                        const pontos = await getPontuationbyGroup(expandGames[expand.grupoIndex].id_campeonato);
                        setPoint(pontos);
                        const jogos = await getGamesbyGroup(expandGames[expand.grupoIndex].id_campeonato);
                        setExpandGames(jogos);
                        setGamesDetail(false);
                    })
                    .catch(error => {
                        setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
                    })
                )
            case 'cardYellow':
                return(
                    api.post(`/jogo/${data.id_jogo}/cartao`, {id_jogador:data.id_jogador[0], id_time:data.id_jogador[1], tipo:'Amarelo'})
                    .then(async res => {
                        const jogos = await getGamesbyGroup(expandGames[expand.grupoIndex].id_campeonato);
                        setExpandGames(jogos);
                        setGamesDetail(false);
                    })
                    .catch(error => {
                        setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
                    })
                )
            case 'cardRed':
                return(
                    api.post(`/jogo/${data.id_jogo}/cartao`, {id_jogador:data.id_jogador[0], id_time:data.id_jogador[1], tipo:'Vermelho'})
                    .then(async res => {
                        const jogos = await getGamesbyGroup(expandGames[expand.grupoIndex].id_campeonato);
                        setExpandGames(jogos);
                        setGamesDetail(false);
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

    const renderGolsComponent = (content) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={expandGols? wrapperRef4 : null}>
                    {content.length > 0? 
                    playersData.filter(player => content.map(gol => gol.id_jogador).includes(player.id_jogador)).map((player, index) => {
                        return <div key={index}>{player.nome} do time {player.Time.nome}</div>
                    })
                     : 'Não há nenhum cartão para ser exibido.'}
                </DialogBoxSty>
            </DialogSty>
        );
    }

    const renderCardsComponentexpandCards = (content) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={expandCards? wrapperRef5 : null}>
                {content.length > 0? 
                    playersData.filter(player => content.map(card => card.id_jogador).includes(player.id_jogador)).map((player, index) => {
                        return <div>{player.nome} do time {player.Time.nome} com o cartão {content[index].tipo}</div>
                    })
                     : 'Não há nenhum gol para ser exibido.'}
                </DialogBoxSty>
            </DialogSty>
        );
    }

     function findNumberOneGol(champ) 
    {
        console.log(champ);
        let golsOfChampionChip = champ.grupos.map(grupo => {
            return grupo.jogos.map(jogo => 
                {
                    return jogo.Gols
                }
            ).filter(el => el.length >= 1)}
        ).flat(Infinity);
        const result = golsOfChampionChip.length > 0? golsOfChampionChip.reduce((r, o) => {
                r[`${o.id_jogador}`] = (r[`${o.id_jogador}`] || 0 ) + 1
                return r;
            }, {}) : 0;
        const topScorerAux = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
        const topGols = Math.max.apply( null, Object.keys( result ).map(function ( key ) { return result[key]; }));
        const topGolsPlayer = playersData.find(el => el.id_jogador === parseInt(topScorerAux)).nome
        return {name:topGolsPlayer , gols:topGols}
    } 
    return (
        <ChampionshipTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.championship) : null}
            {expand? renderDialogComponentGames() : null}
            {expandGols? renderGolsComponent(expandGols) : null}
            {expandCards? renderCardsComponentexpandCards(expandCards) : null}
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
                    <ChampionshipTeamTableRowSty key={championship.nome + index * 2} onClick={() => setDialog({championship:championship, status:true})} onAuxClick={() => {setIndex(index); expandGroup(championship);}}>  
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
            {Object.keys(topScorer).length > 0 && 
                <TopScorer>{`Artilheiro do campeonato: ${topScorer.name} com ${topScorer.gols === 1? 'um gol' : `${topScorer.gols} gols`}. `}</TopScorer>
            }
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
