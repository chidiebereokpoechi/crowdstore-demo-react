import React from 'react'
import styled from 'styled-components'
import { Button } from '.'

const Wrapper = styled.div`
    background: #e0e0e7;
    padding: 4rem;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    header {
        font-weight: 700;
        font-size: 5rem;
        margin-bottom: 2rem;
    }

    main {
        flex: 1;
        margin-bottom: 4rem;
    }

    footer {
        /* background: red; */
    }
`

interface Props {
    title: string
}

export const Page: React.FC<Props> = ({ children, title }) => {
    return (
        <Wrapper>
            <header>{title}</header>
            <main>{children}</main>
            <footer>
                <Button text="Upload" onClick={() => {}} />
            </footer>
        </Wrapper>
    )
}
