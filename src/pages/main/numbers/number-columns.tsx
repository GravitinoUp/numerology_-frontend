import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import TableActions from './table-actions'
import { ResultInterface } from '@/types/interface/numbers'

export const numberColumns: ColumnDef<ResultInterface>[] = [
    {
        header: i18next.t('key'),
        accessorKey: 'result_keys',
    },
    {
        header: i18next.t('name'),
        accessorKey: 'result_name',
        cell: ({ row }) => (
            <div data-column-id="page_name" className="flex gap-3 items-center">
                <img
                    data-column-id="page_name"
                    src={`${import.meta.env.VITE_API}${
                        row.original.result_image
                    }`}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-medium">{row.original.result_name}</p>
            </div>
        ),
    },
    {
        header: i18next.t('content'),
        accessorKey: 'result_content',
        cell: ({ row }) => (
            <div className="max-w-[300px]">
                <p className="text-wrap break-words line-clamp-2">
                    {row.original.result_content}
                </p>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <TableActions item={row.original} />,
    },
]
