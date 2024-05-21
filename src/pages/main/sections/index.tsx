import { t } from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { sectionColumns } from './section-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { routes } from '@/constants/routes'
import { useGetPagesByCategoryQuery } from '@/redux/api/pages'

export default function SectionsPage() {
    const { category } = useParams()
    const navigate = useNavigate()

    const {
        data: sections = [],
        isFetching,
        error,
        refetch,
    } = useGetPagesByCategoryQuery(Number(category))

    return !error ? (
        <PageLayout title={t('page.sections')} backButtonEnabled>
            <DataTable
                columns={sectionColumns}
                data={sections}
                onRowClick={(data) =>
                    navigate(
                        `${routes.CATEGORIES}/${category}/sections/${data.page_uuid}`
                    )
                }
                paginationInfo={{
                    itemCount: sections.length,
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
