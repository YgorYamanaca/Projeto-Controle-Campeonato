import React from 'react'
import { UserContainer } from './styles.js'

export default function UserMessage({ message }) {
    return (
        <UserContainer color={message.status}>
            {message.message}
        </UserContainer>
    )
}
