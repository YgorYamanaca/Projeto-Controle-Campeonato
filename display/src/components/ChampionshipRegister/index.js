import React, {useState} from 'react'
import AppStylizedButton from '../AppStylizedButton/'
import { useDispatch, useSelector } from 'react-redux';
import { addChampionshipRequest } from '../../store/modules/championshipData/actions';
import MaskedInput from 'react-input-mask'
import { ChampionshipRegisterContainer,ChampionshipRegisterTitle, ChampionshipRegisterContent,
    ChampionshipInfo, InputBox, ChampionshipRegisterFooter,
     TeamRegisterContent, OptionsBox, EmpetyRow, RowOPT } from './styles';

export default function ChampionshipRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [teamRegister, setTeam] = useState([]);
    const regexDate = (/([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/);
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9]+$/);
    const teamsData = useSelector(state => state.teamsData.data)
    const submitData = (e) => {
        let [dayInicio, monthInicio, yearInicio] = inicio.split("/")
        let [dayFim, monthFim, yearFim] = fim.split("/") 
        let newDataInicio = new Date(yearInicio, monthInicio-1, dayInicio );
        let newDataFim = new Date(yearFim, monthFim-1, dayFim);
        e.preventDefault()
        const formData = {
            'nome' : name,
            'dt_inicio' : newDataInicio,
            'dt_fim' :  newDataFim
        }
        dispatch(addChampionshipRequest(formData))
        setName("");
        setInicio("");
        setFim(""); 
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

    const removeTeam = (team) => {
        console.log(team.id_time);
        setTeam(teamRegister.filter(teamReg => teamReg.id_time !== team.id_time))
    }

    return (
        <ChampionshipRegisterContainer>
            <ChampionshipRegisterTitle>Cadastro de Campeonato</ChampionshipRegisterTitle>
            
            <ChampionshipRegisterContent>
                <ChampionshipInfo>
                    <InputBox>
                        <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do Campeonato..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    
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
                   
                </ChampionshipInfo>
               
            </ChampionshipRegisterContent>
            <TeamRegisterContent>
                <ChampionshipRegisterTitle>
                    Cadastro de time no campeonato
                </ChampionshipRegisterTitle>
                <div style={{display:'flex'}}> 
                    <OptionsBox>
                        <ChampionshipRegisterTitle>
                            Times cadastrados
                        </ChampionshipRegisterTitle>
                        
                        {teamsData.length > 0? 
                        <div>
                            {teamsData.map((team, index) =>
                                <RowOPT key={team + index} disabled={teamRegister.includes(team)} onClick={() => setTeam(oldArray => [...oldArray, team])}>
                                    {team.nome}                                         
                                </RowOPT>
                            )}
                        </div>
                        : 
                        <EmpetyRow>Não há dados</EmpetyRow>}
                    </OptionsBox>
                    <OptionsBox>
                        <ChampionshipRegisterTitle>
                            Times para o campeonato
                        </ChampionshipRegisterTitle>
                        {teamRegister.length > 0? 
                        <div>
                            {teamRegister.map((team, index) =>
                                <RowOPT key={team + (index * 2)} onClick={() => removeTeam(team)}>
                                    {team.nome}                                         
                                </RowOPT>
                            )}
                        </div>
                        : <EmpetyRow>Não há dados</EmpetyRow>}
                    </OptionsBox>
                </div>
            </TeamRegisterContent>
            <ChampionshipRegisterFooter>
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && inicio && fim && validaData(inicio,fim) && (teamRegister.length > 0 && teamRegister.length%2 === 0)? false:true} onClick={submitData}/>
                </div>
            </ChampionshipRegisterFooter>
        </ChampionshipRegisterContainer>
    )
}