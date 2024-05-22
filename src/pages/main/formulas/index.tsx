import { t } from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { formulaColumns } from './formula-columns'
import DataTable from '@/components/data-table/data-table'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { routes } from '@/constants/routes'
import { useGetFormulasBySectionQuery } from '@/redux/api/pages'

export default function FormulasPage() {
    const { category, section } = useParams()
    const navigate = useNavigate()

    const {
        data: formulas = [],
        isFetching,
        error,
        refetch,
    } = useGetFormulasBySectionQuery(section!)

    return !error ? (
        <PageLayout title={t('page.formulas')} backButtonEnabled>
            <DataTable
                columns={formulaColumns}
                data={formulas}
                onRowClick={(data) =>
                    navigate(
                        `${routes.CATEGORIES}/${category}/sections/${data.formula_type_key}/${data.formula_type_id}`
                    )
                }
                paginationInfo={{
                    itemCount: formulas.length,
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
