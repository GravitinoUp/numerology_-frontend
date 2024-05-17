import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    prefixIcon?: React.ReactNode
    suffixIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, prefixIcon, suffixIcon, ...props }, ref) => (
        <div className="flex w-full border border-input rounded-xl input-outline focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
            {prefixIcon}
            <input
                type={type}
                className={cn(
                    'w-full h-11 rounded-xl bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
            {suffixIcon}
        </div>
    )
)
Input.displayName = 'Input'

export { Input }
