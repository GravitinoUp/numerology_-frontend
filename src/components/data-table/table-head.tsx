import { Header, flexRender } from '@tanstack/react-table'
import { LucideArrowDown } from 'lucide-react'
import Button from '../ui/button'
import { TableHead } from '../ui/table'
import { cn } from '@/lib/utils'

interface CustomTableHeadProps<T> {
    header: Header<T, unknown>
}

function CustomTableHead<T>({ header }: CustomTableHeadProps<T>) {
    return (
        <TableHead className="text-foreground select-none">
            <div className="flex items-center">
                {header.isPlaceholder
                    ? null
                    : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                {header.id !== 'select' &&
                    header.id !== 'actions' &&
                    header.column.getCanSort() && (
                        <Button
                            variant="ghost"
                            className={cn(
                                'py-0 px-1',
                                header.column.getIsSorted() === 'asc'
                                    ? 'rotate-180'
                                    : 'rotate-0'
                            )}
                            style={{ backgroundColor: 'transparent' }}
                            onClick={() =>
                                header.column.toggleSorting(
                                    header.column.getIsSorted() === 'asc'
                                )
                            }
                        >
                            <LucideArrowDown size={16} />
                        </Button>
                    )}
            </div>
        </TableHead>
    )
}

export default CustomTableHead
