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
        cell: ({ row }) => (
            <div data-column-id="formula_type_name">
                <p data-column-id="formula_type_name" className="font-medium">
                    {row.original.formula_type_name.en}
                </p>
                <p data-column-id="formula_type_name" className="font-medium">
                    {row.original.formula_type_name.ru}
                </p>
            </div>
        ),
    },
    {
        header: i18next.t('status'),
        accessorKey: 'formula_type_description',
        cell: ({ row }) => (
            <div data-column-id="formula_type_description">
                <p data-column-id="formula_type_description">
                    {row.original.formula_type_description.en}
                </p>
                <p data-column-id="formula_type_description">
                    {row.original.formula_type_description.ru}
                </p>
            </div>
        ),
    },
]
