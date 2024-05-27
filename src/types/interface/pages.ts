import { LocalizationInterface } from '.'
import { PageType } from './numbers'

export interface FormattedCategoryInterface {
    count: number
    category_id: number
    category_name: LocalizationInterface<string>
    category_description: LocalizationInterface<string>
    category_image: string
    position: number
    is_active: boolean
}

export interface CategoryInterface {
    category_id: number
    category_name: LocalizationInterface<string>
    category_description: LocalizationInterface<string>
    category_image: string
    position: number
    is_active: boolean
}

export interface CategoryPayloadInterface {
    category_id: number
    category_name: string
    category_description: string
    category_image: string
    position: number
    old_position: number
}

export interface PageInterface {
    key: PageType
    category_id: number
    page_uuid: number
    page_name: LocalizationInterface<string>
    page_description: LocalizationInterface<string>
    page_image: string
    page_icon: string
    color: string
    is_active: boolean
}

export interface PagePayloadInterface {
    key: PageType
    category_id: number
    page_uuid: number
    page_name: string
    page_description: string
    page_image: string
    page_icon: string
    color: string
}
