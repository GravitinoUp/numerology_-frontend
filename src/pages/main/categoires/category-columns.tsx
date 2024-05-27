import { ColumnDef } from '@tanstack/react-table'
import { ProgressiveImage } from '@/components/progressive-image'
import StatusCard from '@/components/status-card/status-card'
import StatusSwitch from '@/components/status-switch/status-switch'
import i18next from '@/i18n'
import TableActions from '@/pages/main/categoires/table-actions'
import { FormattedCategoryInterface } from '@/types/interface/pages'

export const categoryColumns: ColumnDef<FormattedCategoryInterface>[] = [
    {
        header: i18next.t('name'),
        accessorKey: 'category_name',
        cell: ({ row }) => (
            <div
                data-column-id="category_name"
                className="flex gap-3 items-center"
            >
                <ProgressiveImage
                    data-column-id="category_name"
                    className="w-10 h-10 rounded-full object-cover"
                    src={`${import.meta.env.VITE_API}${
                        row.original.category_image
                    }`}
                    width={40}
                    height={40}
                    alt=""
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
