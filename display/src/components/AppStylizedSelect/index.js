import React, {useState} from 'react'
import './styles.css'
export default function AppStylizedSelect({id, options}) {
    const [selectedObject, setSelected] = useState({value:'', label:''});
    const [expand, setExpand] = useState(true);
    return (
        <React.Fragment>
            <div className="ComponentContainer">
                {selectedObject.label}
            </div>

            {expand ?
                <div className="OptionsContainer">
                    {options.map((option, index) => 
                        <div key={"option" + index + 1} className="OptionContainer">{option.label}</div>
                    )}
                </div>
                :
                null}
        </React.Fragment>
    )
}
