interface IOffset {
    count: number
    page: number
}

interface IQuery {
    offset: IOffset
}

export type SortOptionsType = 'ASC' | 'DESC' | null | undefined

export interface PayloadInterface<FilterType, SortType> extends IQuery {
    filter: RecursivePartial<FilterType>
    sorts: Partial<SortType>
    period?: {
        date_start: string
        date_end: string
    }
}

export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P]
}
