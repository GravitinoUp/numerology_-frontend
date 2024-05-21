import { ColumnDef } from '@tanstack/react-table'
import i18next from '@/i18n'
import TableActions from '@/pages/main/categoires/table-actions'
import { CategoryInterface } from '@/types/interface/pages'

export const categoryColumns: ColumnDef<CategoryInterface>[] = [
    {
        header: i18next.t('name'),
        accessorKey: 'category_name',
        cell: ({ row }) => (
            <div
                data-column-id="category_name"
                className="flex gap-3 items-center"
            >
                <img
                    data-column-id="category_name"
                    src={`${import.meta.env.VITE_API}${
                        row.original.category_image
                    }`}
                    className="w-10 h-10 rounded-full"
                />
                <p className="font-medium">{row.original.category_name}</p>
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
