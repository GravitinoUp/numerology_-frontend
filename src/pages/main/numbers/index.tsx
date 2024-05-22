import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { numberColumns } from './number-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { useGetNumbersBySectionQuery } from '@/redux/api/numbers'

export default function NumbersPage() {
    const { type } = useParams()

    const {
        data: numbers = [],
        isFetching,
        error,
        refetch,
    } = useGetNumbersBySectionQuery(type!)

    return !error ? (
        <PageLayout title={t('page.numbers')} backButtonEnabled>
            <DataTable
                columns={numberColumns}
                data={numbers}
                paginationInfo={{
                    itemCount: numbers.length,
                    pageSize: 999,
                    pageIndex: 0,
                }}
                isLoading={isFetching}
            />
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
