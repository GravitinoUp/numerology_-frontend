import { api } from '.'
import { FetchResultInterface } from '@/types/interface'
import {
    ResultInterface,
    PageType,
    ResultPayloadInterface,
} from '@/types/interface/numbers'

const numbersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNumbers: builder.query<
            ResultInterface[],
            { type: PageType; query?: string | number }
        >({
            query: ({ type, query }) => ({
                url: `number/${type}?query=${query}`,
            }),
        }),
        getNumbersBySection: builder.query<ResultInterface[], string>({
            query: (type) => ({
                url: `formula-result/all/${type}?format_names=false`,
            }),
            providesTags: ['Numbers'],
        }),
        getSingleNumber: builder.query<
            ResultInterface,
            { type: PageType; query?: string | number }
        >({
            query: ({ type, query }) => ({
                url: `number/${type}?query=${query}`,
            }),
        }),
        getFateCard: builder.query<ResultInterface, void>({
            query: () => ({
                url: 'number/fate-card',
            }),
        }),
        getLuckyNumbers: builder.query<number[], void>({
            query: () => ({
                url: 'number/lucky-numbers',
            }),
        }),
        getCompatibility: builder.query<
            ResultInterface[],
            { first_partner_date: string; second_partner_date: string }
        >({
            query: (body) => ({
                url: `number/compatibility`,
                method: 'POST',
                body,
            }),
        }),
        updateResult: builder.mutation<
            FetchResultInterface,
            ResultPayloadInterface
        >({
            query: (body) => ({
                url: 'formula-result',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Numbers'],
        }),
    }),
})

export const {
    useGetNumbersQuery,
    useGetNumbersBySectionQuery,
    useGetSingleNumberQuery,
    useGetFateCardQuery,
    useGetLuckyNumbersQuery,
    useGetCompatibilityQuery,
    useUpdateResultMutation,
} = numbersApi
