import React, {useEffect, useState, useRef} from 'react'
// import api from '../../services/api'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {TeamTableContainer, TeamTableTitle, TeamTableContent, TeamHeader, TeamCell,
    TeamTableRowSty, TeamTableFooter, TeamRowEmpety, TeamTableHeader, DialogSty, DialogBoxSty, ContentSty, FooterSty} from './styles.js'
import { addTeamsData, removeTeamDataRequest } from '../../store/modules/teamsData/actions';
import api from '../../services/api'
import { useDispatch} from 'react-redux'

export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({team:'', status:false});
    const teamsData = useSelector(state => state.teamsData);
    const dispatch = useDispatch();

    useEffect(() => {
        api.get("/time")
        .then(res => {
            dispatch(addTeamsData(res.data));
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

        
    const excludeTeam = (idTeam) =>
    {
        dispatch(removeTeamDataRequest(idTeam));
        setDialog({player:'', status:false});
    }

    const renderDialogComponent = (team) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={wrapperRef}>
                    <ContentSty>
                        {`Deseja exluir ou editar ${team.nome}.`}
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" />
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
            <TeamTableFooter />
        </TeamTableContainer>
    )
}
