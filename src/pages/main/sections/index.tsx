import { useState } from 'react'
import { t } from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { sectionColumns } from './section-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { defaultQuery } from '@/constants'
import { routes } from '@/constants/routes'
import { useGetPagesByCategoryQuery } from '@/redux/api/pages'

export default function SectionsPage() {
    const { category } = useParams()
    const navigate = useNavigate()

    const [sectionsQuery, setSectionsQuery] = useState(defaultQuery)

    const {
        data: sections = [],
        isFetching,
        error,
        refetch,
    } = useGetPagesByCategoryQuery(Number(category))

    return !error ? (
        <PageLayout
            className="h-full"
            title={t('page.sections')}
            backButtonEnabled
        >
            <DataTable
                columns={sectionColumns}
                data={sections}
                onRowClick={(data) =>
                    navigate(
                        `${routes.CATEGORIES}/${category}/sections/${data.key}`
                    )
                }
                paginationInfo={{
                    itemCount: sections.length,
                    pageSize: sectionsQuery.offset.count,
                    pageIndex: sectionsQuery.offset.page - 1,
                }}
                getTableInfo={(pageSize, pageIndex) => {
                    setSectionsQuery({
                        ...sectionsQuery,
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
