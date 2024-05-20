import { api } from '.'
import { OnboardInterface } from '@/types/interface/onboard'

const onboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllOnboardScreens: builder.query<OnboardInterface[], void>({
            query: () => ({
                url: 'onboard/all',
            }),
        }),
    }),
})

export const { useGetAllOnboardScreensQuery } = onboardApi
