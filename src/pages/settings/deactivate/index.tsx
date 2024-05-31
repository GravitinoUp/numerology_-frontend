import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import Logo from '@/assets/icons/logo.svg'
import CustomForm, { useForm } from '@/components/form/form'
import { InputField } from '@/components/input-field/input-field'
import Button from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { routes } from '@/constants/routes'
import { useDeactivateUserMutation } from '@/redux/api/users'
import { ErrorInterface } from '@/types/interface'
import { removeCookieValue } from '@/utils/cookie'

const deactivateSchema = z.object({
    password: z.string().min(1, i18next.t('error.required')),
})

export default function DeactivatePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const form = useForm({
        schema: deactivateSchema,
        defaultValues: { password: '' },
    })

    const [deactivateUser, { error, isSuccess, isLoading }] =
        useDeactivateUserMutation()

    const [passwordShown, setPasswordShown] = useState(false)

    const onSubmit = () => {
        deactivateUser()
    }

    useEffect(() => {
        if (isSuccess) {
            removeCookieValue('accessToken')
            removeCookieValue('refreshToken')

            navigate(routes.AUTH_PAGE, { replace: true })
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            const errorData = error as ErrorInterface
            form.setError('password', {
                message: errorData.data?.message
                    ? errorData.data?.message
                    : t('error.default'),
            })
        }
    }, [error])

    return (
        <div className="flex w-screen h-screen items-center mobile:justify-center select-none">
            <div className="absolute w-screen h-screen z-[-1] ">
                <div className="absolute w-full h-full bg-black/50" />
                <img
                    src="src/assets/images/login.png"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col w-[500px] md:mx-32 mobile:mx-8 p-8 py-14 items-center bg-white shadow-lg rounded-xl ">
                <Logo />
                <h1 className="mt-4 text-3xl font-bold text-center">
                    {t('deactivate.title')}
                </h1>
                <p className="mt-4 w-[300px] mb-8 text-center">
                    {t('deactivate.description')}
                </p>
                <CustomForm className="w-full" form={form} onSubmit={onSubmit}>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <InputField
                                label={t('password')}
                                className="mt-8"
                                inputClassName="h-14"
                                type={passwordShown ? 'text' : 'password'}
                                suffixIcon={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-14 px-6 rounded-l-none rounded-r-xl"
                                        onClick={() =>
                                            setPasswordShown(!passwordShown)
                                        }
                                    >
                                        {passwordShown ? (
                                            <Eye
                                                size={20}
                                                strokeWidth={2.4}
                                                color="#00131A"
                                            />
                                        ) : (
                                            <EyeOff
                                                size={20}
                                                strokeWidth={2.4}
                                                color="#00131A"
                                            />
                                        )}
                                    </Button>
                                }
                                {...field}
                            />
                        )}
                    />
                    <Button
                        size="lg"
                        className="w-full mt-8"
                        loading={isLoading}
                    >
                        {t('action.deactivate')}
                    </Button>
                </CustomForm>
            </div>
        </div>
    )
}
