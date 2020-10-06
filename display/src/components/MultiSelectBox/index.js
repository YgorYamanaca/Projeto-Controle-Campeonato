import React, {useState, useEffect, useRef} from 'react'
import { ComponentContainer, SelectedBox, OptionsBox, OptionBox } from './styles';

export default function MultiSelectBox({options, handleFunction, placeHolder}) {
    const [isExpandBox, setExpand] = useState(false);
    const [optionsBox, setOptions] = useState(options.map(option => (
        { ...option, Selected: true}
    )));
        console.log(isExpandBox)

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

    return (
        <ComponentContainer>
            <SelectedBox onClick={() => setExpand(true)}>
                {optionsBox.findIndex(option => option.Selected === true) !== -1? optionsBox.map((option, index) => {
                    if(option.Selected)
                    {
                        if(index === optionsBox.length - 1)
                        {
                            return option.label
                        }
                        return option.label + ', '   
                    }
                    return "";
                    }) : placeHolder}
            </SelectedBox>

            {isExpandBox?
                <OptionsBox ref={wrapperRef}>
                    {optionsBox.map((option, index) => {
                        console.log(option)
                        return(
                            <OptionBox key={'optionWeek' + index}>
                                {option.label}
                            </OptionBox>
                        )
                    })}
                </OptionsBox>
            :null}
        </ComponentContainer>
    )
}
