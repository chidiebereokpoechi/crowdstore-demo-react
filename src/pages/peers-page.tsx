import { isIP, isPort, isUUID } from 'class-validator'
import { Formik } from 'formik'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Peer, TextBox } from '../components'
import { Node, store } from '../util'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    background: white;

    .title {
        display: flex;
        font-weight: bold;
        margin-bottom: 2rem;
        font-size: 125%;
    }

    aside {
        border-right: 1px solid #ddd;
        max-width: 300px;
        width: 100%;
        padding: 2rem;
        height: 100%;
    }

    form section {
        margin-bottom: 2rem;
    }

    main {
        height: 100%;
        padding: 2rem;
        overflow-y: auto;
        flex: 1;
    }

    .list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`

export const PeersPage: React.FC = observer(() => {
    const peers = Object.entries(store.peers)
    console.log(peers)

    return (
        <Wrapper>
            <aside>
                <span className="title">Add peer</span>
                <Formik
                    initialValues={{ id: '', address: '' } as Node}
                    validate={({ id, address }) => {
                        const errors: Record<string, string> = {}
                        const [ip, port] = address.split(':')

                        if (!isUUID(id)) {
                            errors.id = 'Invalid ID'
                        }

                        if (!isIP(ip) || !isPort(port)) {
                            errors.address = 'Invalid address'
                        }

                        return errors
                    }}
                    onSubmit={(node, { resetForm }) => {
                        store.addPeer(node)
                        resetForm()
                    }}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <section>
                                <TextBox name="id" placeholder="ID" />
                            </section>
                            <section>
                                <TextBox
                                    name="address"
                                    placeholder="100.100.100.20:6789"
                                />
                            </section>
                            <button type="submit">
                                <span>Add</span>
                            </button>
                        </form>
                    )}
                </Formik>
            </aside>
            <main>
                <span className="title">List of peers</span>
                <div className="list">
                    {peers.length ? (
                        peers.map(([id, address], i) => (
                            <Peer key={i} id={id} address={address} />
                        ))
                    ) : (
                        <span>You have no peers</span>
                    )}
                </div>
            </main>
        </Wrapper>
    )
})
