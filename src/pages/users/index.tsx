import { useState } from 'react'
import { t } from 'i18next'
import { userColumns } from './user-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { defaultQuery } from '@/constants'
import { useGetUsersQuery } from '@/redux/api/users'
import { formatName } from '@/utils/helpers'

export default function UsersPage() {
    const [usersQuery, setUsersQuery] = useState(defaultQuery)

    const {
        data: users = { count: 0, data: [] },
        isFetching,
        error,
        refetch,
    } = useGetUsersQuery(usersQuery)

    const formattedUsers = users.data.map((value) => ({
        user_uuid: value.user_uuid,
        fio: formatName(
            value.person.last_name,
            value.person.first_name,
            value.person.patronymic
        ),
        role: value.role.role_name,
        is_active: value.is_active,
    }))

    return !error ? (
        <PageLayout title={t('page.users')}>
            <DataTable
                columns={userColumns}
                data={formattedUsers}
                getTableInfo={(pageSize, pageIndex, sorting, filter) => {
                    const sorts = sorting.reduce((acc, value) => {
                        const currentSortOrder = value.desc ? 'DESC' : 'ASC'

                        switch (value.id) {
                            case 'fio':
                                return {
                                    ...acc,
                                    person: {
                                        last_name: currentSortOrder,
                                        first_name: currentSortOrder,
                                        patronymic: currentSortOrder,
                                    },
                                }
                            case 'role':
                                return {
                                    ...acc,
                                    role: {
                                        role_name: currentSortOrder,
                                    },
                                }
                            default:
                                return {
                                    ...acc,
                                    [`${value.id}`]: currentSortOrder,
                                }
                        }
                    }, {})

                    setUsersQuery({
                        ...usersQuery,
                        sorts,
                        filter: {
                            ...usersQuery.filter,
                            person: filter ? { last_name: filter } : undefined,
                        },
                        offset: {
                            count: pageSize,
                            page: pageIndex + 1,
                        },
                    })
                }}
                paginationInfo={{
                    itemCount: users.count,
                    pageSize: usersQuery.offset.count,
                    pageIndex: usersQuery.offset.page - 1,
                }}
                isLoading={isFetching}
            />
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
