import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import CustomSelect from '@/components/custom-select/custom-select'
import CustomForm, { useForm } from '@/components/form/form'
import { InputField } from '@/components/input-field/input-field'
import Button from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import i18next from '@/i18n'
import { CategoryInterface } from '@/types/interface/pages'

const categorySchema = z.object({
    category_name: z.string().min(1, i18next.t('error.required')),
    category_position: z.number(),
    category_image: z.string().min(1, i18next.t('error.required')),
})

interface FormProps {
    category?: CategoryInterface
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ManageCategoryForm({ category, setOpen }: FormProps) {
    const { t } = useTranslation()

    const form = useForm({
        schema: categorySchema,
        defaultValues: category
            ? {
                  category_name: category.category_name,
                  category_position: 1,
                  category_image: category.category_image,
              }
            : {
                  category_name: '',
                  category_position: 1,
                  category_image: '',
              },
    })

    const handleSubmit = () => {}

    return (
        <CustomForm form={form} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="category_name"
                    render={({ field }) => (
                        <InputField
                            label={t('name')}
                            className="mt-8"
                            {...field}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="category_position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('position')}</FormLabel>
                            <CustomSelect
                                placeholder={'1'}
                                selectedValue={field.value}
                                setSelectedValue={(value) =>
                                    field.onChange(value !== '' ? value : 0)
                                }
                                items={[{ value: 0, label: '1' }]}
                            />
                        </FormItem>
                    )}
                />
                <div className="flex mt-8 gap-4">
                    <Button className="w-full h-11">
                        <p className="font-semibold">{t('action.add')}</p>
                    </Button>
                    <Button
                        className="w-full h-11"
                        variant="outline"
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        <p className="font-semibold">{t('action.cancel')}</p>
                    </Button>
                </div>
            </div>
        </CustomForm>
    )
}
