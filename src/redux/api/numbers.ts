import { api } from '.'
import { ResultInterface, PageType } from '@/types/interface/numbers'

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
    }),
})

export const {
    useGetNumbersQuery,
    useGetSingleNumberQuery,
    useGetFateCardQuery,
    useGetLuckyNumbersQuery,
    useGetCompatibilityQuery,
} = numbersApi
