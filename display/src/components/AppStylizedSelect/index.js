import React, {useState, useEffect, memo, useRef} from 'react'
import { ComponentBox, ComponentTitle, ComponentContainer, OptionsContainer, OptionContainer } from './styles';


function AppStylizedSelect({id, title, options, placeholder, disabled, handleFunction, defaultSelectedLabel}) {
    const [selectedObject, setSelected] = useState("");
    const [expand, setExpand] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setExpand(false);
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        if(defaultSelectedLabel)
        {
            setSelected(defaultSelectedLabel);
        }
        else
        {
            setSelected({label:''})
        }
    }, [defaultSelectedLabel])

    const selectObject = (option) => {
        setSelected(option)
        if(handleFunction){
            handleFunction(option) 
        }
    }
    
    return (
            <ComponentBox style={{opacity:disabled ? '0.5': '1', pointerEvents: disabled ? 'none': ''}}>
                <ComponentTitle>{title}</ComponentTitle> 
                <ComponentContainer onClick={() => setExpand(! expand)}>
                    <div className="ComponentDefaultSelected" style={{color:placeholder && selectedObject.label === ""? 'grey' : ""}}>
                        {placeholder && selectedObject.label === ""? placeholder : selectedObject.label}
                    </div>

                {expand ?
                    <OptionsContainer ref={wrapperRef}>
                        {options.map((option, index) => 
                            <OptionContainer key={"option" + index + 1}  onClick={() => {selectObject(option)}}>{option.label}</OptionContainer>
                        )}
                    </OptionsContainer>
                    :
                    null} 
                </ComponentContainer>      
            </ComponentBox>
    )
}

export default memo(AppStylizedSelect);