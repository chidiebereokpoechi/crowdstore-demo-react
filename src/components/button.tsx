import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
    background: black;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
    outline: none;
    border: none;
`

interface Props {
    text: string
    onClick: (...args: any[]) => any
}

export const Button: React.FC<Props> = ({ onClick, text }) => {
    return (
        <Wrapper onClick={onClick}>
            <span>{text}</span>
        </Wrapper>
    )
}
