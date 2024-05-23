import { useState } from 'react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { categoryColumns } from './category-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { defaultQuery } from '@/constants'
import { routes } from '@/constants/routes'
import { useGetCategoriesQuery } from '@/redux/api/pages'

export default function CategoriesPage() {
    const navigate = useNavigate()

    const [categoriesQuery, setCategoriesQuery] = useState(defaultQuery)

    const {
        data: categories = [],
        isFetching,
        error,
        refetch,
    } = useGetCategoriesQuery()

    return !error ? (
        <PageLayout title={t('page.categories')}>
            <DataTable
                columns={categoryColumns}
                data={categories}
                onRowClick={(data) =>
                    navigate(
                        `${routes.CATEGORIES}/${data.category_id}/sections`
                    )
                }
                paginationInfo={{
                    itemCount: categories.length,
                    pageSize: categoriesQuery.offset.count,
                    pageIndex: categoriesQuery.offset.page - 1,
                }}
                getTableInfo={(pageSize, pageIndex) => {
                    setCategoriesQuery({
                        ...categoriesQuery,
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
