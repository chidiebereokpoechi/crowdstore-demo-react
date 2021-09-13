type Arg = string | undefined | boolean | null | Arg[]

export const getClassNames = (...classNames: Arg[]): string => {
    return classNames.reduce<string>((acc, current) => {
        if (!current) {
            return acc
        }

        if (Array.isArray(current)) {
            return getClassNames(...current)
        }

        return acc + current
    }, '')
}
