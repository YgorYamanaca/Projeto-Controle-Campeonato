import React, {useState} from 'react'
import './styles.css'
import MaskedInput from 'react-input-mask'
import AppStylizedSelect from '../AppStylizedSelect/'
import AppStylizedButton from '../AppStylizedButton/'
import api from '../../services/api';

export default function PlayerRegister() {
    const [name, setName] = useState("");
    const [nick, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [tel, setTel] = useState("");
    const [position, setPosition] = useState();

    const futebolPositionOptions = [
        { label: 'Goleiro' },
        { label: 'Zagueiro' },
        { label: 'Lateral Direito' },
        { label: 'Lateral Esquerdo' },
        { label: 'Volante' },
        { label: 'Meia' },
        { label: 'Atacante' },
    ]

    const submitData = () => {
        const formData = {
            'nome' : name,
            'apelido' : nick,
            'idade' : age.slice(0, 2),
            'telefone' : tel,
            'time' : '',
            'posicao' : position.label,
        }
        api.post("/jogador", formData)
        .then(res => {
            //se ok voltar para tela de calender
            console.log(res);
                alert("Evento criado com sucesso!")

                setName("");
                setNickName("");
                setPosition("");
                setTel("");
                setPosition("");
                setAge("");
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="PlayerRegisterContainer">
            <div className="Title">Cadastro de Jogador</div>
            <div className="Content">
                <div className="PlayerInfo">
                    <div className="InputBox">
                        <label className="Title">Nome:</label> <input className="TextInput" id="NameInput" placeholder="Insira o nome..." type="text"  maxLength={50} value={name} onChange={event => setName(event.target.value)} style={{width: '250px'}}/>
                    </div>
                    
                    <div className="InputBox">
                        <label className="Title">Apelido:</label> <input className="TextInput" id="NickInput" placeholder="Insira o apelido..." maxLength={10} type="text" value={nick} onChange={event => setNickName(event.target.value)} style={{width: '125px'}}/>
                    </div>

                    <div className="InputBox">
                        <label className="Title">Idade:</label>
                        <MaskedInput
                            mask="99 \anos"
                            className="TextInput"
                            placeholder="Clique..."
                            value={age}
                            id="AgeInput"
                            maskChar={null}
                            onChange={(event) => setAge(event.target.value)}
                            style={{width: '75px'}}
                            />
                    </div>
                    
                    <div className="InputBox">
                        <label className="Title">Telefone:</label> 
                        <MaskedInput
                            mask="(99) 9999-9999"
                            className="TextInput"
                            placeholder="Insira o telefone..."
                            value={tel}
                            id="TelInput"
                            maskChar={null}
                            onChange={(event) => setTel(event.target.value)}
                            />
                    </div>
                </div>
                
                <div className="PlayerTeamInfo">
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
                </div>
            </div>

            <div className="Footer">
                <div style={{marginLeft:'auto'}}>     
                    <AppStylizedButton contentText="Cadastrar" disabled={name && nick && age && tel && position? false : true} onClick={submitData}/>
                </div>
            </div>
        </div>
    )
}
