import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useTranslation } from 'react-i18next'
import Button from '../ui/button'
import { ErrorInterface } from '@/types/interface'

interface ErrorLayoutProps {
    error?: FetchBaseQueryError | SerializedError | undefined
    refetch?: () => void
}

export default function ErrorLayout({ error, refetch }: ErrorLayoutProps) {
    const { t } = useTranslation()

    const errorData = error as ErrorInterface

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">{t('error.occured')}</h1>
            <p className="mt-2 font-medium w-[400px] text-center">
                {errorData && errorData.data
                    ? errorData.data.message
                    : t('error.default')}
            </p>
            <Button className="mt-8 w-[300px] h-12" onClick={refetch}>
                {t('action.retry')}
            </Button>
        </div>
    )
}
