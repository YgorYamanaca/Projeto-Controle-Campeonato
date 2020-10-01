import React, {useState, useEffect} from 'react'
import MaskedInput from 'react-input-mask'
import AppStylizedSelect from '../AppStylizedSelect/'
import AppStylizedButton from '../AppStylizedButton/'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayerRequest } from '../../store/modules/playerData/actions';
import { PlayerRegisterContainer, PlayerRegisterTitle, PlayerRegisterContent,
     PlayerInfo, InputBox, PlayerTeamInfo, PlayerRegisterFooter } from './styles';
import { addTeamsData } from '../../store/modules/teamsData/actions';
import api from '../../services/api'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PlayerRegister() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [nick, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [tel, setTel] = useState("");
    const [level, setLevel] = useState("");
    const [position, setPosition] = useState();
    const telRegex = (/^\([0-9]{2}(?:\))\s?[0-9]{4}(?:-)[0-9]{4}$/);
    const regexName = (/^[a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
    const futebolPositionOptions = [
        { label: 'Goleiro'},
        { label: 'Zagueiro'},
        { label: 'Lateral Direito'},
        { label: 'Lateral Esquerdo'},
        { label: 'Volante'},
        { label: 'Meia'},
        { label: 'Atacante'},
    ]
    const teamsOption = useSelector(state => state.teamsData.data);
    useEffect(() => {
        api.get("/time")
        .then(res => {
            dispatch(addTeamsData(res.data));
        })
        .catch(error => {
            console.log(error);
        })
    }, [dispatch]);
    const submitData = (e) => {
        e.preventDefault()
        let day = birth.getDate();
        let month = birth.getMonth();
        let year = birth.getFullYear();
        const formData = {
            'nome' : name,
            'apelido' : nick,
            'data_nasc' : new Date(year, month - 1, day),
            'telefone' : tel,
            'id_time':level.value,
            'posicao' : position.label,
        }
        let time = teamsOption[teamsOption.findIndex(element => element.id_time === level.value)];
        dispatch(addPlayerRequest(formData, time))

        setName("");
        setBirth("");
        setNickName("");
        setPosition("");
        setTel("");
        setLevel("");
    }
    const generateTeamLabel = (teamValue) => {
        var aux = teamValue.map(team => ({
            label: team.nome,
            value: team.id_time
        }))
        return aux;
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
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={birth}
                            onChange={date => setBirth(date)}
                            maxDate={new Date().setFullYear(new Date().getFullYear() - 16)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Clique para começar..."
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
                        handleFunction = {setLevel}
                        options = {generateTeamLabel(teamsOption)} 
                        defaultSelectedLabel={level}
                        /> 
                </PlayerTeamInfo>
            </PlayerRegisterContent>

            <PlayerRegisterFooter>
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={regexName.test(name) && regexName.test(nick) && telRegex.test(tel) && position && level? false : true} onClick={submitData}/>
                </div>
            </PlayerRegisterFooter>
        </PlayerRegisterContainer>
    )
}