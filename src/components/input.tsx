import Color from 'color'
import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { getClassNames, Theme } from '../util'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
        width: inherit;
        height: 2.5rem;
        background: #fafafa;
        border: none;
        border-radius: 0.5rem;
        outline: none;
        appearance: none;
        padding: 0 1rem;
    }
    input:focus {
        box-shadow: 0 0 0 0.25rem
            ${Color(Theme.PRIMARY_COLOR).alpha(0.6).string()};
    }

    input:placeholder-shown {
        background: #f5f5f5;
    }

    &.valid input {
        box-shadow: 0 0 0 0.25rem
            ${Color(Theme.VALID_COLOR).alpha(0.6).string()};
    }
    &.invalid input {
        box-shadow: 0 0 0 0.25rem
            ${Color(Theme.ERROR_COLOR).alpha(0.6).string()};
    }
    input::placeholder {
        color: #b9b9b9;
        font-weight: bold;
    }
    .error-message {
        color: var(--error-color);
        margin-left: 1rem;
        font-size: 0.8rem;
        margin-top: 1rem;
    }
`

interface Props extends React.ComponentPropsWithoutRef<'input'> {
    name: string
    placeholder: string
}

export const TextBox: React.FC<Props> = ({ name, className, ...props }) => {
    const [field, meta] = useField({ name })
    const invalid = React.useMemo(() => meta.error && meta.touched, [meta])
    const valid = React.useMemo(() => !meta.error && meta.touched, [meta])

    return (
        <Wrapper
            className={getClassNames(
                className,
                invalid && 'invalid',
                valid && 'valid'
            )}
        >
            <input {...field} {...props} autoComplete="off" />
            {invalid && <span className="error-message">{meta.error}</span>}
        </Wrapper>
    )
}
