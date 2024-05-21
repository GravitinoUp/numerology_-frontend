import { useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import i18next from 'i18next'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command.tsx'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.tsx'
import { ScrollBar } from '@/components/ui/scroll-area.tsx'
import { cn } from '@/lib/utils.ts'

interface CustomMultiSelectProps<T> extends ButtonProps {
    selectedValues: T[]
    setSelectedValues: (values: T[]) => void
    placeholder?: string
    disabledPlaceholder?: string
    disabled?: boolean
    items: { value: T; label: string }[]
}

export default function CustomMultiSelect<T>({
    selectedValues,
    setSelectedValues,
    placeholder = i18next.t('placeholder.select'),
    disabledPlaceholder = i18next.t('placeholder.select'),
    disabled = false,
    items,
    className,
}: CustomMultiSelectProps<T>) {
    const { t } = useTranslation()
    const [popoverOpen, setPopoverOpen] = useState(false)

    const isNotEmpty = selectedValues && selectedValues.length !== 0

    const selectedItems = selectedValues
        .reduce(
            (acc, item) =>
                `${acc}, ${items.find(({ value }) => item === value)?.label}`,
            ''
        )
        .toString()

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className={cn(
                        'flex w-full justify-between rounded-2xl min-h-10 h-auto text-left whitespace-normal [&>span]:line-clamp-1',
                        className
                    )}
                >
                    <span className="pointer-events-none">
                        {isNotEmpty
                            ? selectedItems.substring(2, selectedItems.length)
                            : !disabled
                            ? placeholder
                            : disabledPlaceholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={t('placeholder.search')} />
                    <CommandEmpty>{t('error.nothing.found')}</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea.Root>
                            <ScrollArea.Viewport className="max-h-[320px] max-w-[500px]">
                                {selectedValues.length > 0 ? (
                                    <CommandItem
                                        key={`unselect-all`}
                                        onSelect={() => {
                                            setSelectedValues([])
                                        }}
                                    >
                                        <Check className="mr-2 h-4 w-4 opacity-0" />
                                        {t('multiselect.unselect.all')}
                                    </CommandItem>
                                ) : (
                                    <CommandItem
                                        key={`select-all`}
                                        onSelect={() => {
                                            setSelectedValues(
                                                items.map((item) => item.value)
                                            )
                                        }}
                                    >
                                        <Check className="mr-2 h-4 w-4 opacity-0" />
                                        {t('multiselect.select.all')}
                                    </CommandItem>
                                )}
                                {items.map(({ value, label }) => (
                                    <CommandItem
                                        key={`${value}`}
                                        onSelect={() => {
                                            if (
                                                selectedValues.includes(value)
                                            ) {
                                                setSelectedValues(
                                                    selectedValues.filter(
                                                        (item) => item !== value
                                                    )
                                                )
                                            } else {
                                                setSelectedValues([
                                                    ...selectedValues,
                                                    value,
                                                ])
                                            }
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                selectedValues.includes(value)
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {label.replaceAll('"', "'")}
                                    </CommandItem>
                                ))}
                            </ScrollArea.Viewport>
                            <ScrollBar />
                            <ScrollArea.Corner />
                        </ScrollArea.Root>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
