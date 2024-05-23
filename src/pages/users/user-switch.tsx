import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormattedUserInterface } from './user-columns'
import { Switch } from '@/components/ui/switch'
import { useSuccessToast } from '@/hooks/use-success-toast'
import { useChangeUserStatusMutation } from '@/redux/api/users'

export default function UserSwitch({ user }: { user: FormattedUserInterface }) {
    const { t } = useTranslation()

    const [
        changeUserStatus,
        { isLoading: userUpdating, isSuccess: updateSuccess },
    ] = useChangeUserStatusMutation()

    const updateSuccessMsg = useMemo(
        () =>
            t('success.create.m', {
                type: t('user.title'),
            }),
        []
    )

    useSuccessToast(updateSuccessMsg, updateSuccess)

    const updateStatus = () =>
        changeUserStatus({
            user_uuid: user.user_uuid,
            is_active: !user.is_active,
        })

    return (
        <Switch
            disabled={userUpdating}
            checked={user.is_active}
            onCheckedChange={updateStatus}
        />
    )
}
