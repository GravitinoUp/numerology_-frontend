import React from 'react'
import i18next from 'i18next'
import SearchIcon from '@/assets/icons/search.svg'

type Props = {
    value: string | number
    placeholder?: string
    onChange: (value: string | number) => void
    debounce?: number
    suffixIconClick?: () => void
    filtersEnabled?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const DebouncedInput: React.FC<Props> = ({
    value: initialValue,
    placeholder = i18next.t('placeholder.search'),
    onChange,
    debounce = 500,
    ...props
}) => {
    const [value, setValue] = React.useState<number | string>(initialValue)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <div className="flex items-center justify-start w-full h-11 bg-muted border border-solid rounded-xl overflow-hidden">
            <div className="ml-3 mr-3">
                <SearchIcon />
            </div>
            <div className="flex-auto ">
                <input
                    className="w-full focus:outline-none bg-transparent"
                    {...props}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default DebouncedInput
