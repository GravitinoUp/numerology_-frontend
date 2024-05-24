import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import TableActions from './table-actions'
import StatusCard from '@/components/status-card/status-card'
import StatusSwitch from '@/components/status-switch/status-switch'
import { PageInterface } from '@/types/interface/pages'

export const sectionColumns: ColumnDef<PageInterface>[] = [
    {
        header: i18next.t('name'),
        accessorKey: 'page_name',
        cell: ({ row }) => (
            <div data-column-id="page_name" className="flex gap-3 items-center">
                <img
                    data-column-id="page_name"
                    src={`${import.meta.env.VITE_API}${
                        row.original.page_image
                    }`}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div data-column-id="page_name">
                    <p data-column-id="page_name" className="font-medium">
                        {row.original.page_name.en}
                    </p>
                    <p data-column-id="page_name" className="font-medium">
                        {row.original.page_name.ru}
                    </p>
                </div>
            </div>
        ),
    },
    {
        header: i18next.t('status.title'),
        accessorKey: 'is_active',
        cell: ({ row }) => (
            <div data-column-id="is_active" className="flex gap-4 items-center">
                <StatusCard status={row.original.is_active} />
                <StatusSwitch item={row.original} />
            </div>
        ),
    },
    {
        header: i18next.t('position'),
        accessorKey: 'position',
    },
    {
        id: 'actions',
        cell: ({ row }) => <TableActions item={row.original} />,
    },
]
