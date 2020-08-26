import React, {useState,} from 'react'
import './styles.css'

export default function AppStylizedSelect({id, title, options, placeholder, disabled, handleFunction}) {
    const [selectedObject, setSelected] = useState({label:''});
    const [expand, setExpand] = useState(false);

    const selectObject = (option) => {
        setSelected(option)
        handleFunction(option.label)
    }

    return (
            <div className="ComponentBox" style={{opacity:disabled ? '0.5': '1', pointerEvents: disabled ? 'none': ''}}>
                <label className="ComponentTitle">{title}</label> 
                <div className="ComponentContainer" onClick={() => setExpand(! expand)}>
                    <div className="ComponentDefaultSelected" style={{color:placeholder && selectedObject.label === ""? 'grey' : ""}}>
                        {placeholder && selectedObject.label === ""? placeholder : selectedObject.label}
                    </div>

                {expand ?
                    <div className="OptionsContainer">
                        {options.map((option, index) => 
                            <div key={"option" + index + 1} className="OptionContainer" onClick={() => {selectObject(option)}}>{option.label}</div>
                        )}
                    </div>
                    :
                    null} 
                </div>      
            </div>
    )
}
