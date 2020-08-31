import React, {useEffect, useState, useRef} from 'react'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {TeamTableContainer, TeamTableTitle, TeamTableContent, TeamHeader, TeamCell,
    TeamTableRowSty, TeamTableFooter, TeamRowEmpety, TeamTableHeader, DialogSty, DialogBoxSty, ContentSty, FooterSty} from './styles.js'

export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({TeamID:'', status:false});
    const teamsData = useSelector(state => state.teamData);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     api.get("/jogador")
    //     .then(res => {
    //         dispatch(addTeamData(res.data));
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }, [dispatch]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    console.log(teamsData);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDialog({TeamID:'', status:false});
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

    const renderDialogComponent = (TeamID) => {
        return(
            <DialogSty>
                <DialogBoxSty ref={wrapperRef}>
                    <ContentSty>
                        Deseja exluir ou editar esse Time.
                    </ContentSty>
                    <FooterSty>
                        <AppStylizedButton contentText="Editar" />
                        <AppStylizedButton contentText="Excluir"/>
                    </FooterSty>
                </DialogBoxSty>
            </DialogSty>
        )
    }

    return (
        <TeamTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.TeamID) : null}
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
                    teamsData.map((Team, index) => 
                    <TeamTableRowSty key={index} onClick={() => setDialog({TeamID:Team.id_jogador, status:true})}>  
                        <TeamCell key={Team.name + index}>
                            {Team.nome}
                        </TeamCell>
                        <TeamCell key={Team.apelido + index}>
                            {Team.apelido}
                        </TeamCell>
                    </TeamTableRowSty>)
                :null}
                </TeamTableContent>
            {teamsData && teamsData.length > 0? null:<TeamRowEmpety> Não há nenhum dado cadastrado</TeamRowEmpety>}
            <TeamTableFooter />
        </TeamTableContainer>
    )
}
