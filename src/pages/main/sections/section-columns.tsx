import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import TableActions from './table-actions'
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
                <p className="font-medium">{row.original.page_name}</p>
            </div>
        ),
    },
    {
        header: i18next.t('status'),
        accessorKey: 'is_active',
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
