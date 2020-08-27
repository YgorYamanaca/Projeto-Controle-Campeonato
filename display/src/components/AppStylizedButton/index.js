import React from 'react'
import './styles.css'

export default function AppStylizedButton({contentText, disabled, onClick}) {
    return (
        <button className="AppButtonContainer" style={{opacity:disabled? '0.5':'1', PointerEvent:disabled? 'none':''}} disabled={disabled} onClick={() => onClick()}>
            {contentText}
        </button>
    )
}
