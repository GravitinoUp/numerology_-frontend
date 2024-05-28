export const getJWTtokens = () => {
    const accessToken = getCookieValue('accessToken')
    const refreshToken = getCookieValue('refreshToken')

    return {
        accessToken,
        refreshToken,
    }
}

export const getCookieValue = (key: string) =>
    document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1]

export const setCookieValue = (key: string, value: string, lifetime: string) =>
    (document.cookie = `${key}=${value}${
        lifetime !== '' ? `; Max-Age=${lifetime}` : ''
    }; Path=/`)

export const removeCookieValue = (key: string) => {
    document.cookie = `${key}=; Max-Age=-1; Path=/`
}
