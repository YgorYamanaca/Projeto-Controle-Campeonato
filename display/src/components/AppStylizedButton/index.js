import React from 'react'
import { AppButtonContainer } from './styles.js'

export default function AppStylizedButton({contentText, disabled, onClick}) {
    return (
        <AppButtonContainer style={{opacity:disabled? '0.5':'1', PointerEvent:disabled? 'none':''}} disabled={disabled} onClick={(e) => onClick(e)}>
            {contentText}
        </AppButtonContainer>
    )
}
