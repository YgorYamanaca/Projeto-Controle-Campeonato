import React, {useState, useEffect, useRef} from 'react'
import { ComponentContainer, SelectedBox, OptionsBox, OptionBox } from './styles';
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

export default function MultiSelectBox({options, handleFunction, placeHolder}) {
    const [isExpandBox, setExpand] = useState(false);
    const [optionsBox, setOptions] = useState(options.map(option => (
        { ...option, selected: false}
    )));

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
        let aux = []
        optionsBox.forEach(option => {
            if(option.selected)
            {
                aux.push(option.value);
            }
        });

        handleFunction(aux);
    }, [optionsBox, handleFunction])

    const checkBox = (index) => {
        let newArray = [...optionsBox];
        newArray[index].selected = !newArray[index].selected;
        setOptions(newArray);
    } 

    return (
        <ComponentContainer>
            <SelectedBox onClick={() =>  setExpand(true)} placeHolder={optionsBox.findIndex(option => option.selected === true) !== -1? true : false}>
                {optionsBox.findIndex(option => option.selected === true) !== -1? optionsBox.map((option, index) => {
                    if(option.selected)
                    {
                        return (
                            <div key={index} style={{margin:'0px 3px', backgroundColor:'#00527E', color:'#fff', padding:'0px 2px'}}>
                                {option.label}
                            </div>
                            )

                    }
                    return "";
                    }) : placeHolder}
            </SelectedBox>

            {isExpandBox?
                <OptionsBox ref={wrapperRef}>
                    {optionsBox.map((option, index) => {
                        return(
                            <OptionBox key={'optionWeek' + index} onClick={() => checkBox(index)}>
                                {option.selected? <GrCheckboxSelected/> :  <GrCheckbox/> }

                                <div style={{marginLeft:'10px'}}>
                                    {option.label}
                                </div>
                            </OptionBox>
                        )
                    })}
                </OptionsBox>
            :null}
        </ComponentContainer>
    )
}
