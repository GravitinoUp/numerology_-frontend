import { ColumnDef } from '@tanstack/react-table'
import StatusCard from '@/components/status-card/status-card'
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
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p data-column-id="category_name" className="font-medium">
                        {row.original.category_name.en}
                    </p>
                    <p data-column-id="category_name" className="font-medium">
                        {row.original.category_name.ru}
                    </p>
                </div>
            </div>
        ),
    },
    {
        header: i18next.t('status.title'),
        accessorKey: 'is_active',
        cell: () => <StatusCard status={true} />,
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
