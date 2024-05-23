import { useState } from 'react'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { numberColumns } from './number-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { defaultQuery } from '@/constants'
import { useGetNumbersBySectionQuery } from '@/redux/api/numbers'

export default function NumbersPage() {
    const { type } = useParams()

    const [numbersQuery, setNumbersQuery] = useState(defaultQuery)

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
                    pageSize: numbersQuery.offset.count,
                    pageIndex: numbersQuery.offset.page - 1,
                }}
                getTableInfo={(pageSize, pageIndex) => {
                    setNumbersQuery({
                        ...numbersQuery,
                        offset: {
                            count: pageSize,
                            page: pageIndex + 1,
                        },
                    })
                }}
                isLoading={isFetching}
                manualFilters={false}
            />
        </PageLayout>
    ) : (
        <ErrorLayout error={error} refetch={refetch} />
    )
}
