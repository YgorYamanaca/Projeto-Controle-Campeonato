import React, {useEffect, useState, useRef} from 'react'
import AppStylizedSelect from '../AppStylizedSelect/index'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {ChampionshipTableContainer, ChampionshipTableTitle, ChampionshipTableContent, ChampionshipHeader, ChampionshipCell,
    ChampionshipTeamTableRowSty, ChampionshipTableFooter, ChampionshipTeamRowEmpety, ChampionshipTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, EditTitle,
    ChampionshipEditTableRowSty, ChampionshipEditCell, EditContent, InputBox} from './styles.js'
import UserMessage from '../UserMessage/'
import { addTeamsData, removeTeamDataRequest, editDataTeamRequest } from '../../store/modules/teamsData/actions';
import api from '../../services/api'
import { useDispatch} from 'react-redux'
import { addMultiChampionship } from '../../store/modules/championshipData/actions'

export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({team:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    // const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/);
    const dispatch = useDispatch();
    const [number, setNumber] = useState("");
    const championships = useSelector(state=>state.championshipData.data)
    useEffect(() => {
        api.get("/campeonato")
        .then(res => {
            console.log(res)
            dispatch(addMultiChampionship(res.data));
        })
        .catch(error => {
            setMessage({message:"Não foi possível receber os dados do servidor", status:'Error'});
        })
    }, [dispatch]);

    const wrapperRef = useRef(null);
    const wrapperRef2 = useRef(null);
    
    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDialog({team:'', status:false});
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
        
    const excludeTeam = (idTeam) =>
    {
        dispatch(removeTeamDataRequest(idTeam));
        setDialog({player:'', status:false});
    }

    const generateEditContent = (row) => 
    {
        switch(row)
        {
            case 'ChampionshipName':
            return (
                <InputBox>
                    <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do Campeonato..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                </InputBox>
            );
            
            case 'num':
            return (
                <InputBox>
                    <label>Numero de Times:</label> <input id="MaxInput" placeholder="Insira o numero de times..." type="number"  maxLength={100} value={number} onChange={event => setNumber(event.target.value)} style={{width: '250px'}}/>
                </InputBox>
                );

            default:
                return '';
        }
    }
    // const renderDialogComponent = (championship) => {
    //     console.log(championship)
    //     return(
    //         <DialogSty>
    //             {editEnable?
    //             <EditBox>
    //                 <Edit ref={editEnable? wrapperRef2 : null}>
    //                     <EditTitle>{`Editando ${championship.nome}`}</EditTitle>
    //                     <ChampionshipTableContent>
    //                         <ChampionshipTableHeader>
    //                             <ChampionshipHeader key={"ChampionshipName"}>
    //                                 Nome do Camp
    //                             </ChampionshipHeader>
    //                             <ChampionshipHeader key={"num"}>
    //                                 Times
    //                             </ChampionshipHeader> 
    //                         </ChampionshipTableHeader>
    //                             <ChampionshipEditTableRowSty >  
    //                                 <ChampionshipEditCell key={championship.nome} onClick={() => setRowEdit({rowType:'ChampionshipName', row:championship, status:true})}>
    //                                     {championship.nome}
    //                                 </ChampionshipEditCell>
    //                                 <ChampionshipEditCell key={championship.dt_inicio} onClick={() => setRowEdit({rowType:"num", row:championship, status:true})}>
    //                                 </ChampionshipEditCell>
    //                             </ChampionshipEditTableRowSty>
    //                     </ChampionshipTableContent>
    //                     <EditContent>
    //                         {rowEdit.status?
    //                         <div>
    //                              Editar:
    //                             {generateEditContent(rowEdit.rowType)}
    //                         </div> : null}
    //                     </EditContent>
                        
    //                 </Edit>
    //             </EditBox> : null}
    //             <DialogBoxSty ref={!editEnable? wrapperRef : null}>
    //                 <ContentSty>
    //                     {`Deseja exluir ou editar ${championship.nome}.`}
    //                 </ContentSty>
    //                 <FooterSty>
    //                     <AppStylizedButton contentText="Editar" onClick={() => setEdit(true)}/>
    //                     <AppStylizedButton contentText="Excluir" onClick={() => excludeTeam(championship.id_time)}/>
    //                 </FooterSty>
    //             </DialogBoxSty>
    //         </DialogSty>
    //     )
    // }
    
    const generateDataAge = (date) =>
    {
        let auxDate = new Date(date);
        return `${auxDate.getDate()}/${(auxDate.getMonth() + 1)}/${auxDate.getFullYear()}`
    }
  
    return (
        <ChampionshipTableContainer>
            {/* {renderDialog.status? renderDialogComponent(renderDialog.team) : null} */}
            <ChampionshipTableTitle>Campeonatos Cadastrados</ChampionshipTableTitle>
            <ChampionshipTableContent>
                <ChampionshipTableHeader>
                    <ChampionshipHeader key={"teamName"}>
                        Nome do Campeonato
                    </ChampionshipHeader>
                    <ChampionshipHeader key={"teamsdata"}>
                        Data de inicio
                    </ChampionshipHeader> 
                    <ChampionshipHeader key={"teamsdata"}>
                        Data de Fim
                    </ChampionshipHeader> 
                </ChampionshipTableHeader>
                {championships?
                    championships.map((championship, index) => 
                    <ChampionshipTeamTableRowSty key={index} onClick={() => setDialog({championship:championship, status:true})}>  
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
                </ChampionshipTableContent>
            {championships && championships.length > 0? null:<ChampionshipTeamRowEmpety> Não há nenhum dado cadastrado</ChampionshipTeamRowEmpety>}
            <ChampionshipTableFooter>
                {message.message? <UserMessage message={message} /> : null}
                
            </ChampionshipTableFooter>
        </ChampionshipTableContainer>
    )
}
