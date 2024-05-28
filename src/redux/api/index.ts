import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'
import { getJWTtokens, setCookieValue } from '@/utils/cookie'

export const api = createApi({
    reducerPath: 'api',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        prepareHeaders: async (headers) => {
            const { accessToken, refreshToken } = await getJWTtokens()

            headers.set('Accept-Language', i18next.language)
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            } else {
                if (refreshToken) {
                    const refreshHeaders = new Headers()
                    refreshHeaders.append('Content-Type', 'application/json')

                    const requestOptions = {
                        method: 'POST',
                        headers: refreshHeaders,
                        body: JSON.stringify({
                            refresh_token: refreshToken,
                        }),
                    }

                    const response = await fetch(
                        `${import.meta.env.VITE_API}/auth/refresh`,
                        requestOptions
                    )

                    if (response.ok) {
                        const newAccessToken = await response.text()
                        setCookieValue('accessToken', newAccessToken, '43200')
                        //document.cookie = `accessToken=${newAccessToken}; Max-Age=43200`
                        headers.set('Authorization', `Bearer ${newAccessToken}`)
                    }
                }
            }

            return headers
        },
    }),
    tagTypes: ['Categories', 'Sections', 'Numbers', 'Users'],
    endpoints: () => ({}),
})
