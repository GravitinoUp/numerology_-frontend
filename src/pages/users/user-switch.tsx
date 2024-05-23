import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormattedUserInterface } from './user-columns'
import { Switch } from '@/components/ui/switch'
import { useErrorToast } from '@/hooks/use-error-toast'
import { useSuccessToast } from '@/hooks/use-success-toast'
import { useChangeUserStatusMutation } from '@/redux/api/users'

export default function UserSwitch({ user }: { user: FormattedUserInterface }) {
    const { t } = useTranslation()

    const [
        changeUserStatus,
        {
            isLoading: userUpdating,
            isSuccess: updateSuccess,
            error: updateError,
        },
    ] = useChangeUserStatusMutation()

    const updateSuccessMsg = useMemo(
        () =>
            t('success.update.m', {
                type: t('user.title'),
            }),
        []
    )

    const updateStatus = () =>
        changeUserStatus({
            user_uuid: user.user_uuid,
            is_active: !user.is_active,
        })

    useSuccessToast(updateSuccessMsg, updateSuccess)
    useErrorToast(void 0, updateError)

    return (
        <Switch
            disabled={userUpdating}
            checked={user.is_active}
            onCheckedChange={updateStatus}
        />
    )
}
