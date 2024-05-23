import { formatISO } from 'date-fns'

const DEFAULT_ITEMS_PER_PAGE = 10

export const defaultQuery = {
    offset: {
        count: DEFAULT_ITEMS_PER_PAGE,
        page: 1,
    },
    filter: {},
    sorts: {},
}

export const defaultQueryWithPeriod = {
    offset: {
        count: DEFAULT_ITEMS_PER_PAGE,
        page: 1,
    },
    filter: {},
    sorts: {},
    period: {
        date_start: formatISO(new Date(), { representation: 'date' }),
        date_end: formatISO(new Date(), { representation: 'date' }),
    },
}
