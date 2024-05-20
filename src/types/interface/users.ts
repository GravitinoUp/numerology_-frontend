export interface UserInterface {
    user_uuid: string
    is_active: boolean
    email: string | null
    phone: string
    role: RoleInterface
    person: PersonInterface
}

interface RoleInterface {
    role_id: number
    role_name: string
}

interface PersonInterface {
    person_uuid: string
    last_name: string
    first_name: string
    patronymic: string
    birthday_day: number
    birthday_month: number
    birthday_year: number
}

export interface UserPayloadInterface {
    last_name?: string
    first_name?: string
    patronymic?: string
    birthday_day: number
    birthday_month: number
    birthday_year: number
    email?: string
    phone: string
    password: string
    code: number
}

export interface UpdateUserPayloadInterface {
    last_name?: string
    first_name?: string
    patronymic?: string
    birthday_day?: number
    birthday_month?: number
    birthday_year?: number
}
