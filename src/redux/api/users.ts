import { api } from '.'
import { FetchDataInterface, FetchResultInterface } from '@/types/interface'
import { PayloadInterface } from '@/types/interface/query'
import {
    UpdateUserPayloadInterface,
    UserInterface,
    UserPayloadInterface,
    UserSortInterface,
} from '@/types/interface/users'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<
            FetchDataInterface<UserInterface[]>,
            PayloadInterface<UserInterface, UserSortInterface>
        >({
            query: (body) => ({
                url: 'users/all',
                method: 'POST',
                body,
            }),
            providesTags: ['Users'],
        }),
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
            invalidatesTags: ['Users'],
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
            invalidatesTags: ['Users'],
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
        changeUserStatus: builder.mutation<
            FetchResultInterface,
            Partial<UserInterface>
        >({
            query: (body) => ({
                url: 'users/status',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetCurrentUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useCheckUserExistsMutation,
    useChangeUserStatusMutation,
} = usersApi
