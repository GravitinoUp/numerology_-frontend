import { Table } from '@tanstack/react-table'
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/button'
import { cn } from '@/lib/utils.ts'

interface TablePaginationProps<TData> {
    table?: Table<TData>
    pagination: { itemCount: number; pageSize: number; pageIndex: number }
}

export function TablePagination<TData>({
    table,
    pagination,
}: TablePaginationProps<TData>) {
    const { t } = useTranslation()
    const totalPagesCount =
        typeof table?.getPageCount() !== 'undefined'
            ? Array.from({ length: table?.getPageCount() }, (_, i) => i)
            : [0]

    return (
        <div className="w-full flex items-center justify-between px-2 mt-6">
            <div className="w-full flex items-center justify-end space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        className="hidden h-8 w-8 p-0 lg:flex bg-pagination text-primary"
                        onClick={() => table?.setPageIndex(0)}
                        disabled={pagination.pageIndex === 0}
                    >
                        <span className="sr-only">
                            {t('pagination.first.page')}
                        </span>
                        <ChevronFirstIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-pagination text-primary"
                        onClick={() =>
                            table?.setPageIndex(pagination.pageIndex - 1)
                        }
                        disabled={pagination.pageIndex === 0}
                    >
                        <span className="sr-only">
                            {t('pagination.previous.page')}
                        </span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    {totalPagesCount &&
                        totalPagesCount.map((page) => {
                            const currentPage = pagination.pageIndex
                            const isCurrentPage = currentPage === page

                            const isVisible =
                                page === 0 || // First
                                page === totalPagesCount.length - 1 || // Last
                                (currentPage !== 0 &&
                                    page === currentPage - 1) || // Previous
                                page === currentPage || // Current
                                (currentPage !== totalPagesCount.length - 1 &&
                                    page === currentPage + 1) || // Next
                                (currentPage < 3 && page === currentPage + 2) ||
                                (currentPage < 2 && page === currentPage + 3) ||
                                (currentPage === 0 &&
                                    page === currentPage + 4) ||
                                (currentPage > totalPagesCount.length - 4 &&
                                    page === currentPage - 2) ||
                                (currentPage > totalPagesCount.length - 3 &&
                                    page === currentPage - 3) ||
                                (currentPage === totalPagesCount.length - 1 &&
                                    page === currentPage - 4)

                            const isDotVisible =
                                (currentPage < 3 && page === currentPage + 5) ||
                                page === currentPage - 2 ||
                                page === currentPage + 2 ||
                                (currentPage > totalPagesCount.length - 4 &&
                                    page === currentPage - 5)

                            return isVisible || totalPagesCount.length < 9 ? (
                                <Button
                                    key={page}
                                    variant="ghost"
                                    className={cn(
                                        'h-8 w-8 p-0 font-normal',
                                        isCurrentPage && 'bg-primary text-white'
                                    )}
                                    onClick={() => table?.setPageIndex(page)}
                                >
                                    {page + 1}
                                </Button>
                            ) : (
                                isDotVisible && (
                                    <Button
                                        key={page}
                                        variant="ghost"
                                        className="h-8 w-8 p-0 font-normal"
                                    >
                                        ...
                                    </Button>
                                )
                            )
                        })}
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-pagination text-primary"
                        onClick={() =>
                            table?.setPageIndex(pagination.pageIndex + 1)
                        }
                        disabled={
                            pagination.pageIndex === totalPagesCount.length - 1
                        }
                    >
                        <span className="sr-only">
                            {t('pagination.next.page')}
                        </span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="hidden h-8 w-8 p-0 lg:flex bg-pagination text-primary"
                        onClick={() =>
                            table?.setPageIndex(totalPagesCount.length - 1)
                        }
                        disabled={!table?.getCanNextPage()}
                    >
                        <span className="sr-only">
                            {t('pagination.last.page')}
                        </span>
                        <ChevronLastIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
