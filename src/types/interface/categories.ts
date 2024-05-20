import { PageType } from './numbers'

export interface CategoryInterface {
    label: string
    image: string
    pages: {
        label: string
        route: string
        type: PageType
    }[]
}
