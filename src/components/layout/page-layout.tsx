import { ChevronLeftIcon, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/button'

interface PageLayoutProps {
    title?: string
    backButtonEnabled?: boolean
    children?: React.ReactNode
}

export function PageLayout({
    title,
    backButtonEnabled = false,
    children,
}: PageLayoutProps) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full px-9 pt-8 ">
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
                <Button type="button" size="icon">
                    <Plus />
                </Button>
            </div>
            <div className="w-full h-[1px] bg-black/10" />
            {children}
        </div>
    )
}
