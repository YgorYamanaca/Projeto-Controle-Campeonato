import React, {useEffect, useState, useRef} from 'react'
import AppStylizedSelect from '../AppStylizedSelect/index'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {TeamTableContainer, TeamTableTitle, TeamTableContent, TeamHeader, TeamCell,
    TeamTableRowSty, TeamTableFooter, TeamRowEmpety, TeamTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, EditTitle,
    TeamEditTableRowSty, TeamEditCell, EditContent, InputBox} from './styles.js'
import { addTeamsData, removeTeamDataRequest, editDataTeamRequest } from '../../store/modules/teamsData/actions';
import api from '../../services/api'
import { useDispatch} from 'react-redux'
import UserMessage from '../UserMessage/'
export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({team:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const teamsData = useSelector(state => state.teamsData.data);
    const teamsMenssage = useSelector(state => state.teamsData.userMessage);
    // const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/);
    const dispatch = useDispatch();
    const [nivel, setNivel] = useState();
    const TeamOptions = [
        { label: 'Muito Bom', value:1},
        { label: 'Bom', value:2},
        { label: 'Regular', value:3},
        { label: 'Ruim', value:4}, 
    ]
    useEffect(() => {
        setMessage(teamsMenssage)
    }, [teamsMenssage])
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
            case 'name':
            return (
                <InputBox>
                    <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do time..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                </InputBox>
            );
            
            case 'nivel':
            return (<AppStylizedSelect
                id="Postion" 
                title="Nível:"
                placeholder="Selecione o nível..."
                options = {TeamOptions} 
                handleFunction = {setNivel}
                defaultSelectedLabel={nivel}
                />);

            default:
                return '';
        }
    }

    const handleEditTeam = () =>
    {
        dispatch(editDataTeamRequest(rowEdit.row, name, nivel))
        
        setDialog({team:'', status:false});
        setRowEdit({row:'', rowType:'', status:false})
    }

    const clearEdit = () => {
        setName("");
        setNivel("");
    }

    const renderDialogComponent = (team) => {
        return(
            <DialogSty>
                {editEnable?
                <EditBox>
                    <Edit ref={editEnable? wrapperRef2 : null}>
                        <EditTitle>{`Editando ${team.nome}`}</EditTitle>
                        <TeamTableContent>
                            <TeamTableHeader>
                                <TeamHeader key={"teamName"}>
                                    Nome do time
                                </TeamHeader>
                                <TeamHeader key={"teamLevel"}>
                                    Nível
                                </TeamHeader> 
                            </TeamTableHeader>
                                <TeamEditTableRowSty >  
                                    <TeamEditCell key={team.nome} onClick={() => setRowEdit({rowType:'name', row:team, status:true})}>
                                        {team.nome}
                                    </TeamEditCell>
                                    <TeamEditCell key={team.nivel + "time"} onClick={() => setRowEdit({rowType:"nivel", row:team, status:true})}>
                                        {generateTeamLabel(team.nivel)}
                                    </TeamEditCell>
                                </TeamEditTableRowSty>
                        </TeamTableContent>
                        <EditContent>
                            {rowEdit.status?
                            <div>
                                 Editar:
                                {generateEditContent(rowEdit.rowType)}
                            </div> : null}
                        </EditContent>
                        <TeamTableFooter>
                            <AppStylizedButton contentText="Cancelar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); setEdit(false)}}/>
                            <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditTeam(); clearEdit()}} disabled={name || nivel? false : true}/>
                        </TeamTableFooter>
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

    const generateTeamLabel = (teamLevel) => {
        switch (teamLevel) {
            case 1:
                return 'Muito Bom'
            case 2:
                return 'Bom'
            case 3:
                return 'Regular'
            case 4:
                return 'Ruim'
            default:
                break;
        }
    }

    return (
        <TeamTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.team) : null}
            <TeamTableTitle>Times Cadastrados</TeamTableTitle>
            <TeamTableContent>
                <TeamTableHeader>
                    <TeamHeader key={"teamName"}>
                        Nome do time
                    </TeamHeader>
                    <TeamHeader key={"teamLevel"}>
                        Nível
                    </TeamHeader> 
                </TeamTableHeader>
                {teamsData?
                    teamsData.map((team, index) => 
                    <TeamTableRowSty key={index} onClick={() => setDialog({team:team, status:true})}>  
                        <TeamCell key={team.nome + index} styless={index % 2 === 0? 'Par' : ''}>
                            {team.nome}
                        </TeamCell>
                        <TeamCell key={team.nivel + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateTeamLabel(team.nivel)}
                        </TeamCell>
                    </TeamTableRowSty>)
                :null}
                </TeamTableContent>
            {teamsData && teamsData.length > 0? null:<TeamRowEmpety> Não há nenhum dado cadastrado</TeamRowEmpety>}
            <TeamTableFooter>
                {message? <UserMessage message={message} /> : null}
            </TeamTableFooter>
        </TeamTableContainer>
    )
}
