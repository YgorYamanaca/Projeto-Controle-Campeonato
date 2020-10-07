import React, {useState} from 'react';
import AppStylizedButton from '../AppStylizedButton/';
import { useDispatch, useSelector } from 'react-redux';
import { addChampionshipRequest } from '../../store/modules/championshipData/actions';
import { ChampionshipRegisterContainer,ChampionshipRegisterTitle, ChampionshipRegisterContent,
    ChampionshipInfo, InputBox, ChampionshipRegisterFooter,
     TeamRegisterContent, OptionsBox, EmpetyRow, RowOPT } from './styles';
import MultiSelectBox from '../MultiSelectBox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
     
export default function ChampionshipRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [selectedWeek, setWeek] = useState("");
    const [inicio, setInicio] = useState();
    const [fim, setFim] = useState();
    const [teamRegister, setTeam] = useState([]);
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9]+$/);
    const teamsData = useSelector(state => state.teamsData.data)
    const weekOptions = [
        {label:'Segunda-feira', value:1},
        {label:'Terça-feira', value:2},
        {label:'Quarta-feira', value:3},
        {label:'Quinta-feira', value:4},
        {label:'Sexta-feira', value:5},
        {label:'Sábado', value:6},
        {label:'Domingo', value:7},
    ]
    const submitData = (e) => {
        let teams = [];
        e.preventDefault();
        teamRegister.forEach(team => {
            teams.push(team.id_time);
        })
        const formData = {
            'nome' : name,
            'dt_inicio' : inicio,
            'dt_fim' :  fim,
            'times':teams,
            'semana':selectedWeek,
        }
        dispatch(addChampionshipRequest(formData))
        setName("");
        setInicio("");
        setFim(""); 
        setTeam([]);
    }
    const removeTeam = (team) => {
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
                        <DatePicker
                            dateFormat="dd/MM/yyy"
                            selected={inicio}
                            onChange={date => setInicio(date)}
                            minDate={new Date()}                      
                            placeholderText="Clique para começar..."
                            showDisabledMonthNavigation
                        />
                    </InputBox>
                    <InputBox>
                        <label>Data de Encerramento:</label>
                        <DatePicker
                            dateFormat="dd/MM/yyy"
                            selected={fim}
                            onChange={date => setFim(date)}
                            minDate={inicio? inicio.getTime() + 7 * 24 * 60 * 60 * 1000 : ""}
                            showDisabledMonthNavigation
                            placeholderText="Insira a data de início..."
                            disabled={inicio? false : true}
                        />
                    </InputBox>
                </ChampionshipInfo>

                <ChampionshipInfo>
                <InputBox>
                    <label>Dias em que ocorrem os jogos:</label>
                    <MultiSelectBox
                        options={weekOptions}
                        handleFunction={setWeek}
                        placeHolder={"Clieque para selecionar o dia da semana..."}
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
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && inicio && fim && (teamRegister.length > 0 && teamRegister.length%4 === 0) && (teamRegister.length>=4) && selectedWeek.length > 0? false:true} onClick={submitData}/>
                </div>
            </ChampionshipRegisterFooter>
        </ChampionshipRegisterContainer>
    )
}
