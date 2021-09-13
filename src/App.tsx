import { observer } from 'mobx-react'
import React from 'react'
import ReactJson from 'react-json-view'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { FilesPage, PeersPage } from './pages'
import { store } from './util'

const Wrapper = styled.div`
    background: #f5f5fb;
    padding: 3rem;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    > header {
        margin-bottom: 3rem;

        .title {
            font-weight: 700;
            display: flex;
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }

        .node-id {
            display: flex;
            color: #474747;
            font-size: 0.85rem;
        }

        nav {
            font-weight: 700;
            background: black;
            display: flex;
            padding: 1rem;
            margin-top: 2rem;

            a {
                color: white;
                padding: 0.5rem 1rem;
                font-size: 1.25rem;
                text-decoration: none;
            }

            a.active {
                color: #84bdff;
            }
        }

        nav main {
            flex: 1;
        }
    }

    > main {
        flex: 1;
        overflow: hidden;
    }

    .title {
        display: flex;
        font-weight: bold;
        margin-bottom: 2rem;
        font-size: 125%;
    }

    .page-body {
        background: white;
        padding: 2rem;
        overflow-y: auto;
        height: 100%;
    }
`

export const App: React.FC = observer(() => {
    const nodeId = store.nodeId

    return (
        <BrowserRouter>
            <Wrapper>
                <header>
                    {/* <span className="title">CrowdStore</span> */}
                    <code className="node-id">NodeID : {nodeId}</code>
                    <nav>
                        <main className="main">
                            <NavLink exact to="/">
                                Files
                            </NavLink>
                            <NavLink to="/peers">Peers</NavLink>
                            <NavLink to="/blockchain">Blockchain</NavLink>
                            <NavLink to="/file-ledger">File Ledger</NavLink>
                        </main>
                        <section className="end">
                            <button
                                onClick={() => {
                                    store.refresh()
                                }}
                            >
                                <span>Refresh</span>
                            </button>
                        </section>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={FilesPage} />
                        <Route exact path="/peers" component={PeersPage} />
                        <Route exact path="/blockchain">
                            <div className="page-body">
                                <span className="title">Blockchain</span>
                                <ReactJson src={store.blockchain ?? {}} />
                            </div>
                        </Route>
                        <Route exact path="/file-ledger">
                            <div className="page-body">
                                <span className="title">File Ledger</span>
                                <ReactJson src={store.fileLedger ?? {}} />
                            </div>
                        </Route>
                    </Switch>
                </main>
            </Wrapper>
        </BrowserRouter>
    )
})
