import { api } from '.'
import { FetchResultInterface } from '@/types/interface'
import { FormulaTypeInterface } from '@/types/interface/numbers'
import {
    CategoryInterface,
    CategoryPayloadInterface,
    PageInterface,
    PagePayloadInterface,
} from '@/types/interface/pages'

const pagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryInterface[], void>({
            query: () => ({
                url: 'category/all',
            }),
            providesTags: ['Categories'],
        }),
        updateCategory: builder.mutation<
            FetchResultInterface,
            CategoryPayloadInterface
        >({
            query: (body) => ({
                url: 'category',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Categories'],
        }),
        getPages: builder.query<PageInterface[], void>({
            query: () => ({
                url: 'page/all',
            }),
            providesTags: ['Sections'],
        }),
        getPagesByCategory: builder.query<PageInterface[], number>({
            query: (category: number) => ({
                url: `page/all/${category}`,
            }),
            providesTags: ['Sections'],
        }),
        updatePage: builder.mutation<
            FetchResultInterface,
            PagePayloadInterface
        >({
            query: (body) => ({
                url: 'page',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Sections'],
        }),
        getFormulasBySection: builder.query<FormulaTypeInterface[], string>({
            query: (section) => ({
                url: `formula-type/all/${section}`,
            }),
        }),
        uploadFiles: builder.mutation<
            string[],
            { directory: string; formData: FormData }
        >({
            query: ({ directory, formData }) => ({
                url: `files/upload?directory=${directory}`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useGetPagesQuery,
    useGetPagesByCategoryQuery,
    useUpdatePageMutation,
    useGetFormulasBySectionQuery,
    useUploadFilesMutation,
} = pagesApi
