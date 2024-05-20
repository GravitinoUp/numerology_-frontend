import { ColumnDef } from '@tanstack/react-table'
import { CategoryInterface } from '@/types/interface/pages'

export const categoriesColumns: ColumnDef<CategoryInterface>[] = [
    {
        header: 'number',
        accessorKey: 'category_id',
    },
    {
        header: 'title',
        accessorKey: 'category_name',
    },
    {
        header: 'image',
        accessorKey: 'category_image',
    },
    {
        header: 'description',
        accessorKey: 'category_description',
    },
    {
        id: 'actions',
        cell: ({ row }) => <div></div>,
    },
]
