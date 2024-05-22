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
import { useUpdateResultMutation } from '@/redux/api/numbers'
import { useUploadFilesMutation } from '@/redux/api/pages'
import { FileData } from '@/types/interface'
import { ResultInterface } from '@/types/interface/numbers'

const resultSchema = z.object({
    result_name_ru: z.string().min(1, i18next.t('error.required')),
    result_name_en: z.string().min(1, i18next.t('error.required')),
    result_content_ru: z.string().optional(),
    result_content_en: z.string().optional(),
    result_image: z.string().optional(),
})

interface FormProps {
    result?: ResultInterface
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ManageResultForm({ result, setOpen }: FormProps) {
    const { t } = useTranslation()

    const form = useForm({
        schema: resultSchema,
        defaultValues: result
            ? {
                  result_name_ru: result.result_name.ru,
                  result_name_en: result.result_name.en,
                  result_content_ru: result.result_content.ru,
                  result_content_en: result.result_content.en,
                  result_image: result.result_image,
              }
            : {
                  result_name_ru: '',
                  result_name_en: '',
                  result_content_ru: '',
                  result_content_en: '',
                  result_image: '',
              },
    })
    const [selectedFile, setSelectedFile] = useState<FileData | undefined>(
        result
            ? {
                  id: crypto.randomUUID(),
                  fileURL: result.result_image,
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
        updateResult,
        {
            isLoading: resultUpdating,
            isSuccess: updateSuccess,
            error: updateError,
        },
    ] = useUpdateResultMutation()

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
        if (result) {
            // UPDATE

            updateResult({
                result_uuid: result.result_uuid,
                result_name: JSON.stringify({
                    ru: data.result_name_ru,
                    en: data.result_name_en,
                }),
                result_content: JSON.stringify({
                    ru: data.result_content_ru,
                    en: data.result_content_en,
                }),
                result_image: selectedFile?.file
                    ? uploadedFiles[0]
                    : result.result_image,
                result_keys: result.result_keys,
                formula_type_id: result.formula_type.formula_type_id,
            })
        } else {
            // CREATE
        }
    }

    const updateSuccessMessage = useMemo(
        () =>
            t('success.update.f', {
                type: t('result'),
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
            <ScrollArea className="h-[710px] px-6" responsiveHeight>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="result_name_en"
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
                        name="result_name_ru"
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
                        name="result_content_en"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`EN: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="result_content_ru"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`RU: ${t('content')}`}</FormLabel>
                                <Textarea {...field} />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel className="mb-2">
                            {t('result.image')}
                        </FormLabel>
                        <ImageInput
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />
                    </FormItem>
                    <div className="flex mt-8 mb-6 gap-4">
                        <Button
                            className="w-full h-11"
                            loading={filesUploading || resultUpdating}
                        >
                            <p className="font-semibold">{t('action.add')}</p>
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
