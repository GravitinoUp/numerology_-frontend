export interface AuthInterface {
    isLogin: boolean
}

export interface TokenInterface {
    refreshToken: string | null
    accessToken: string | null
}

export interface AuthPayloadInterface {
    phone: string
    password: string
}

export interface RefreshPayloadInterface {
    refresh_token: string
}
