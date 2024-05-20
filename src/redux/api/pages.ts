import { api } from '.'
import { CategoryInterface, PageInterface } from '@/types/interface/pages'

const pagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryInterface[], void>({
            query: () => ({
                url: 'category/all',
            }),
        }),
        getPages: builder.query<PageInterface[], void>({
            query: () => ({
                url: 'page/all',
            }),
        }),
        getPagesByCategory: builder.query<PageInterface[], number>({
            query: (category: number) => ({
                url: `page/all/${category}`,
            }),
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useGetPagesQuery,
    useGetPagesByCategoryQuery,
} = pagesApi
