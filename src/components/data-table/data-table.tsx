import { useEffect, useMemo, useState } from 'react'
import {
    Cell,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'

import { useTranslation } from 'react-i18next'
import { getCellAlignment, getCellTextColor } from './get-cell-class'
import CustomTableHead from './table-head'
import { TablePagination } from './table-pagination'
import { DebouncedInput } from '../search-input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Skeleton } from '../ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE_LIST = [10, 20, 30, 40, 50]
const SKELETON_ITEMS_COUNT = 10

type CustomColumnDef<TData, TValue = unknown> = {
    accessorKey?: string
} & ColumnDef<TData, TValue>

interface DataTableProps<TData, TValue> {
    columns: CustomColumnDef<TData, TValue>[]
    data: TData[]
    hasBackground?: boolean
    onRowClick?: (rowData: TData) => void
    searchSuffixIconClick?: () => void
    searchPlaceholder?: string
    columnVisibility?: VisibilityState
    filtersEnabled?: boolean
    getTableInfo?: (
        pageSize: number,
        pageIndex: number,
        sorting: SortingState,
        filter?: string
    ) => void
    paginationInfo: { itemCount: number; pageSize: number; pageIndex: number }
    isLoading?: boolean
    stickyHeader?: boolean
    scrollClassName?: string
}

function DataTable<TData, TValue>({
    columns,
    data,
    hasBackground = true,
    onRowClick,
    searchSuffixIconClick,
    searchPlaceholder,
    columnVisibility = {},
    filtersEnabled,
    getTableInfo: getTableInfo = () => {},
    paginationInfo,
    isLoading,
    stickyHeader,
}: DataTableProps<TData, TValue>) {
    const { t } = useTranslation()
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const tableData = useMemo(
        () => (isLoading ? Array(SKELETON_ITEMS_COUNT).fill({}) : data),
        [isLoading, data]
    )
    const tableColumns = useMemo(
        () =>
            isLoading
                ? columns.map((column) => ({
                      ...column,
                      cell: ({ cell }: { cell: Cell<unknown, unknown> }) => {
                          const isActions = cell.column.id === 'actions'
                          const isId = cell.column.id.includes('id')
                          const isSelect = cell.column.id === 'select'
                          if (isActions || isId) {
                              return <Skeleton className="h-6 w-6" />
                          }

                          return (
                              <Skeleton
                                  className={
                                      isSelect ? 'h-4 w-4' : 'h-6 w-[100px]'
                                  }
                              />
                          )
                      },
                  }))
                : columns,
        [isLoading, columns]
    )

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageIndex: paginationInfo.pageIndex,
                pageSize: paginationInfo.pageSize,
            },
        },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        pageCount: Math.ceil(
            paginationInfo.itemCount / paginationInfo.pageSize
        ),
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    useEffect(() => {
        getTableInfo(
            table.getState().pagination.pageSize,
            table.getState().pagination.pageIndex,
            table.getState().sorting,
            globalFilter !== '' ? globalFilter.trim() : undefined
        )
    }, [
        table.getState().pagination.pageSize,
        table.getState().pagination.pageIndex,
    ])

    useEffect(() => {
        getTableInfo(
            table.getState().pagination.pageSize,
            0,
            table.getState().sorting,
            globalFilter !== '' ? globalFilter.trim() : undefined
        )
    }, [table.getState().sorting, globalFilter])

    return (
        <div
            className={cn(
                hasBackground &&
                    'bg-white rounded-2xl mt-4 flex flex-wrap items-center justify-start w-full border'
            )}
        >
            <div className="flex w-full px-6 py-3 gap-4">
                <DebouncedInput
                    value={globalFilter ?? ''}
                    placeholder={searchPlaceholder}
                    onChange={(value) => setGlobalFilter(String(value))}
                    suffixIconClick={searchSuffixIconClick}
                    filtersEnabled={filtersEnabled}
                />
                <Select
                    value={String(paginationInfo.pageSize)}
                    onValueChange={(value) => {
                        table?.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-11 w-[79px]">
                        <SelectValue placeholder={paginationInfo.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {ITEMS_PER_PAGE_LIST.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader
                    className={cn(
                        'bg-secondary border-t',
                        !isLoading && stickyHeader && 'sticky top-0'
                    )}
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <CustomTableHead
                                    key={header.id}
                                    header={header}
                                />
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                onClick={(e) => {
                                    const clickedColumnId = (
                                        e.target as HTMLTableRowElement
                                    ).getAttribute('data-column-id')

                                    if (
                                        typeof onRowClick !== 'undefined' &&
                                        clickedColumnId !== null &&
                                        !isLoading
                                    ) {
                                        onRowClick(row.original)
                                    }
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={cn(
                                            'text-[15px]',
                                            getCellTextColor(cell.column.id),
                                            getCellAlignment(cell.column.id)
                                        )}
                                        data-column-id={cell.column.id}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                {t('error.nothing.found')}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {table.getRowModel().rows?.length > 0 && (
                <TablePagination table={table} pagination={paginationInfo} />
            )}
        </div>
    )
}

export default DataTable
