import { api } from '.'
import { NotificationInterface } from '@/types/interface/notifications'

const notificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationInterface[], void>({
            query: () => ({
                url: 'notifications/my',
            }),
        }),
    }),
})

export const { useGetNotificationsQuery } = notificationsApi
