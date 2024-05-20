import { categoriesColumns } from './categories-columns'
import DataTable from '@/components/data-table/data-table'
import { PageLayout } from '@/components/layout/page-layout'

export default function CategoriesPage() {
    return (
        <PageLayout title="Категории">
            <DataTable
                columns={categoriesColumns}
                data={[
                    {
                        category_id: 1,
                        category_name: '123123',
                        category_description: '123123',
                        category_image: '',
                    },
                    {
                        category_id: 2,
                        category_name: '3123312',
                        category_description: '3123312',
                        category_image: '',
                    },
                ]}
                paginationInfo={{
                    itemCount: 10,
                    pageSize: 10,
                    pageIndex: 0,
                }}
            />
        </PageLayout>
    )
}
