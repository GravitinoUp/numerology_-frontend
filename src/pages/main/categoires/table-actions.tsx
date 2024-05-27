import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ManageCategoryForm from './components/manage-category-form'
import Button from '../../../components/ui/button'
import EditIcon from '@/assets/icons/edit.svg'
//import TrashIcon from '@/assets/icons/trash.svg'
//import ConfirmForm from '@/components/confirm-form/confirm-form'
import DialogWindow from '@/components/dialog-window/dialog-window'
import { FormattedCategoryInterface } from '@/types/interface/pages'

interface TableActionsProps {
    item: FormattedCategoryInterface
}

export default function TableActions({ item }: TableActionsProps) {
    const { t } = useTranslation()

    //const [open, setOpen] = useState(false)
    const [manageOpen, setManageOpen] = useState(false)

    return (
        <Fragment>
            <div className="flex justify-end gap-2">
                {/* <DialogWindow
                    open={open}
                    setOpen={setOpen}
                    trigger={
                        <Button
                            className="w-10 h-10 bg-muted"
                            type="button"
                            size="icon"
                            onClick={() => console.log(item)}
                        >
                            <TrashIcon />
                        </Button>
                    }
                    header={
                        <h1 className="text-xl font-bold">
                            {t('confirm.action')}
                        </h1>
                    }
                    content={
                        <ConfirmForm
                            setOpen={setOpen}
                            description={t('description.remove', {
                                type: t('accusative.category'),
                            })}
                            onConfirm={() => {}}
                        />
                    }
                /> */}
                <DialogWindow
                    open={manageOpen}
                    setOpen={setManageOpen}
                    trigger={
                        <Button
                            className="w-10 h-10 bg-transparent"
                            type="button"
                            size="icon"
                        >
                            <EditIcon />
                        </Button>
                    }
                    header={
                        <h1 className="text-xl font-bold">
                            {t('manage.category')}
                        </h1>
                    }
                    content={
                        <ManageCategoryForm
                            setOpen={setManageOpen}
                            category={item}
                            count={item.count}
                        />
                    }
                    size="md"
                />
            </div>
        </Fragment>
    )
}
