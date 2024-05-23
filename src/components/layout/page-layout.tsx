import { ChevronLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/button'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
    title?: string
    backButtonEnabled?: boolean
    actionButton?: React.ReactNode
    children?: React.ReactNode
    className?: string
}

export function PageLayout({
    title,
    backButtonEnabled = false,
    actionButton,
    className,
    children,
}: PageLayoutProps) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full h-full px-9 pt-8">
            <div className="flex items-center pb-8 gap-4">
                {backButtonEnabled && (
                    <Button
                        className="p-0 bg-transparent"
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-foreground" />
                    </Button>
                )}
                <h1 className="text-2xl font-bold">{title}</h1>
                {actionButton}
            </div>
            <div className="w-full h-[1px] bg-black/10" />
            <div className={cn('flex w-full py-6', className)}>{children}</div>
        </div>
    )
}
