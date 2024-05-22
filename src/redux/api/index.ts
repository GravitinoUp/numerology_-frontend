import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'
import { getJWTtokens } from '@/utils/cookie'

export const api = createApi({
    reducerPath: 'api',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        prepareHeaders: async (headers) => {
            const { accessToken } = await getJWTtokens()

            headers.set('Accept-Language', i18next.language)
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers
        },
    }),
    tagTypes: ['Categories', 'Sections', 'Numbers', 'User'],
    endpoints: () => ({}),
})
