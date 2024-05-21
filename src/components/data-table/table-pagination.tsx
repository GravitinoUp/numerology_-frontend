import { Table } from '@tanstack/react-table'
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    LucideArrowLeft,
    LucideArrowRight,
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
        <div className="w-full flex items-center justify-between border-t p-4">
            <Button
                variant="outline"
                className="hidden px-2 lg:flex text-primary"
                onClick={() => table?.setPageIndex(0)}
                disabled={pagination.pageIndex === 0}
            >
                <ChevronFirstIcon className="h-6 w-6 mr-2" />
                <p className="font-semibold text-foreground">
                    {t('pagination.first.page')}
                </p>
            </Button>
            <div className="flex gap-1">
                <Button
                    variant="outline"
                    className="px-2 text-primary mr-2"
                    onClick={() =>
                        table?.setPageIndex(pagination.pageIndex - 1)
                    }
                    disabled={pagination.pageIndex === 0}
                >
                    <LucideArrowLeft className="h-6 w-6 mr-2" />
                    <p className="font-semibold text-foreground">
                        {t('pagination.previous.page')}
                    </p>
                </Button>
                {totalPagesCount &&
                    totalPagesCount.map((page) => {
                        const currentPage = pagination.pageIndex
                        const isCurrentPage = currentPage === page

                        const isVisible =
                            page === 0 || // First
                            page === totalPagesCount.length - 1 || // Last
                            (currentPage !== 0 && page === currentPage - 1) || // Previous
                            page === currentPage || // Current
                            (currentPage !== totalPagesCount.length - 1 &&
                                page === currentPage + 1) || // Next
                            (currentPage < 3 && page === currentPage + 2) ||
                            (currentPage < 2 && page === currentPage + 3) ||
                            (currentPage === 0 && page === currentPage + 4) ||
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
                                    'h-10 w-10 font-normal rounded-lg',
                                    isCurrentPage && 'bg-muted font-medium'
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
                                    className="h-10 w-10 font-normal rounded-lg"
                                >
                                    ...
                                </Button>
                            )
                        )
                    })}
                <Button
                    variant="outline"
                    className="px-2 text-primary ml-2"
                    onClick={() =>
                        table?.setPageIndex(pagination.pageIndex + 1)
                    }
                    disabled={
                        pagination.pageIndex === totalPagesCount.length - 1
                    }
                >
                    <p className="font-semibold text-foreground">
                        {t('pagination.next.page')}
                    </p>
                    <LucideArrowRight className="h-6 w-6 ml-2" />
                </Button>
            </div>
            <Button
                variant="outline"
                className="hidden px-2 lg:flex text-primary"
                onClick={() => table?.setPageIndex(totalPagesCount.length - 1)}
                disabled={!table?.getCanNextPage()}
            >
                <p className="font-semibold text-foreground">
                    {t('pagination.last.page')}
                </p>
                <ChevronLastIcon className="h-6 w-6 ml-2" />
            </Button>
        </div>
    )
}
