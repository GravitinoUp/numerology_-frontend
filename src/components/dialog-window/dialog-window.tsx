import { Dispatch, ReactNode, SetStateAction } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Plus } from 'lucide-react'
import Button from '../ui/button'
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
            default: 'sm:max-w-[450px] p-3 pt-0',
            md: 'sm:max-w-[600px] pt-0',
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
    trigger = (
        <Button type="button" size="icon">
            <Plus />
        </Button>
    ),
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
            <DialogHeader className="mt-3">{header}</DialogHeader>
            {content}
        </DialogContent>
    </Dialog>
)

DialogWindow.displayName = 'DialogWindow'

export default DialogWindow
