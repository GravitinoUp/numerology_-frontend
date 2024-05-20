import { api } from '.'
import { FetchResultInterface } from '@/types/interface'
import {
    UpdateUserPayloadInterface,
    UserInterface,
    UserPayloadInterface,
} from '@/types/interface/users'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserInterface, void>({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        createUser: builder.mutation<
            FetchResultInterface,
            UserPayloadInterface
        >({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
        updateUser: builder.mutation<
            FetchResultInterface,
            UpdateUserPayloadInterface
        >({
            query: (body) => ({
                url: 'users/my',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        checkUserExists: builder.mutation<
            FetchResultInterface,
            { phone: string }
        >({
            query: (body) => ({
                url: 'users/check-exists',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {
    useGetCurrentUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useCheckUserExistsMutation,
} = usersApi
