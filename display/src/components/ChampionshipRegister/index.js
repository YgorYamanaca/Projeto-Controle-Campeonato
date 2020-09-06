import React, {useState} from 'react'
import AppStylizedSelect from '../AppStylizedSelect/'
import AppStylizedButton from '../AppStylizedButton/'
import { useDispatch } from 'react-redux';
import { addTeamRequest } from '../../store/modules/teamsData/actions';
import { ChampionshipRegisterContainer,ChampionshipRegisterTitle, ChampionshipRegisterContent,
    ChampionshipInfo, InputBox, ChampionshipRegisterFooter } from './styles';

export default function ChampionshipRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [number, setnumber] = useState("");
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9]+$/);
    
    const submitData = (e) => {
        e.preventDefault()
        const formData = {
            'nome' : name,
            'numero' : number.value,
        }
        dispatch(addTeamRequest(formData))

        setName("");
        setnumber("");
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
                        <label>Numero de Times:</label> <input id="MaxInput" placeholder="Insira o numero de times..." type="number"  maxLength={100} value={number} onChange={event => setnumber(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                   
                </ChampionshipInfo>
               
            </ChampionshipRegisterContent>

            <ChampionshipRegisterFooter>
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && number%2==0? false : true} onClick={submitData}/>
                </div>
            </ChampionshipRegisterFooter>
        </ChampionshipRegisterContainer>
    )
}