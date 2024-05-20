import { Plus } from 'lucide-react'
import Button from '../ui/button'

interface PageLayoutProps {
    title?: string
    children?: React.ReactNode
}

export function PageLayout({ title, children }: PageLayoutProps) {
    return (
        <div className="w-full px-9 pt-8">
            <div className="flex pb-8">
                <h1 className="text-2xl font-bold mr-4">{title}</h1>
                <Button type="button" size="icon">
                    <Plus />
                </Button>
            </div>
            <div className="w-full h-[1px] bg-black/10" />
            {children}
        </div>
    )
}
