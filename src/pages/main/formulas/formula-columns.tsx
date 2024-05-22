import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { FormulaTypeInterface } from '@/types/interface/numbers'

export const formulaColumns: ColumnDef<FormulaTypeInterface>[] = [
    {
        header: i18next.t('key'),
        accessorKey: 'formula_type_id',
    },
    {
        header: i18next.t('name'),
        accessorKey: 'formula_type_name',
    },
    {
        header: i18next.t('status'),
        accessorKey: 'formula_type_description',
    },
]
