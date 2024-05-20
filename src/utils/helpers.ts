import { format } from 'date-fns'
import i18next from 'i18next'

export const formatDate = (
    date?: string | Date | null,
    includeTime?: boolean
) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(
        newDate,
        `${i18next.t('date.format')}${includeTime ? ' HH:mm' : ''}`
    )
}

export const formatDateISO = (
    date?: string | Date | null,
    includeTime?: boolean
) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(newDate, `yyyy-MM-dd${includeTime ? ' HH:mm' : ''}`)
}

export const formatTime = (date?: string | Date | null) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(newDate, `HH:mm`)
}
