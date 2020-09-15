import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import MaskedInput from 'react-input-mask'
import AppStylizedButton from '../AppStylizedButton'
import {ChampionshipTableContainer, ChampionshipTableTitle, ChampionshipTableContent, ChampionshipHeader, ChampionshipCell,
    ChampionshipTeamTableRowSty, ChampionshipTableFooter, ChampionshipTeamRowEmpety, ChampionshipTableHeader,
    EditBox, Edit, DialogSty, DialogBoxSty, ContentSty, FooterSty, EditTitle,
    ChampionshipEditTableRowSty, ChampionshipEditCell, EditContent, InputBox} from './styles.js'
import UserMessage from '../UserMessage/'
import { editChampionShipRequest, addMultiChampionship, removeChampionshipDataRequest } from '../../store/modules/championshipData/actions';
import api from '../../services/api'
import { useDispatch} from 'react-redux'

export default function TeamsTable() {
    const [renderDialog, setDialog] = useState({championShip:'', status:false});
    const [editEnable, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [message, setMessage] = useState({message:'', status:''});
    const [rowEdit, setRowEdit] = useState({row:'', rowType:'', status:false});
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/);
    const regexDate = (/([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/);
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
    const validaData = (inicio, fim)=>{ 
        let [dayInicio, monthInicio, yearInicio] = inicio.split("/")
        let [dayFim, monthFim, yearFim] = fim.split("/") 
        let newDataInicio = new Date(yearInicio, monthInicio-1, dayInicio );
        let newDataFim = new Date(yearFim, monthFim-1, dayFim);
        if(newDataInicio > new Date() && newDataInicio<newDataFim && regexDate.test(inicio) && regexDate.test(fim)){
            return true
        }
       else{
            return false
       }   
    }
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
                    <AppStylizedButton contentText="Salavar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexName.test(name)? false : true}/>
                </div>
                
            );
            
            case 'dt_inicio':
            return (
                <div>
                    <InputBox>
                        <label>Data de início:</label>
                        <MaskedInput
                            mask="99/99/9999"
                            className="TextInput"
                            placeholder="Insira a data..."
                            value={inicio}
                            maskChar={null}
                            onChange={(event) => setInicio(event.target.value)}
                            style={{width: '100px'}}
                            />
                    </InputBox>
                    <AppStylizedButton contentText="Salvar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexDate.test(inicio) && validaData(inicio,fim) ? false : true}/>
                </div>
                );

            case 'dt_fim':
                return (
                    <div>
                        <InputBox>
                            <label>Data de Encerramento</label>
                            <MaskedInput
                                mask="99/99/9999"
                                className="TextInput"
                                placeholder="Insira a data..."
                                value={fim}
                                maskChar={null}
                                onChange={(event) => setFim(event.target.value)}
                                style={{width: '100px'}}
                                />
                        </InputBox>
                        <AppStylizedButton contentText="Salavar" onClick={() => {setRowEdit({row:'', rowType:'', status:false}); handleEditChampionShip(); clearEdit();}} disabled={regexDate.test(fim) && validaData(inicio,fim)? false : true}/>
                    </div>
                    );

            default:
                return '';
        }
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
    return (
        <ChampionshipTableContainer>
            {renderDialog.status? renderDialogComponent(renderDialog.championship) : null}
            <ChampionshipTableTitle>Campeonatos Cadastrados</ChampionshipTableTitle>
            <ChampionshipTableContent>
                <ChampionshipTableHeader>
                    <ChampionshipHeader key={"championShip"}>
                        Nome do Campeonato
                    </ChampionshipHeader>
                    <ChampionshipHeader key={"championShipdata1"}>
                        Data de inicio
                    </ChampionshipHeader> 
                    <ChampionshipHeader key={"championShipdata2"}>
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
