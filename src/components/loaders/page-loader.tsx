import { LoadingSpinner } from './spinner'
import { cn } from '@/lib/utils'

export const PageLoader = ({ className }: { className?: string }) => (
    <div
        className={cn(
            'w-full flex justify-center items-center h-[100%]',
            className
        )}
    >
        <LoadingSpinner className="w-16 h-16 text-primary" />
    </div>
)
