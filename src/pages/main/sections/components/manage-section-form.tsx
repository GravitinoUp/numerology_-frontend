import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
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
    useUpdatePageMutation,
    useUploadFilesMutation,
} from '@/redux/api/pages'
import { FileData } from '@/types/interface'
import { PageInterface } from '@/types/interface/pages'

const categorySchema = z.object({
    section_name_ru: z.string().min(1, i18next.t('error.required')),
    section_name_en: z.string().min(1, i18next.t('error.required')),
    section_description_ru: z.string().optional(),
    section_description_en: z.string().optional(),
})

interface FormProps {
    section?: PageInterface
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ManageSectionForm({ section, setOpen }: FormProps) {
    const { t } = useTranslation()

    const form = useForm({
        schema: categorySchema,
        defaultValues: section
            ? {
                  section_name_ru: section.page_name.ru,
                  section_name_en: section.page_name.en,
                  section_description_ru: section.page_description.ru,
                  section_description_en: section.page_description.en,
              }
            : {
                  section_name_ru: '',
                  section_name_en: '',
                  section_description_ru: '',
                  section_description_en: '',
              },
    })
    const [selectedFile, setSelectedFile] = useState<FileData | undefined>(
        section
            ? {
                  id: crypto.randomUUID(),
                  fileURL: section.page_image,
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
        updatePage,
        {
            isLoading: sectionUpdating,
            isSuccess: updateSuccess,
            error: updateError,
        },
    ] = useUpdatePageMutation()

    const handleSubmit = () => {
        if (selectedFile?.file) {
            const formData = new FormData()
            formData.append('files', selectedFile.file!)

            uploadFiles({ directory: 'pages', formData: formData })
        } else {
            handleManage()
        }
    }

    const handleManage = () => {
        const data = form.getValues()
        if (section) {
            // UPDATE

            updatePage({
                key: section.key,
                category_id: section.category_id,
                page_uuid: section.page_uuid,
                page_name: JSON.stringify({
                    ru: data.section_name_ru,
                    en: data.section_name_en,
                }),
                page_description: JSON.stringify({
                    ru: data.section_description_ru,
                    en: data.section_description_en,
                }),
                page_image: selectedFile?.file
                    ? uploadedFiles[0]
                    : section.page_image,
                page_icon: section.page_icon,
                color: section.color,
            })
        } else {
            // CREATE
        }
    }

    const createSuccessMessage = useMemo(
        () =>
            t('success.create.m', {
                type: t('section'),
            }),
        []
    )

    const updateSuccessMessage = useMemo(
        () =>
            t('success.update.m', {
                type: t('section'),
            }),
        []
    )

    useEffect(() => {
        if (uploadSuccess) {
            console.log(uploadedFiles)
            handleManage()
        }
    }, [uploadSuccess])

    useSuccessToast(createSuccessMessage, false, setOpen)
    useSuccessToast(updateSuccessMessage, updateSuccess, setOpen)
    useErrorToast(void 0, uploadError || updateError)

    return (
        <CustomForm form={form} onSubmit={handleSubmit}>
            <ScrollArea className="h-[710px] px-6" responsiveHeight>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="section_name_en"
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
                        name="section_name_ru"
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
                        name="section_description_en"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`EN: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="section_description_ru"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`RU: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel className="mb-2">
                            {t('section.image')}
                        </FormLabel>
                        <ImageInput
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />
                    </FormItem>
                    <div className="flex mt-8 mb-6 gap-4">
                        <Button
                            className="w-full h-11"
                            loading={filesUploading || sectionUpdating}
                        >
                            <p className="font-semibold">
                                {section ? t('action.save') : t('action.add')}
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
