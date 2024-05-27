import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Switch } from '@/components/ui/switch'
import { useErrorToast } from '@/hooks/use-error-toast'
import { useSuccessToast } from '@/hooks/use-success-toast'
import {
    useChangeCategoryStatusMutation,
    useChangeSectionStatusMutation,
} from '@/redux/api/pages'
import { CategoryInterface, PageInterface } from '@/types/interface/pages'

export default function StatusSwitch({
    item,
}: {
    item: CategoryInterface | PageInterface
}) {
    const { t } = useTranslation()

    const [
        changeCategoryStatus,
        {
            isLoading: categoryUpdating,
            isSuccess: categoryUpdateSuccess,
            error: categoryUpdateError,
        },
    ] = useChangeCategoryStatusMutation()

    const [
        changeSectionStatus,
        {
            isLoading: sectionUpdating,
            isSuccess: sectionUpdateSuccess,
            error: sectionUpdateError,
        },
    ] = useChangeSectionStatusMutation()

    const categoryUpdateSuccessMsg = useMemo(
        () =>
            t('success.update.f', {
                type: t('category'),
            }),
        []
    )

    const sectionUpdateSuccessMsg = useMemo(
        () =>
            t('success.update.m', {
                type: t('section'),
            }),
        []
    )

    const updateStatus = () => {
        if ((item as PageInterface).page_uuid) {
            const section = item as PageInterface
            changeSectionStatus({
                page_uuid: section.page_uuid,
                is_active: !section.is_active,
            })
        } else if ((item as CategoryInterface).category_id) {
            const category = item as CategoryInterface
            changeCategoryStatus({
                category_id: category.category_id,
                is_active: !category.is_active,
            })
        }
    }

    useSuccessToast(categoryUpdateSuccessMsg, categoryUpdateSuccess)
    useSuccessToast(sectionUpdateSuccessMsg, sectionUpdateSuccess)
    useErrorToast(void 0, categoryUpdateError || sectionUpdateError)

    return (
        <Switch
            disabled={categoryUpdating || sectionUpdating}
            checked={item.is_active}
            onCheckedChange={updateStatus}
        />
    )
}
