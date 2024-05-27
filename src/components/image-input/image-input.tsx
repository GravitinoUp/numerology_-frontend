import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'
import { ProgressiveImage } from '../progressive-image'
import Button from '../ui/button'
import TrashIcon from '@/assets/icons/trash.svg'
import { FileData } from '@/types/interface'

interface ImageInputProps {
    selectedFile: FileData | undefined
    setSelectedFile: Dispatch<SetStateAction<FileData | undefined>>
}

export function ImageInput({ selectedFile, setSelectedFile }: ImageInputProps) {
    const { t } = useTranslation()

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSelect = () => {
        inputRef.current?.click()
    }

    const readUploadFile = (file: File) => {
        setSelectedFile({ id: crypto.randomUUID(), file: file })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)

            if (files.length > 0) {
                readUploadFile(files[0])
            }

            if (inputRef.current) {
                inputRef.current!.value = ''
            }
        }
    }

    return (
        <Fragment>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className="relative flex cursor-pointer items-center rounded-xl border">
                <div
                    className="flex w-full gap-4 items-center p-4"
                    onClick={handleSelect}
                >
                    {selectedFile ? (
                        <ProgressiveImage
                            className="w-[75px] h-[75px] rounded-full border object-cover"
                            src={
                                selectedFile.file
                                    ? URL.createObjectURL(selectedFile.file)
                                    : `${import.meta.env.VITE_API}${
                                          selectedFile.fileURL
                                      }`
                            }
                            width={75}
                            height={75}
                            alt=""
                        />
                    ) : (
                        <div className="w-[75px] h-[75px] rounded-full bg-muted border" />
                    )}
                    <p>{t('action.select.image')}</p>
                </div>
                {selectedFile && selectedFile.fileURL != '' && (
                    <Button
                        className="absolute w-10 h-10 bg-muted right-4"
                        type="button"
                        size="icon"
                        onClick={() => setSelectedFile(undefined)}
                    >
                        <TrashIcon />
                    </Button>
                )}
            </div>
        </Fragment>
    )
}
