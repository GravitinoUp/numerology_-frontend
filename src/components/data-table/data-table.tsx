import { useEffect, useMemo, useState } from 'react'
import {
    Cell,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
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
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
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
const CELL_HEIGHT = 'h-[81px]'

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
    manualFilters?: boolean
}

function DataTable<TData, TValue>({
    columns,
    data,
    hasBackground = true,
    onRowClick,
    searchSuffixIconClick,
    searchPlaceholder,
    columnVisibility = {},
    getTableInfo: getTableInfo = () => {},
    paginationInfo,
    isLoading,
    stickyHeader,
    scrollClassName = 'h-[500px]',
    manualFilters = true,
}: DataTableProps<TData, TValue>) {
    const { t } = useTranslation()
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const tableData = useMemo(
        () => (isLoading ? Array(paginationInfo.pageSize).fill({}) : data),
        [paginationInfo.pageSize, isLoading, data]
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
                              return (
                                  <div
                                      className={cn(
                                          'flex items-center justify-end gap-2 h-12'
                                      )}
                                  >
                                      <Skeleton className="h-10 w-10 rounded-full" />
                                  </div>
                              )
                          }

                          return (
                              <div className="flex items-center h-12">
                                  <Skeleton
                                      className={
                                          isSelect ? 'h-4 w-4' : 'h-6 w-[120px]'
                                      }
                                  />
                              </div>
                          )
                      },
                  }))
                : columns,
        [isLoading, columns]
    )

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        state: manualFilters
            ? {
                  globalFilter,
                  columnFilters,
                  columnVisibility,
                  rowSelection,
              }
            : {
                  columnVisibility,
                  rowSelection,
              },
        initialState: {
            pagination: {
                pageIndex: paginationInfo.pageIndex,
                pageSize: paginationInfo.pageSize,
            },
        },
        manualPagination: manualFilters,
        manualSorting: manualFilters,
        manualFiltering: manualFilters,
        pageCount: Math.ceil(
            paginationInfo.itemCount / paginationInfo.pageSize
        ),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
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
                    'bg-white rounded-2xl flex flex-col items-center justify-start w-full border'
            )}
        >
            <div className="flex flex-initial w-full px-6 py-3 gap-4">
                <DebouncedInput
                    value={globalFilter ?? ''}
                    placeholder={searchPlaceholder}
                    onChange={(value) => setGlobalFilter(String(value))}
                    suffixIconClick={searchSuffixIconClick}
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
            <ScrollArea
                className={cn(
                    'w-full flex-auto',
                    stickyHeader && scrollClassName
                )}
            >
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
                    <TableBody className="flex-auto">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
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
                                                CELL_HEIGHT,
                                                getCellTextColor(
                                                    cell.column.id
                                                ),
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
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {table.getRowModel().rows?.length > 0 && (
                <TablePagination table={table} pagination={paginationInfo} />
            )}
        </div>
    )
}

export default DataTable
