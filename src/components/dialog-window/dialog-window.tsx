import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '../ui/dialog'
import { cn } from '@/lib/utils'

const dialogVariants = cva('', {
    variants: {
        size: {
            default: 'sm:max-w-[450px] p-0',
            md: 'sm:max-w-[820px]',
            lg: 'sm:max-w-[1100px]',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

interface DialogWindowProps extends VariantProps<typeof dialogVariants> {
    header?: ReactNode
    trigger?: ReactNode | null
    content: ReactNode
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    className?: string
}

const DialogWindow = ({
    header,
    trigger = <Fragment />,
    content,
    open,
    setOpen,
    size,
    className,
}: DialogWindowProps) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
            className={cn(dialogVariants({ size }), className)}
            onOpenAutoFocus={(e) => e.preventDefault}
        >
            <DialogHeader className="mt-3 ml-3">{header}</DialogHeader>
            {content}
        </DialogContent>
    </Dialog>
)

DialogWindow.displayName = 'DialogWindow'

export default DialogWindow
