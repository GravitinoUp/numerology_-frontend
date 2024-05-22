import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/button'

interface ConfirmFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>
    description: string
    onConfirm: () => void
    loading?: boolean
}

export default function ConfirmForm({
    setOpen,
    description,
    onConfirm,
    loading,
}: ConfirmFormProps) {
    const { t } = useTranslation()

    return (
        <div className="px-3 pb-3">
            <p>{description}</p>
            <div className="flex justify-end mt-8 gap-4">
                <Button
                    className="w-36"
                    variant="outline"
                    onClick={() => setOpen(false)}
                >
                    {t('action.cancel')}
                </Button>
                <Button className="w-36" onClick={onConfirm} loading={loading}>
                    {t('action.confirm')}
                </Button>
            </div>
        </div>
    )
}
