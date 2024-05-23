export interface ErrorInterface {
    status: number
    data?: ErrorDataInterface
}

export interface ErrorDataInterface {
    message: string
    url?: string
    method?: string
    error: string
    statusCode: number
}

export interface FetchDataInterface<T> {
    count: number
    data: T
}

export interface FetchResultInterface<T = void> {
    status: boolean
    data?: T
}

export interface FileData {
    id: string
    fileURL?: string
    file?: File
}

export interface LocalizationInterface<T> {
    ru: T
    en: T
}
