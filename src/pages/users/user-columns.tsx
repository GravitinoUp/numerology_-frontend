import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import UserSwitch from './user-switch'

export interface FormattedUserInterface {
    user_uuid: string
    fio: string
    role: string
    is_active: boolean
}

export const userColumns: ColumnDef<FormattedUserInterface>[] = [
    {
        header: i18next.t('uuid'),
        accessorKey: 'user_uuid',
    },
    {
        header: i18next.t('user.fio'),
        accessorKey: 'fio',
    },
    {
        header: i18next.t('user.role'),
        accessorKey: 'role',
    },
    {
        header: i18next.t('status'),
        accessorKey: 'is_active',
        cell: ({ row }) => <UserSwitch user={row.original} />,
    },
]
