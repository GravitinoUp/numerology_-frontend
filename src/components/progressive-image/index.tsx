import React, { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton.tsx'

interface ProgressiveImageProps extends React.HTMLProps<HTMLImageElement> {
    src?: string
    width: string | number
    height: string | number
    className?: string
}

export const ProgressiveImage = ({
    src = '',
    width,
    height,
    className,
    ...props
}: ProgressiveImageProps) => {
    const [imageLoading, setImageLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = src

        img.onload = () => {
            setImageLoading(false)
            setError(false)
        }

        img.onerror = () => {
            setImageLoading(false)
            setError(true)
        }
    }, [src])

    if (imageLoading) {
        return (
            <Skeleton
                className={`w-[${width}px] h-[${height}px] rounded-full`}
            />
        )
    }

    if (error) {
        return <ImageOff width={width} height={height} />
    }

    return (
        <img
            className={className}
            src={src}
            width={width}
            height={height}
            {...props}
        />
    )
}
