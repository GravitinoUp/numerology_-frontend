import { useState } from 'react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { categoryColumns } from './category-columns'
import ManageCategoryForm from './components/manage-category-form'
import DataTable from '@/components/data-table/data-table'
import DialogWindow from '@/components/dialog-window/dialog-window'
import ErrorLayout from '@/components/error-layout/error-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { routes } from '@/constants/routes'
import { useGetCategoriesQuery } from '@/redux/api/pages'

export default function CategoriesPage() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const {
        data: categories = [],
        isFetching,
        error,
        refetch,
    } = useGetCategoriesQuery()

    return !error ? (
        <PageLayout
            title={t('page.categories')}
            actionButton={
                <DialogWindow
                    size="md"
                    open={open}
                    setOpen={setOpen}
                    header={
                        <h1 className="text-xl font-bold">
                            {t('create.category')}
                        </h1>
                    }
                    content={<ManageCategoryForm setOpen={setOpen} />}
                />
            }
        >
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
