import React, {useState} from 'react'
import AppStylizedSelect from '../AppStylizedSelect/'
import AppStylizedButton from '../AppStylizedButton/'
import { useDispatch } from 'react-redux';
import { addPlayerRequest } from '../../store/modules/playerData/actions';
import { TeamRegisterContainer, TeamRegisterTitle, TeamRegisterContent,
    TeamInfo, InputBox,  TeamRegisterFooter } from './styles';

export default function TeamRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [nivel, setNivel] = useState();
    const regexName = (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
    const TeamOptions = [
        { label: 'Muito Bom'},
        { label: 'Bom'},
        { label: 'Regular'},
        { label: 'Ruim'}, 
    ]

    const submitData = (e) => {
        e.preventDefault()
        const formData = {
            'nome' : name,

            'nivel' : nivel.label,
        }
        dispatch(addPlayerRequest(formData))
    }
    
    return (
        <TeamRegisterContainer>
            <TeamRegisterTitle>Cadastro de Time</TeamRegisterTitle>
            
            <TeamRegisterContent>
                <TeamInfo>
                    <InputBox>
                        <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome do time..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    
                        <AppStylizedSelect
                        id="Postion" 
                        title="Nível:"
                        placeholder="Selecione o nível..."
                        options = {TeamOptions} 
                        handleFunction = {setNivel}
                        defaultSelectedLabel={nivel}
                        />
                        
                </TeamInfo>
               
            </TeamRegisterContent>

            <TeamRegisterFooter>
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && nivel? false : true} onClick={submitData}/>
                </div>
            </TeamRegisterFooter>
        </TeamRegisterContainer>
    )
}