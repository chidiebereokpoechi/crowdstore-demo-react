import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { LedgerEntry, store } from '../util'

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

const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const File: React.FC<LedgerEntry & { index: number }> = ({
    name,
    size,
    index,
    chunks,
}) => {
    const [loading, setLoading] = useState(false)
    const canDownload = useMemo(() => {
        return chunks.every(({ location: id }) => !!store.peers[id])
    }, [chunks])

    return (
        <Wrapper>
            <section>
                <code>Name : {name}</code>
                <code>Size : {formatBytes(size)}</code>
            </section>
            <section>
                {canDownload ? (
                    <button
                        onClick={() => {
                            setLoading(true)
                            store
                                .downloadFile(index)
                                .then(() => setLoading(false))
                                .catch(() => setLoading(false))
                        }}
                        disabled={loading}
                    >
                        <span>{loading ? 'Loading...' : 'Download'}</span>
                    </button>
                ) : (
                    <span>Not downloadable</span>
                )}
            </section>
        </Wrapper>
    )
}
