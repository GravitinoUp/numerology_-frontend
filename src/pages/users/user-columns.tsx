import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import UserSwitch from './user-switch'
import StatusCard from '@/components/status-card/status-card'

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
        header: i18next.t('status.title'),
        accessorKey: 'is_active',
        cell: ({ row }) => (
            <div data-column-id="is_active" className="flex gap-4 items-center">
                <StatusCard status={row.original.is_active} />
                <UserSwitch user={row.original} />
            </div>
        ),
    },
]
