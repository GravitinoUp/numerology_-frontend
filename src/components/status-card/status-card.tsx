import { useTranslation } from 'react-i18next'

interface StatusCardProps {
    status: boolean
}

const StatusCard = ({ status }: StatusCardProps) => {
    const { t } = useTranslation()

    return (
        <div className="w-[120px]">
            <div className="flex w-fit px-2 py-[2px] gap-2 shadow-sm bg-background border rounded-md items-center">
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: status ? '#17B26A' : '#EB2E2E' }}
                />
                <p className="text-sm font-medium">
                    {status ? t('status.active') : t('status.inactive')}
                </p>
            </div>
        </div>
    )
}

export default StatusCard
