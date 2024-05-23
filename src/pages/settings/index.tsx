import { t } from 'i18next'
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
            {successLoad && (
                <div className="flex flex-col w-full h-full rounded-xl border bg-background">
                    <div className="flex h-[90px] justify-between"></div>
                </div>
            )}
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
