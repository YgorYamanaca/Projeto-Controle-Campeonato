import React, {useState} from 'react'
import './styles.css'
import MaskedInput from 'react-input-mask'
import AppStylizedSelect from '../AppStylizedSelect/'

export default function PlayerRegister() {
    const [name, setName] = useState("");
    const [nick, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [tel, setTel] = useState("");
    console.log("Teste", name, nick, age, tel)
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
                    <div className="InputBox">
                        <label className="Title">Posição:</label> 
                        <AppStylizedSelect id="Postion" options = {[
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' }
                        ]} />
                    </div>
                </div>
                {/* <div className="InputBox">
                    <label className="Title">Posição:</label> <input className="TextInput" type="text"/>
                </div>

                <div className="InputBox">
                    <label className="Title">Time:</label> <input className="TextInput" type="text"/>
                </div> */}
            </div>
        </div>
    )
}
