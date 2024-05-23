import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import CustomSelect from '@/components/custom-select/custom-select'
import CustomForm, { useForm } from '@/components/form/form'
import { ImageInput } from '@/components/image-input/image-input'
import { InputField } from '@/components/input-field/input-field'
import Button from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useErrorToast } from '@/hooks/use-error-toast'
import { useSuccessToast } from '@/hooks/use-success-toast'
import i18next from '@/i18n'
import {
    useUpdateCategoryMutation,
    useUploadFilesMutation,
} from '@/redux/api/pages'
import { FileData } from '@/types/interface'
import { CategoryInterface } from '@/types/interface/pages'

const categorySchema = z.object({
    category_name_ru: z.string().min(1, i18next.t('error.required')),
    category_name_en: z.string().min(1, i18next.t('error.required')),
    category_description_ru: z.string().optional(),
    category_description_en: z.string().optional(),
    category_position: z.number(),
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
                  category_name_ru: category.category_name.ru,
                  category_name_en: category.category_name.en,
                  category_description_ru: category.category_description.ru,
                  category_description_en: category.category_description.en,
                  category_position: 1,
              }
            : {
                  category_name_ru: '',
                  category_name_en: '',
                  category_description_ru: '',
                  category_description_en: '',
                  category_position: 1,
              },
    })
    const [selectedFile, setSelectedFile] = useState<FileData | undefined>(
        category
            ? {
                  id: crypto.randomUUID(),
                  fileURL: category.category_image,
              }
            : undefined
    )

    const [
        uploadFiles,
        {
            data: uploadedFiles = [],
            isLoading: filesUploading,
            isSuccess: uploadSuccess,
            error: uploadError,
        },
    ] = useUploadFilesMutation()

    const [
        updateCategory,
        {
            isLoading: categoryUpdating,
            isSuccess: updateSuccess,
            error: updateError,
        },
    ] = useUpdateCategoryMutation()

    const handleSubmit = () => {
        if (selectedFile?.file) {
            const formData = new FormData()
            formData.append('files', selectedFile.file!)

            uploadFiles({ directory: 'categories', formData: formData })
        } else {
            handleManage()
        }
    }

    const handleManage = () => {
        const data = form.getValues()
        if (category) {
            // UPDATE

            updateCategory({
                category_id: category.category_id,
                category_name: JSON.stringify({
                    ru: data.category_name_ru,
                    en: data.category_name_en,
                }),
                category_description: JSON.stringify({
                    ru: data.category_description_ru,
                    en: data.category_description_en,
                }),
                category_image: selectedFile?.file
                    ? uploadedFiles[0]
                    : category.category_image,
            })
        } else {
            // CREATE
        }
    }

    const updateSuccessMessage = useMemo(
        () =>
            t('success.update.f', {
                type: t('category'),
            }),
        []
    )

    useEffect(() => {
        if (uploadSuccess) {
            handleManage()
        }
    }, [uploadSuccess])

    useSuccessToast(updateSuccessMessage, updateSuccess, setOpen)
    useErrorToast(void 0, uploadError || updateError)

    return (
        <CustomForm form={form} onSubmit={handleSubmit}>
            <ScrollArea className="h-[700px] px-6" responsiveHeight>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="category_name_en"
                        render={({ field }) => (
                            <InputField
                                label={`EN: ${t('name')}`}
                                isRequired
                                {...field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category_name_ru"
                        render={({ field }) => (
                            <InputField
                                label={`RU: ${t('name')}`}
                                isRequired
                                {...field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category_description_en"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`EN: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category_description_ru"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`RU: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
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
                    <FormItem>
                        <FormLabel className="mb-2">
                            {t('category.image')}
                        </FormLabel>
                        <ImageInput
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />
                    </FormItem>
                    <div className="flex mt-8 mb-6 gap-4">
                        <Button
                            className="w-full h-11"
                            loading={filesUploading || categoryUpdating}
                        >
                            <p className="font-semibold">
                                {category ? t('action.save') : t('action.add')}
                            </p>
                        </Button>
                        <Button
                            className="w-full h-11"
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            <p className="font-semibold">
                                {t('action.cancel')}
                            </p>
                        </Button>
                    </div>
                </div>
                <ScrollBar />
            </ScrollArea>
        </CustomForm>
    )
}
