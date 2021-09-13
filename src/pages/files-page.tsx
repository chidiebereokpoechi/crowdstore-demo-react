import { Formik } from 'formik'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { File as FileComponent } from '../components'
import { store } from '../util'

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

export const FilesPage: React.FC = observer(() => {
    const files = store.fileLedger?.entries

    return (
        <Wrapper>
            <aside>
                <span className="title">Upload file</span>
                <Formik
                    initialValues={{}}
                    onSubmit={async (values: any, { resetForm }) => {
                        const formData = new FormData()
                        formData.append('file', values.file as File)
                        resetForm()
                        await store.upload(formData)
                    }}
                >
                    {({ handleSubmit, setFieldValue, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <section>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue(
                                            'file',
                                            event!.currentTarget!.files![0]
                                        )
                                    }}
                                />
                            </section>
                            <button type="submit" disabled={isSubmitting}>
                                <span>
                                    {isSubmitting ? 'Uploading...' : 'Upload'}
                                </span>
                            </button>
                        </form>
                    )}
                </Formik>
            </aside>
            <main>
                <span className="title">List of files</span>
                <div className="list">
                    {files?.length ? (
                        files.map((file, i) => (
                            <FileComponent key={i} {...file} index={i} />
                        ))
                    ) : (
                        <span>You have no uploaded files</span>
                    )}
                </div>
            </main>
        </Wrapper>
    )
})
