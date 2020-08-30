import React, {useState} from 'react'
import MaskedInput from 'react-input-mask'
import AppStylizedSelect from '../AppStylizedSelect/'
import AppStylizedButton from '../AppStylizedButton/'
import { useDispatch } from 'react-redux';
import { addPlayerRequest } from '../../store/modules/playerData/actions';
import { PlayerRegisterContainer, PlayerRegisterTitle, PlayerRegisterContent,
     PlayerInfo, InputBox, PlayerTeamInfo, PlayerRegisterFooter } from './styles';

export default function PlayerRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [nick, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [tel, setTel] = useState("");
    const [position, setPosition] = useState();
    const birthRegex = (/([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/);
    const telRegex = (/^\([0-9]{2}(?:\))\s?[0-9]{4}(?:-)[0-9]{4}$/);
    const regexName = (/^[a-zA-Z ]+$/);
    const futebolPositionOptions = [
        { label: 'Goleiro'},
        { label: 'Zagueiro'},
        { label: 'Lateral Direito'},
        { label: 'Lateral Esquerdo'},
        { label: 'Volante'},
        { label: 'Meia'},
        { label: 'Atacante'},
    ]

    const submitData = (e) => {
        e.preventDefault()
        const formData = {
            'nome' : name,
            'apelido' : nick,
            'idade' : birth,
            'telefone' : tel,
            'time' : '',
            'posicao' : position.label,
        }
        dispatch(addPlayerRequest(formData))

        setName("");
        setBirth("");
        setNickName("");
        setPosition("");
        setTel("");
    }
    
    return (
        <PlayerRegisterContainer>
            <PlayerRegisterTitle>Cadastro de Jogador</PlayerRegisterTitle>
            
            <PlayerRegisterContent>
                <PlayerInfo>
                    <InputBox>
                        <label>Nome:</label> <input id="NameInput" placeholder="Insira o nome..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </InputBox>
                    
                    <InputBox>
                        <label>Apelido:</label> <input id="NickInput" placeholder="Insira o apelido..." maxLength={10} type="text" value={nick} onChange={event => setNickName(event.target.value)} style={{width: '125px'}}/>
                    </InputBox>

                    <InputBox>
                        <label>Data de Nascimento:</label>
                        <MaskedInput
                            mask="99/99/9999"
                            className="TextInput"
                            placeholder="Insira a data..."
                            value={birth}
                            id="AgeInput"
                            maskChar={null}
                            onChange={(event) => setBirth(event.target.value)}
                            style={{width: '100px'}}
                            />
                    </InputBox>
                    
                    <InputBox>
                        <label>Telefone:</label> 
                        <MaskedInput
                            mask="(99) 9999-9999"
                            className="TextInput"
                            placeholder="Insira o telefone..."
                            value={tel}
                            id="TelInput"
                            maskChar={null}
                            onChange={(event) => setTel(event.target.value)}
                            />
                    </InputBox>
                </PlayerInfo>
                
                <PlayerTeamInfo>
                        <AppStylizedSelect
                        id="Postion" 
                        title="Posição:"
                        placeholder="Selecione a posição..."
                        options = {futebolPositionOptions} 
                        handleFunction = {setPosition}
                        defaultSelectedLabel={position}
                        />

                        <AppStylizedSelect
                        id="Team" 
                        title="Time:"
                        placeholder="Selecione o time..."
                        options = {[
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' }
                        ]} 
                        disabled={true}/>
                </PlayerTeamInfo>
            </PlayerRegisterContent>

            <PlayerRegisterFooter>
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && regexName.test(nick) && birthRegex.test(birth) && telRegex.test(tel) && position? false : true} onClick={submitData}/>
                </div>
            </PlayerRegisterFooter>
        </PlayerRegisterContainer>
    )
}