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
                url: 'category/all?format_names=false',
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
                url: 'page/all?format_names=false',
            }),
            providesTags: ['Sections'],
        }),
        getPagesByCategory: builder.query<PageInterface[], number>({
            query: (category: number) => ({
                url: `page/all/${category}?format_names=false`,
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
                url: `formula-type/all/${section}?format_names=false`,
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
        changeCategoryStatus: builder.mutation<
            FetchResultInterface,
            Partial<CategoryInterface>
        >({
            query: (body) => ({
                url: 'categories/status',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Categories'],
        }),
        changeSectionStatus: builder.mutation<
            FetchResultInterface,
            Partial<PageInterface>
        >({
            query: (body) => ({
                url: 'categories/status',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Categories'],
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
    useChangeCategoryStatusMutation,
    useChangeSectionStatusMutation,
} = pagesApi
