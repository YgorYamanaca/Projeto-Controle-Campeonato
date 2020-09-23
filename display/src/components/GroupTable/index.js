import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import AppStylizedButton from '../AppStylizedButton'
import {GroupTableContainer, GroupTableTitle, GroupTableContent, GroupHeader, GroupCell,
    GroupCellTeamTableRowSty, GroupTableFooter, GroupTeamRowEmpety, GroupTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, ExpandTeamRow,
    ChampionshipEditTableRowSty, ChampionshipEditCell, EditContent, InputBox, TeamTable} from './styles.js'
import UserMessage from '../UserMessage/'
import { editChampionShipRequest, addMultiChampionship, removeChampionshipDataRequest } from '../../store/modules/championshipData/actions';
import api from '../../services/api'
import { useDispatch} from 'react-redux'

export default function TeamsTable() {
    const [expandTeam,  setExpand] = useState(false);
    const [renderDialog, setDialog] = useState({championShip:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    
    const dispatch = useDispatch();
    const championships = useSelector(state=>state.championshipData.data)
    const userMessage = useSelector(state => state.championshipData.userMessage)

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
        
    const excludeChamp = (idChamp) =>
    {
        dispatch(removeChampionshipDataRequest(idChamp));
        setDialog({championShip:'', status:false});
    }
    

    return (
        <GroupTableContainer>
            <GroupTableTitle>Fase de Grupos</GroupTableTitle>
            <GroupTableContent>
                <GroupTableHeader>
                    <GroupHeader key={"Team1"}>
                        Time 1
                    </GroupHeader>
                    <GroupHeader key={"Team2"}>
                        Time 2
                    </GroupHeader>  
                </GroupTableHeader>
                {championships?
                    championships.map((championship, index) => 
                    <GroupCellTeamTableRowSty key={index} onClick={() => setDialog({championship:championship, status:true})} onMouseOver={() => setExpand(championship)} onMouseOut={() => setExpand(false)}>  
                        <GroupCell key={championship.nome + index} styless={index % 2 === 0? 'Par' : ''}>
                            {championship.nome}
                        </GroupCell>
                        <GroupCell key={championship.dt_inicio + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateDataAge(championship.dt_inicio)}
                        </GroupCell>
                        <GroupCell key={championship.dt_fim + index} styless={index % 2 === 0? 'Par' : ''}>
                            {generateDataAge(championship.dt_fim)}
                        </GroupCell>
                    </GroupCellTeamTableRowSty>)
                :null}
            {championships && championships.length > 0? null:<GroupTeamRowEmpety> Não há nenhum dado cadastrado</GroupTeamRowEmpety>}
            
            </GroupTableContent>
                
            <GroupTableFooter>
                {message.message? <UserMessage message={message} /> : null}
            </GroupTableFooter>
        </GroupTableContainer>
    )
}
