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

export interface FetchResultInterface<T = void> {
    status: boolean
    data?: T
}
