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

export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({team:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const teamsData = useSelector(state => state.teamsData);
    // const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/);
    const dispatch = useDispatch();
    const [number, setNumber] = useState("");

    useEffect(() => {
        api.get("/time")
        .then(res => {
            dispatch(addTeamsData(res.data));
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

    const handleEditTeam = () =>
    {
        dispatch(editDataTeamRequest(rowEdit.row, name, number))
        
        setDialog({team:'', status:false});
        setRowEdit({row:'', rowType:'', status:false})
    }

    const clearEdit = () => {
        setName("");
        setNumber("");
    }

    const renderDialogComponent = (team) => {
        return(
            <DialogSty>
                {editEnable?
                <EditBox>
                    <Edit ref={editEnable? wrapperRef2 : null}>
                        <EditTitle>{`Editando ${team.nome}`}</EditTitle>
                        <ChampionshipTableContent>
                            <ChampionshipTableHeader>
                                <ChampionshipHeader key={"ChampionshipName"}>
                                    Nome do Camp
                                </ChampionshipHeader>
                                <ChampionshipHeader key={"num"}>
                                    Times
                                </ChampionshipHeader> 
                            </ChampionshipTableHeader>
                                <ChampionshipEditTableRowSty >  
                                    <ChampionshipEditCell key={team.nome} onClick={() => setRowEdit({rowType:'ChampionshipName', row:team, status:true})}>
                                        {team.nome}
                                    </ChampionshipEditCell>
                                    <ChampionshipEditCell key={team.nivel + "time"} onClick={() => setRowEdit({rowType:"num", row:team, status:true})}>
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
                            <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditTeam(); clearEdit()}} disabled={name || number%2==0? false : true}/>
                        </ChampionshipTableFooter>
                    </Edit>
                </EditBox> : null}
                <DialogBoxSty ref={!editEnable? wrapperRef : null}>
                    <ContentSty>
                        {`Deseja exluir ou editar ${team.nome}.`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" onClick={() => setEdit(true)}/>
                        <AppStylizedButton contentText="Excluir" onClick={() => excludeTeam(team.id_time)}/>
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

  
    
    return (
        <ChampionshipTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.team) : null}
            <ChampionshipTableTitle>Campeonatos Cadastrados</ChampionshipTableTitle>
            <ChampionshipTableContent>
                <ChampionshipTableHeader>
                    <ChampionshipHeader key={"teamName"}>
                        Nome do Campeonato
                    </ChampionshipHeader>
                    <ChampionshipHeader key={"teamNum"}>
                        Número de times
                    </ChampionshipHeader> 
                </ChampionshipTableHeader>
                {teamsData?
                    teamsData.map((team, index) => 
                    <ChampionshipTeamTableRowSty key={index} onClick={() => setDialog({team:team, status:true})}>  
                        <ChampionshipCell key={team.nome + index} styless={index % 2 === 0? 'Par' : ''}>
                            {team.nome}
                        </ChampionshipCell>
                        <ChampionshipCell key={team.nivel + index} styless={index % 2 === 0? 'Par' : ''}>
                        </ChampionshipCell>
                    </ChampionshipTeamTableRowSty>)
                :null}
                </ChampionshipTableContent>
            {teamsData && teamsData.length > 0? null:<ChampionshipTeamRowEmpety> Não há nenhum dado cadastrado</ChampionshipTeamRowEmpety>}
            <ChampionshipTableFooter>
                {message.message? <UserMessage message={message} /> : null}
            </ChampionshipTableFooter>
        </ChampionshipTableContainer>
    )
}
