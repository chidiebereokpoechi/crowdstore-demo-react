import React from 'react'
import styled from 'styled-components'
import { Node, store } from '../util'

const Wrapper = styled.div`
    background: white;
    border: 1px solid #ddd;
    outline: none;
    padding: 1rem 1.5rem;
    display: flex;

    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    section:first-of-type {
        flex: 1;
    }
`

export const Peer: React.FC<Node> = ({ id, address }) => {
    return (
        <Wrapper>
            <section>
                <code>Node ID : {id}</code>
                <code>Address : {address}</code>
            </section>
            <section>
                <button onClick={() => store.removePeer(id)}>
                    <span>Remove</span>
                </button>
            </section>
        </Wrapper>
    )
}
