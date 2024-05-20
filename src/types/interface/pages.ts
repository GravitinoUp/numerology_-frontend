import { PageType } from './numbers'

export interface CategoryInterface {
    category_id: number
    category_name: string
    category_image: string
    category_description: string
}

export interface PageInterface {
    key: PageType
    page_uuid: number
    page_name: string
    page_description: string
    page_image: string
    page_icon: string
    color: string
    category_id: number
}
