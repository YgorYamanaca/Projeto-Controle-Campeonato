import React, {useState} from 'react'
import './styles.css'
export default function AppStylizedSelect({id, title, options, placeholder, defaultSelectedIndex}) {
    const [selectedObject, setSelected] = useState({value:'', label:''});
    const [expand, setExpand] = useState(true);

    const selectObject = (option) => {
        setSelected(option)
    }
    console.log("selectedObject");
    return (
            <div className="ComponentBox">
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
