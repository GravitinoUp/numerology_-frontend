import { t } from 'i18next'
import { Fragment } from 'react/jsx-runtime'
import { SettingsData, SettingsField } from './components/settings-field'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { useGetCurrentUserQuery } from '@/redux/api/users'

export default function SettingsPage() {
    const {
        data: user,
        isFetching,
        isSuccess,
        error,
        refetch,
    } = useGetCurrentUserQuery()

    const successLoad = !isFetching && isSuccess

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
                    </Fragment>
                )}
            </div>
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
