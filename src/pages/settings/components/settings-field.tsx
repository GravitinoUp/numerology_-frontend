import EditIcon from '@/assets/icons/edit-alt.svg'
import Button from '@/components/ui/button'

interface SettingsFieldProps {
    label: string
    children?: React.ReactNode
}

export const SettingsField = ({ label, children }: SettingsFieldProps) => (
    <div className="flex h-[90px] justify-between items-center px-10 border-b">
        <p className="font-bold">{label}</p>
        <div className="flex items-center gap-4">
            <Button size="icon" disabled>
                <EditIcon />
            </Button>
            {children}
        </div>
    </div>
)

interface SettingsDataProps {
    data: string
}

export const SettingsData = ({ data }: SettingsDataProps) => (
    <div className="px-5 py-1 bg-secondary rounded-full">
        <p className="font-medium">{data}</p>
    </div>
)
