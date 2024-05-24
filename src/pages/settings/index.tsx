import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { Fragment } from 'react/jsx-runtime'
import { useNavigate } from 'react-router-dom'
import { SettingsData, SettingsField } from './components/settings-field'
import ConfirmForm from '@/components/confirm-form/confirm-form'
import DialogWindow from '@/components/dialog-window/dialog-window'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import Button from '@/components/ui/button'
import { routes } from '@/constants/routes'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { useErrorToast } from '@/hooks/use-error-toast'
import { api } from '@/redux/api'
import { useLogoutMutation } from '@/redux/api/auth'
import { useGetCurrentUserQuery } from '@/redux/api/users'
import { getJWTtokens, removeCookieValue } from '@/utils/cookie'

export default function SettingsPage() {
    const navigate = useNavigate()

    const [confirmOpen, setConfirmOpen] = useState(false)

    const dispatch = useAppDispatch()

    const {
        data: user,
        isFetching,
        isSuccess,
        error,
        refetch,
    } = useGetCurrentUserQuery()

    const successLoad = !isFetching && isSuccess

    const [
        logout,
        {
            error: logoutError,
            isLoading: logoutLoading,
            isSuccess: logoutSuccess,
        },
    ] = useLogoutMutation()

    const handleLogout = () => {
        const refreshToken = getJWTtokens().refreshToken

        if (refreshToken) {
            logout({ refresh_token: refreshToken! })
        }

        removeCookieValue('accessToken')
    }

    useEffect(() => {
        if (logoutSuccess) {
            removeCookieValue('refreshToken')
            localStorage.clear()

            dispatch(api.util.resetApiState())

            navigate(routes.AUTH_PAGE, { replace: true })
        }
    }, [logoutSuccess])
    useErrorToast(void 0, logoutError)

    return !error ? (
        <PageLayout title={t('page.settings')} className="h-full">
            <div className="flex flex-col w-full h-full rounded-2xl border bg-background">
                {successLoad && (
                    <Fragment>
                        <SettingsField label={t('user.fio')}>
                            <SettingsData
                                data={`${user.person.last_name} ${user.person.first_name} ${user.person.patronymic}`}
                            />
                        </SettingsField>
                        <SettingsField label={t('phone')}>
                            <SettingsData data={user.phone} />
                        </SettingsField>
                        <SettingsField label={t('user.role')}>
                            <SettingsData data={user.role.role_name} />
                        </SettingsField>
                        <DialogWindow
                            open={confirmOpen}
                            setOpen={setConfirmOpen}
                            trigger={
                                <Button
                                    variant="ghost"
                                    className="mt-4 mr-4 self-end px-10 text-red-500 hover:text-red-700"
                                >
                                    {t('log.out')}
                                </Button>
                            }
                            header={
                                <h1 className="text-xl font-bold">
                                    {t('confirm.action')}
                                </h1>
                            }
                            content={
                                <ConfirmForm
                                    setOpen={setConfirmOpen}
                                    description={t('description.log.out')}
                                    onConfirm={handleLogout}
                                    loading={logoutLoading}
                                />
                            }
                        />
                    </Fragment>
                )}
            </div>
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
